import * as THREE from './vendor/three/three.module.js';

export function gasCollector(h,config){
 const {root,mesh,mat,box,sphere,tube,leaf,label,clickable,floaters,seat}=h;
 const apparatus=new THREE.Group();root.add(apparatus);apparatus.position.set(0,.18,-.6);
 box(0,.12,0,3.4,.24,2.6,0x9c8256,apparatus);
 const tank=mesh(new THREE.CylinderGeometry(1.22,1.22,1.45,40,1,true),mat(0xc5e2da,{transparent:true,opacity:.25,depthWrite:false,side:THREE.DoubleSide}),apparatus);tank.position.y=.97;
 const water=mesh(new THREE.CylinderGeometry(1.17,1.17,1.05,40),mat(0x78bbc1,{transparent:true,opacity:.3,depthWrite:false}),apparatus);water.position.y=.76;
 for(const side of [-1,1])leaf(side*.35,.27,0,0x679c48,.46,apparatus);
 const funnel=mesh(new THREE.ConeGeometry(.7,.7,24,1,true),mat(0xd6e4d1,{transparent:true,opacity:.48,side:THREE.DoubleSide,depthWrite:false}),apparatus);funnel.position.y=1.17;
 const jar=mesh(new THREE.CylinderGeometry(.37,.37,1.6,24,1,true),mat(0xe4eddb,{transparent:true,opacity:.42,side:THREE.DoubleSide,depthWrite:false}),apparatus);jar.position.y=2.23;clickable(jar,'collect');
 const stopper=mesh(new THREE.CylinderGeometry(.4,.4,.12,24),mat(0xe3d8b1),apparatus);stopper.position.y=3.07;stopper.visible=!config.observed;
 box(1.2,1.8,0,.13,3.5,.13,0x756446,apparatus);box(.6,2.85,0,1.25,.13,.13,0x756446,apparatus);
 label(config.collected?'Gas collected':'Collect the bubbles',0,3.8,0,3.1,apparatus);
 for(let i=0;i<8;i++){const bubble=sphere((i%3-1)*.12,.8+i*.23,.08,.075,0xe1f3d4,apparatus);bubble.material.transparent=true;bubble.material.opacity=.8;floaters.push({object:bubble,base:.8,phase:i*.4,rise:true})}
 if(config.collected){const gas=sphere(0,2.65,0,.28,0xeaf0c3,apparatus);gas.material.transparent=true;gas.material.opacity=.45;gas.scale.y=1.3}
 const splint=new THREE.Group();root.add(splint);splint.position.set(config.observed?.08:2.7,config.observed?4.05:.18,config.observed?-.6:.5);if(config.observed)splint.rotation.z=Math.PI;
 const stick=box(0,.5,0,.08,1,.08,0x846337,splint);clickable(stick,'splint');sphere(0,1.04,0,.09,0xe09238,splint);
 if(config.observed){const flame=mesh(new THREE.ConeGeometry(.16,.48,8),mat(0xffd45f,{emissive:0xe99c32,emissiveIntensity:.9}),splint);flame.position.y=1.28;label('The glowing splint relights',0,4.75,-.6,4.3)}else label('Try the glowing splint',2.7,1.8,.5,2.9);
 // These are identification plaques, not destinations for an arbitrary cart.
 for(const [i,key,text]of [[0,'co2','Carbon dioxide'],[1,'oxygen','Oxygen'],[2,'starch','Starch']]){const x=-2.5+i*2.5;const plaque=box(x,.36,2.4,2,.24,.95,config.gas===key?0xe0c16c:0x9f875e);clickable(plaque,key);label(text,x,.96,2.4,2.2)}
 label('Water plant in light',0,.65,1.3,3);
 const sun=sphere(-2.8,3.1,-1.5,.42,0xeac75f);sun.material.emissive=new THREE.Color(0xebbb44);sun.material.emissiveIntensity=.3;
 tube([[-2.8,3.1,-1.5],[-1.4,1.2,-.6]],0xffdf80,.045);
 seat(apparatus,.18);
}
