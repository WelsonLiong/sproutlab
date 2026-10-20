import {completedCampaign} from './grove-completion.js';

const dateLabel = value => value
  ? new Date(value).toLocaleDateString('en-MY', {day: 'numeric', month: 'long', year: 'numeric'})
  : 'Adventure completed';

export async function drawCertificate(completion = completedCampaign()) {
  if (!completion) throw Error('Complete the forest adventure to make a certificate.');
  await document.fonts.ready;
  const canvas = document.createElement('canvas');
  canvas.width = 2380;
  canvas.height = 1684;
  const c = canvas.getContext('2d');
  c.fillStyle = '#fff9e8';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = '#446b45';
  c.lineWidth = 5;
  c.strokeRect(70, 70, 2240, 1544);
  c.lineWidth = 1.5;
  c.strokeRect(88, 88, 2204, 1508);
  function leaf(x, y, angle, size, color) {
    c.save();c.translate(x, y);c.rotate(angle);c.scale(size, size);c.fillStyle = color;
    c.beginPath();c.moveTo(0, 0);c.bezierCurveTo(-.6, -.1, -.8, -.9, 0, -1.3);c.bezierCurveTo(.8, -.9, .6, -.1, 0, 0);c.fill();
    c.strokeStyle = '#fff9e8';c.lineWidth = .025;c.beginPath();c.moveTo(0, 0);c.lineTo(0, -1.1);c.stroke();c.restore();
  }
  for (const side of [-1, 1]) for (let i = 0; i < 7; i++)
    leaf(side === -1 ? 130 + i * 25 : 2250 - i * 25, 220 + i * 117, side * (.4 + i * .12), 100 - i * 4, i % 2 ? '#88a45b' : '#4f7b4b');
  c.textAlign = 'center';c.fillStyle = '#30553c';
  c.font = '400 48px "Lilita One", Nunito, sans-serif';c.fillText('sproutlab · Greenhaven', 1190, 225);
  c.font = '400 112px "Lilita One", Nunito, sans-serif';c.fillText('Certificate of Discovery', 1190, 425);
  c.fillStyle = '#62754c';c.font = '700 35px Nunito, sans-serif';c.fillText('This celebrates', 1190, 560);
  let size = 112;const name = completion.name;
  do { c.font = `900 ${size}px Nunito, sans-serif`; if (c.measureText(name).width < 1700) break; size -= 3; } while (size > 48);
  c.fillStyle = '#2e5038';c.fillText(name, 1190, 735);
  c.strokeStyle = '#d5be7b';c.lineWidth = 3;c.beginPath();c.moveTo(470, 790);c.lineTo(1910, 790);c.stroke();
  c.fillStyle = '#315e41';c.font = '400 62px "Lilita One", Nunito, sans-serif';
  c.fillText('for completing the forest adventure', 1190, 960);
  c.font = '700 38px Nunito, sans-serif';c.fillText('Nico and the Dying Forest', 1190, 1050);
  c.fillStyle = '#53694b';c.font = '600 32px Nunito, sans-serif';
  c.fillText('Exploring how plants make food and help living things', 1190, 1135);
  c.font = '700 37px Nunito, sans-serif';c.fillText(dateLabel(completion.completedAt), 1190, 1345);
  c.font = '600 24px Nunito, sans-serif';
  c.fillText('Year 4 Science · Photosynthesis · Completed adventure', 1190, 1455);
  return canvas;
}

export async function certificatePDF(completion = completedCampaign()) {
  const canvas = await drawCertificate(completion);
  const data = atob(canvas.toDataURL('image/jpeg', .94).split(',')[1]);
  const jpeg = Uint8Array.from(data, char => char.charCodeAt(0));
  const encode = value => new TextEncoder().encode(value);
  const pieces = [encode('%PDF-1.4\n')], offsets = [0];
  let length = pieces[0].length;
  const push = bytes => {pieces.push(bytes);length += bytes.length};
  const object = (number, parts) => {offsets[number] = length;push(encode(`${number} 0 obj\n`));for (const part of parts) push(typeof part === 'string' ? encode(part) : part);push(encode('\nendobj\n'))};
  object(1, ['<< /Type /Catalog /Pages 2 0 R >>']);
  object(2, ['<< /Type /Pages /Kids [3 0 R] /Count 1 >>']);
  object(3, ['<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Certificate 4 0 R >> >> /Contents 5 0 R >>']);
  object(4, [`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`, jpeg, '\nendstream']);
  const content = 'q 842 0 0 595 0 0 cm /Certificate Do Q';
  object(5, [`<< /Length ${encode(content).length} >>\nstream\n${content}\nendstream`]);
  const xref = length;
  push(encode('xref\n0 6\n0000000000 65535 f \n' + offsets.slice(1).map(number => String(number).padStart(10, '0') + ' 00000 n \n').join('') + `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`));
  return new Blob(pieces, {type: 'application/pdf'});
}

export async function downloadCertificate(completion = completedCampaign()) {
  const blob = await certificatePDF(completion);
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url;
  link.download = `Greenhaven-${completion.name.replace(/[^\p{L}\p{N} -]/gu, '').slice(0, 40) || 'Explorer'}-completion.pdf`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export async function printCertificate(completion = completedCampaign()) {
  const canvas = await drawCertificate(completion), frame = document.createElement('iframe');
  frame.hidden = true;frame.title = 'Print discovery certificate';document.body.append(frame);
  const doc = frame.contentDocument;
  doc.open();
  doc.write(`<!doctype html><html><head><title>Greenhaven certificate</title><style>@page{size:A4 landscape;margin:0}html,body{margin:0;width:297mm;height:210mm;overflow:hidden}img{display:block;width:297mm;height:210mm;object-fit:contain}</style></head><body><img alt="Discovery certificate" src="${canvas.toDataURL('image/png')}"></body></html>`);
  doc.close();await doc.querySelector('img').decode();frame.contentWindow.focus();frame.contentWindow.print();setTimeout(() => frame.remove(), 60000);
}
