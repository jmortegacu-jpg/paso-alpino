/**
 * PASO ALPINO · FUTURE STUDIO — visual-only vehicle design pack.
 * Original vehicle accents, inspired by the language of future GTs,
 * track hypercars, electric concepts, Japanese sports coupes and SUVs.
 * Does not change collision, wheelbase, game performance or physics.
 *
 * Body coordinate convention: +Z front, +Y up, X lateral.
 */
export function enhanceFutureCar(THREE, body, model, { detailed = true } = {}) {
  if (!detailed || !body || !model) return null;
  const id = model.id;
  const style = {
    aurora:    {name:'aero-v12', light:0x96ddff, accent:0x1a2330, wing:'floating', front:'blade'},
    cometa:    {name:'track-hyper', light:0xe3f3ff, accent:0x101820, wing:'double',   front:'fang'},
    quetzal:   {name:'grand-tourer', light:0xc5eaff, accent:0x29313a, wing:'duck',   front:'sweep'},
    volcan:    {name:'jdm-neo',     light:0xff4242, accent:0x1a1c22, wing:'gt',     front:'split'},
    relampago: {name:'evolution-ev',light:0x6ddfff, accent:0x1b2734, wing:'duck',   front:'pixel'},
    colibri:   {name:'micro-gt',    light:0xf5fbff, accent:0x1c242b, wing:'short',  front:'split'},
    danta:     {name:'expedition',  light:0xeaf3ff, accent:0x293036, wing:'rack',   front:'stack'}
  }[id] || {name:'future', light:0xeef9ff,accent:0x171b20,wing:'duck',front:'sweep'};
  const F=model.zf, R=model.zr;
  const forwardW=Math.max(.72, model.B.w(F-.2));
  const rearW=Math.max(.72, model.B.w(R+.2));
  const wheelbase=Math.max(2.2,model.wheels.zf-model.wheels.zr);
  const trim=new THREE.MeshPhysicalMaterial({color:style.accent, metalness:.38,roughness:.3,clearcoat:.75,clearcoatRoughness:.12});
  const carbon=new THREE.MeshPhysicalMaterial({color:0x090c10, metalness:.48,roughness:.28,clearcoat:.8,clearcoatRoughness:.07});
  const satin=new THREE.MeshStandardMaterial({color:0x85949e,metalness:.94,roughness:.25});
  const led=new THREE.MeshStandardMaterial({color:0xffffff,emissive:style.light,emissiveIntensity:2.15,roughness:.15});
  const tail=new THREE.MeshStandardMaterial({color:0x601010,emissive:0xff2525,emissiveIntensity:1.8,roughness:.22});
  const group=new THREE.Group();
  group.name='OrtegaCorp · '+style.name;
  body.add(group);
  const mesh=(g,m,x=0,y=0,z=0)=>{
    const o=new THREE.Mesh(g,m);o.position.set(x,y,z);
    o.castShadow=m!==led&&m!==tail;o.receiveShadow=true;group.add(o);return o;
  };
  const bar=(x,y,z,sx,sy,sz,mat=carbon)=>{
    return mesh(new THREE.BoxGeometry(sx,sy,sz),mat,x,y,z);
  };
  const tube=(pts,mat=led,r=.012)=>{
    if(pts.length<2)return;
    const path=new THREE.CatmullRomCurve3(pts.map(([x,y,z])=>new THREE.Vector3(x,y,z)),false,'centripetal');
    return mesh(new THREE.TubeGeometry(path,Math.max(12,pts.length*8),r,7,false),mat);
  };
  const wingSection=(z,y,w,depth=.25)=> {
    const sh=new THREE.Shape();
    sh.moveTo(-w,0);
    sh.lineTo(-w*.86,-depth*.14);
    sh.quadraticCurveTo(0,-depth*.55,w*.86,-depth*.14);
    sh.lineTo(w,0);sh.lineTo(w,depth*.54);
    sh.quadraticCurveTo(0,depth*.77,-w,depth*.54);
    sh.closePath();
    const geo=new THREE.ExtrudeGeometry(sh,{depth:.026,bevelEnabled:true,bevelThickness:.006,bevelSize:.006,bevelSegments:1,curveSegments:8});
    geo.rotateX(Math.PI/2);
    return mesh(geo,carbon,0,y,z);
  };
  // Chassis-mounted front splitter with tapered lateral wings.
  const lip=wingSection(F+.05,.19,forwardW*.96,.27);
  lip.rotation.x=.013;
  for(const side of [-1,1]){
    const sx=side*forwardW;
    // Aero surfaces follow the wheel arches instead of extending to the axle.
    const canard=mesh(new THREE.BoxGeometry(.29,.02,.21),carbon,side*(forwardW-.10),.29,F-.20);
    canard.rotation.y=side*.28;
    canard.rotation.z=side*.11;
    // Continuous side blade tucked inside the front and rear wheel.
    const sideLength=Math.max(.65,wheelbase-1.85);
    bar(side*(model.wheels.track+.018),.22,(model.wheels.zf+model.wheels.zr)/2,
        .055,.085,sideLength,trim);
    // Sculpted side air intake trim, forming a distinct diagonal line.
    const z0=Math.min(-.27,R+.9), z1=Math.max(z0+.42,model.wheels.zr+.75);
    tube([[side*forwardW*.95,.44,z1],[side*(forwardW+.025),.49,(z1+z0)/2],
      [side*forwardW*.91,.67,z0]],satin,.009);
    // Amber motorsport side marker.
    const marker=new THREE.MeshStandardMaterial({color:0x52351a,emissive:0xf39a36,emissiveIntensity:1.05});
    bar(side*(forwardW*.84),.55,F-.24,.018,.023,.11,marker);
  }
  // Rear undertray fins are mounted beneath the rear bumper rather than on the wheels.
  wingSection(R-.035,.23,rearW*.91,.26);
  for(let k=-2;k<=2;k++){
    const fin=bar(k*rearW*.28,.235,R-.01,.022,.19,.39,carbon);
    fin.rotation.y=k*.045;
  }
  // Individual front signatures — recognizable profiles, no borrowed manufacturer logos.
  const z=F+.012;
  const lamp=(x,y)=>[x,y,z];
  for(const side of [-1,1]){
    const W=forwardW;
    if(style.front==='blade'){
      tube([lamp(side*.29,.57),lamp(side*.53,.56),lamp(side*.78,.64),lamp(side*.91,.48)],led,.017);
      tube([lamp(side*.76,.48),lamp(side*.72,.37)],led,.01);
    } else if(style.front==='fang'){
      tube([lamp(side*.2,.64),lamp(side*.5,.58),lamp(side*.82,.57),lamp(side*.75,.42)],led,.017);
      tube([lamp(side*.82,.57),lamp(side*.94,.45)],led,.011);
    } else if(style.front==='sweep'){
      tube([lamp(side*.3,.62),lamp(side*.63,.61),lamp(side*.86,.52)],led,.018);
    } else if(style.front==='split'){
      tube([lamp(side*.3,.62),lamp(side*.49,.59),lamp(side*.7,.60)],led,.015);
      tube([lamp(side*.3,.55),lamp(side*.49,.52),lamp(side*.71,.53)],led,.012);
    } else if(style.front==='pixel'){
      for(let k=0;k<4;k++)bar(side*(.37+.12*k),.6+(k%2)*.015,z,.09,.025,.025,led);
      tube([lamp(side*.37,.46),lamp(side*.8,.46)],led,.01);
    } else if(style.front==='stack'){
      tube([lamp(side*.32,.77),lamp(side*.8,.77)],led,.018);
      tube([lamp(side*.32,.68),lamp(side*.8,.68)],led,.012);
    }
  }
  // Rear LED signatures and model-specific downforce architecture.
  const rearZ=R-.025;
  if(['aurora','cometa','relampago','quetzal'].includes(id)){
    tube([[-rearW*.82,.74,rearZ],[-rearW*.5,.74,rearZ],[0,.73,rearZ],
      [rearW*.5,.74,rearZ],[rearW*.82,.74,rearZ]],tail,.019);
  } else {
    for(const side of [-1,1]){
      tube([[side*.25,.77,rearZ],[side*.56,.76,rearZ],[side*rearW*.89,.7,rearZ]],tail,.019);
    }
  }
  // Wings intentionally keep their supports on the body, not the rotating wheel assembly.
  const top=Math.max(1.0,model.top||model.K.top(-.4));
  if(style.wing==='floating'||style.wing==='double'||style.wing==='gt'){
    const low=style.wing==='gt'?.16:.21;
    for(const side of [-1,1]){
      bar(side*rearW*.49,top+.05,R+.23,.035,.35,.11,trim);
    }
    wingSection(R+.21,top+.27,rearW*(style.wing==='double'?1.08:1.01),.3);
    if(style.wing==='double'){
      wingSection(R+.35,top+.16,rearW*.96,.21);
      for(const side of [-1,1]){
        bar(side*rearW,top+.27,R+.16,.026,.22,.32,carbon);
      }
    }
    if(style.wing==='gt'){
      for(const side of [-1,1])bar(side*rearW*.94,top+.24,R+.22,.026,.2,.27,carbon);
    }
  } else if(style.wing==='duck'||style.wing==='short'){
    wingSection(R+.12,top-.065,rearW*.76,.13);
  } else if(style.wing==='rack'){
    for(const side of [-1,1]){
      const rail=bar(side*rearW*.67,top+.15,(F+R)/2,.05,.06,Math.min(2.3,wheelbase*.78),satin);
      rail.rotation.z=side*.025;
    }
    bar(0,top+.19,F-.66,rearW*1.15,.06,.095,carbon);
    for(let i=-3;i<=3;i++)bar(i*rearW*.145,top+.2,F-.59,.05,.023,.018,led);
  }
  group.userData.futureStudio={model:id,category:style.name,physicsUnchanged:true};
  return group;
}
