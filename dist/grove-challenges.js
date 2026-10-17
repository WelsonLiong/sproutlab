// Ten fixed science decisions. Navigation and puzzle moves never submit an answer.
export const chapters=[
 {name:'Wake the grove',place:'Sunlit meadow',center:[-4,2],range:[0,4]},
 {name:'The leaf workshop',place:'Leaf clearing',center:[5,-3],range:[5,6]},
 {name:'A forest for everyone',place:'Living grove',center:[1,5],range:[7,9]}
];
export const challenges=[
 {id:'meaning',chapter:0,standard:'4.2.1',type:'dialogue',title:'Sprout has a secret',prompt:'Sprout needs food to grow. What does photosynthesis let a plant do?',initial:{choice:null},choices:[['soil','Take ready-made food from soil'],['make','Make its own food'],['drink','Turn water alone into food']],answer:'make',why:'Photosynthesis is the process by which plants make their own food. Roots absorb water and minerals; they do not collect ready-made food from soil.'},
 {id:'sunlight',chapter:0,standard:'4.2.2',type:'mirrors',title:'Catch a little sunshine',prompt:'Water, carbon dioxide and chlorophyll are ready. Turn the two mirrors to bring the missing light energy to the leaf.',initial:{near:0,far:0},why:'Sunlight supplies energy for photosynthesis. With water, carbon dioxide and chlorophyll also present, the leaf can make food.'},
 {id:'water',chapter:0,standard:'4.2.2',type:'carry',title:'A delivery for the roots',prompt:'Choose a supply, carry it to the soil bed and press E to deliver it. Which supply does the plant need for photosynthesis?',initial:{cargo:null},items:[['soil','Soil','leaf'],['water','Water','drop'],['food','Ready-made food','heart']],answer:'water',why:'Water is a need for photosynthesis. Roots absorb it, and it travels through the stem to the leaves. Soil and ready-made food are not ingredients for photosynthesis.'},
 {id:'carbon',chapter:0,standard:'4.2.2',type:'filter',title:'A tiny door in the leaf',prompt:'Open the leaf model to the gas it needs from the air. Choose a molecule, then send it through the tiny opening.',initial:{gas:null},items:[['oxygen','Oxygen · O₂','wind'],['co2','Carbon dioxide · CO₂','wind'],['water','Water vapour','drop']],answer:'co2',why:'Carbon dioxide from the air enters leaves through tiny openings. Air movement is not itself a requirement for photosynthesis.'},
 {id:'chlorophyll',chapter:0,standard:'4.2.2',type:'leaves',title:'Find the light catcher',prompt:'Both leaf areas get the same light, water and carbon dioxide. Choose the area that can use light to make food.',initial:{leaf:null},items:[['white','White area','leaf'],['green','Green area','leaf']],answer:'green',why:'The green area contains chlorophyll, which absorbs light energy. In this model, the white area has no chlorophyll.'},
 {id:'starch',chapter:1,standard:'4.2.3',type:'carry',title:'Pack the leaf’s food store',prompt:'The leaf has made glucose. Some of it is stored in another form. Carry the correct crate to the store and press E to pack it.',initial:{cargo:null},items:[['water','Water','drop'],['sand','Sand','map'],['starch','Starch','leaf']],answer:'starch',why:'Some glucose made during photosynthesis is converted to starch for storage. The DSKP names starch and oxygen as the products of photosynthesis.'},
 {id:'oxygen',chapter:1,standard:'4.2.3',type:'catcher',title:'What is bubbling out?',prompt:'The leaf model is photosynthesising. Move the collecting cart beneath the name of the gas released by photosynthesis.',initial:{basket:0},items:[['co2','Carbon dioxide','wind'],['oxygen','Oxygen','wind'],['starch','Starch','leaf']],answer:1,why:'Photosynthesis releases oxygen. Carbon dioxide is used as a raw material, while some food is stored as starch.'},
 {id:'food',chapter:2,standard:'4.2.4',type:'chain',title:'Feed the forest',prompt:'Start with the living thing that makes its own food. Then feed the rabbit and the fox. Swap the figures to build the food chain.',initial:{order:['fox','plant','rabbit']},why:'Plants make food through photosynthesis. A rabbit can eat a plant, and a fox can eat a rabbit. Food energy can therefore reach animals through plants.'},
 {id:'breathing',chapter:2,standard:'4.2.4',type:'bridge',title:'Help the rabbit breathe',prompt:'Over time, breathing uses oxygen. Connect the shelter to the place where photosynthesis adds oxygen to the air.',initial:{plot:0},items:[['rocks','Bare rocks','map'],['plants','Green plants in light','sprout']],answer:1,why:'Photosynthesis adds oxygen to the air. Animals and humans use oxygen for breathing. This model shows the connection over time; it is not an instant oxygen meter.'},
 {id:'balance',chapter:2,standard:'4.2.4',type:'dialogue',title:'The forest’s lasting gift',prompt:'If photosynthesis stopped across the forest for a long time, what would happen to its contribution to the air?',initial:{choice:null},choices:[['more','More oxygen would be added and more carbon dioxide used'],['less','Less oxygen would be added and less carbon dioxide used'],['same','Photosynthesis would make no difference to the air']],answer:'less',why:'Photosynthesis uses carbon dioxide and releases oxygen, helping maintain the balance of gases in the air. Plants also respire during both day and night.'}
];
export function correctConfiguration(q,c){
 if(q.type==='dialogue')return c.choice===q.answer;
 if(q.type==='mirrors')return c.near===1&&c.far===2;
 if(q.type==='carry')return c.cargo===q.answer;
 if(q.type==='filter')return c.gas===q.answer;
 if(q.type==='leaves')return c.leaf===q.answer;
 if(q.type==='catcher')return c.basket===q.answer;
 if(q.type==='chain')return c.order.join(',')==='plant,rabbit,fox';
 return c.plot===q.answer;
}
