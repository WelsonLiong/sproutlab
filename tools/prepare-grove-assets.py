"""Prepare the supplied models for the browser; never change their source files."""
from pathlib import Path
import io, json, struct, shutil, argparse, hashlib
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('--nico-only', action='store_true', help='Refresh only Nico after replacing source files')
args = parser.parse_args()

project = Path(__file__).resolve().parents[1]
source = project.parent / 'TUGASAN 3/games/assests'
target = project / 'dist/assets/grove'
target.mkdir(parents=True, exist_ok=True)
nature = source / 'Stylized Nature MegaKit[Standard]'
models = ['CommonTree_1', 'CommonTree_3', 'CommonTree_5', 'Pine_1', 'TwistedTree_1',
          'DeadTree_1', 'Rock_Medium_1', 'Rock_Medium_2', 'Pebble_Round_1',
          'RockPath_Round_Small_1', 'Bush_Common', 'Bush_Common_Flowers',
          'Grass_Common_Short', 'Fern_1', 'Flower_3_Group', 'Flower_4_Group', 'Plant_1']
if not args.nico_only:
    for name in models:
        original = nature / 'glTF' / (name + '.gltf')
        doc = json.loads(original.read_text())
        for dependency in doc.get('images', []) + doc.get('buffers', []):
            uri = dependency.get('uri', '')
            if uri and not uri.startswith('data:'):
                shutil.copy2(original.parent / uri, target / uri)
        shutil.copy2(original, target / original.name)
    shutil.copy2(nature / 'License_Standard.txt', target / 'nature-license.txt')
    for texture in target.glob('*.png'):
        with Image.open(texture) as original:
            limit = 512 if 'Normal' in texture.stem else 1024
            # Bark_NormalTree is a color map; *_Normal is the normal-map suffix.
            if not texture.stem.endswith('_Normal'):
                limit = 1024
            image = original.copy()
        image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
        image.save(texture, format='PNG', optimize=True)

# Resize embedded textures and repack buffer views. Skeleton, mesh and all clips
# are retained unchanged, rather than shipping the 28.7 MiB source texture payload.
raw = (source / 'Nico/character_all_animations.glb').read_bytes()
json_length = struct.unpack_from('<I', raw, 12)[0]
doc = json.loads(raw[20:20+json_length])
bin_start = 20 + json_length + 8
binary = raw[bin_start:]
image_views = {im['bufferView']: im for im in doc['images'] if 'bufferView' in im}
new_binary = bytearray()
for i, view in enumerate(doc['bufferViews']):
    payload = binary[view.get('byteOffset', 0):view.get('byteOffset', 0)+view['byteLength']]
    if i in image_views:
        image = Image.open(io.BytesIO(payload))
        image.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
        output = io.BytesIO()
        if image.mode == 'RGBA' and image.getextrema()[3][0] < 255:
            image.save(output, format='PNG', optimize=True)
            image_views[i]['mimeType'] = 'image/png'
        else:
            image.convert('RGB').save(output, format='JPEG', quality=90)
            image_views[i]['mimeType'] = 'image/jpeg'
        payload = output.getvalue()
    new_binary.extend(b'\0' * (-len(new_binary) % 4))
    view['byteOffset'] = len(new_binary)
    view['byteLength'] = len(payload)
    new_binary.extend(payload)
doc['buffers'][0]['byteLength'] = len(new_binary)
new_binary.extend(b'\0' * (-len(new_binary) % 4))
json_bytes = json.dumps(doc, separators=(',', ':')).encode()
json_bytes += b' ' * (-len(json_bytes) % 4)
total = 12 + 8 + len(json_bytes) + 8 + len(new_binary)
result = struct.pack('<4sII', b'glTF', 2, total)
result += struct.pack('<I4s', len(json_bytes), b'JSON') + json_bytes
result += struct.pack('<I4s', len(new_binary), b'BIN\0') + new_binary
(target / 'nico.glb').write_bytes(result)
fingerprint = hashlib.sha256(raw).hexdigest()[:16]
manifest = {'sourceSha256': hashlib.sha256(raw).hexdigest(), 'browserSha256': hashlib.sha256(result).hexdigest(),
            'clips': [a['name'] for a in doc.get('animations', [])]}
(target / 'nico-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
(project / 'dist/nico-version.js').write_text(f"export const NICO_MODEL = 'assets/grove/nico.glb?v={fingerprint}';\n", encoding='utf-8')
print(f'Nico: {len(raw)/1048576:.2f} -> {len(result)/1048576:.2f} MiB; {len(doc["animations"])} clips retained')
print('Nature models unchanged (--nico-only).' if args.nico_only else f'{len(models)} nature models prepared; all dependencies copied.')
print(f'Total browser models and textures: {sum(p.stat().st_size for p in target.iterdir() if p.is_file())/1048576:.2f} MiB')

# Keep upstream code local. Only import specifiers change.
if not args.nico_only:
    vendor = project / 'dist/vendor/three'
    for filename in ['GLTFLoader.js', 'BufferGeometryUtils.js']:
        path = vendor / filename
        text = path.read_text(encoding='utf-8').replace("from 'three'", "from './three.module.js'")
        text = text.replace("from '../utils/BufferGeometryUtils.js'", "from './BufferGeometryUtils.js'")
        path.write_text(text, encoding='utf-8')
