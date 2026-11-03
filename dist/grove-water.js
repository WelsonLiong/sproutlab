// Shallow sculpted water with a submerged bed, irregular banks and moving normals.
export function waterRibbon(THREE,points,width,terrain,{bed=false,surfaceHeight}={}){
 const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),vertices=[],uvs=[],colors=[],indices=[],steps=100,across=8;
 const deep=new THREE.Color(0x328e99),shallow=new THREE.Color(0x81b9aa),soil=new THREE.Color(0x77765a),bank=new THREE.Color(0x789347);
 for(let i=0;i<=steps;i++){
  const t=i/steps,p=curve.getPoint(t),d=curve.getTangent(t).setY(0).normalize(),variation=1+.065*Math.sin(t*29)+.035*Math.sin(t*67);
  for(let j=0;j<=across;j++){
   const side=j/across*2-1,x=p.x-d.z*width*side*.5*variation,z=p.z+d.x*width*side*.5*variation;
   const y=bed?terrain(x,z)+.008:surfaceHeight?surfaceHeight(x,z):terrain(x,z)+.065;
   vertices.push(x,y,z);uvs.push(t*curve.getLength()/2,j/across);
   const color=bed?soil.clone().lerp(bank,Math.pow(Math.abs(side),3)):deep.clone().lerp(shallow,Math.pow(Math.abs(side),2));colors.push(color.r,color.g,color.b);
   if(i<steps&&j<across){const a=i*(across+1)+j,b=a+across+1;indices.push(a,a+1,b,a+1,b+1,b)}
  }
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setIndex(indices);geometry.computeVertexNormals();
 let normalMap;
 if(!bed){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d'),data=ctx.createImageData(128,128);
  for(let y=0;y<128;y++)for(let x=0;x<128;x++){const u=x/128*Math.PI*2,v=y/128*Math.PI*2,dx=.55*Math.cos(u*4+Math.sin(v*2))+.25*Math.cos(u*7-v*3),dy=.45*Math.cos(v*5+u*2),k=(y*128+x)*4;data.data[k]=128+dx*65;data.data[k+1]=128+dy*65;data.data[k+2]=240;data.data[k+3]=255}
  ctx.putImageData(data,0,0);normalMap=new THREE.CanvasTexture(canvas);normalMap.wrapS=normalMap.wrapT=THREE.RepeatWrapping;
 }
 const material=new THREE.MeshStandardMaterial({vertexColors:true,normalMap,normalScale:new THREE.Vector2(.38,.38),roughness:bed?1:.21,metalness:bed?0:.16,transparent:!bed,opacity:bed?1:.84,side:THREE.DoubleSide,depthWrite:bed});
 const mesh=new THREE.Mesh(geometry,material);mesh.receiveShadow=true;
 if(!bed){const base=vertices.slice();mesh.userData.updateWater=(time,reduced)=>{const pos=geometry.attributes.position;for(let i=0;i<pos.count;i++){const x=base[i*3],z=base[i*3+2],edge=Math.sin((i%(across+1))/across*Math.PI);pos.setY(i,base[i*3+1]+(reduced?0:edge*(Math.sin(x*5+z*2-time*2.8)*.014+Math.sin(z*8-x*2+time*1.7)*.007)))}pos.needsUpdate=true;geometry.computeVertexNormals();if(!reduced){normalMap.offset.x=-time*.18;normalMap.offset.y=time*.035}}}
 return mesh;
}
// Measure the visible object's centre, rather than lifting its base to the waist.
export function prepareLift(THREE,root){
 if(root.userData.carryCenterY!==undefined)return;
 root.updateWorldMatrix(true,true);const box=new THREE.Box3().setFromObject(root),origin=root.getWorldPosition(new THREE.Vector3());root.userData.carryCenterY=(box.min.y+box.max.y)/2-origin.y;
}
// Centre held objects at the requested height; release uses gravity.
export function liftObject(root,base,lift,delta,reduced=false){
 const height=lift?Math.max(.04,lift-(root.userData.carryCenterY||0)):0;
 if(reduced){root.position.y=base+height;root.userData.dropSpeed=0;return}
 if(lift){root.userData.dropSpeed=0;root.position.y+=(base+height-root.position.y)*(1-Math.exp(-delta*14))}
 else if(root.position.y>base){root.userData.dropSpeed=(root.userData.dropSpeed||0)+delta*8;root.position.y=Math.max(base,root.position.y-root.userData.dropSpeed*delta)}
 else{root.position.y=base;root.userData.dropSpeed=0}
}
