// Rendering and walking share the same support heights.
export function createSurfaces(terrain){
 const entries=[];
 return{
  disc(owner,x,z,r,top){entries.push({owner,x,z,r,top})},
  box(owner,x,z,w,d,top,rotation=0){entries.push({owner,x,z,w,d,top,rotation})},
  remove(owner){for(let i=entries.length-1;i>=0;i--)if(entries[i].owner===owner)entries.splice(i,1)},
  heightAt(x,z){let h=terrain(x,z);for(const s of entries){const dx=x-s.x,dz=z-s.z,c=Math.cos(s.rotation||0),n=Math.sin(s.rotation||0);const inside=s.r?Math.hypot(dx,dz)<=s.r:Math.abs(dx*c-dz*n)<=s.w/2&&Math.abs(dx*n+dz*c)<=s.d/2;if(inside)h=Math.max(h,s.top)}return h},
  get entries(){return entries.slice()}
 }
}

// Sample the actual boot vertices, including the current skin pose. Adjusting the
// model rather than the terrain keeps every animation on its supporting surface.
export function createFootContact(THREE,model){
 model.updateWorldMatrix(true,true);
 const bounds=new THREE.Box3().setFromObject(model,true),limit=bounds.min.y+(bounds.max.y-bounds.min.y)*.12;
 const samples=[],point=new THREE.Vector3();
 model.traverse(mesh=>{if(!mesh.isMesh)return;const ids=[];for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,point);point.applyMatrix4(mesh.matrixWorld);if(point.y<=limit)ids.push(i)}if(ids.length)samples.push({mesh,ids})});
 return top=>{
  model.updateWorldMatrix(true,true);let min=Infinity;
  for(const {mesh,ids}of samples){mesh.skeleton?.update();for(const i of ids){mesh.getVertexPosition(i,point);point.applyMatrix4(mesh.matrixWorld);min=Math.min(min,point.y)}}
  if(Number.isFinite(min))model.position.y+=top+.015-min;
  return Number.isFinite(min)?top+.015:top;
 }
}
