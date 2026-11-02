/**
 * PASO ALPINO — ORTEGACORP NEXT-GEN CHASSIS
 * Seven original, parametric, driveable 3D body designs.
 * Source geometry: custom longitudinal lofts, cabin glazing, modeled wheel arches,
 * original fascia and lighting signatures, interior, carbon aero and rim detailing.
 * This module only changes presentation. Do not modify car transforms or physics.
 * Vehicle axis: +Z forward; +X right; +Y up.
 */
export function buildFutureChassis(THREE, P, M, {high = true, player = false, paint = null} = {}) {
  if (!P || !P.root || !P.body || !M || !M.wheels) return null;

  const themes = {
    aurora:    {title:'AURORA V12 / AETHER',    type:'lfa-inspired grand tourer', nose:.70,shoulder:.31,waist:.70,arch:.06,roof:.80, splitter:.21, tail:'arrow', led:'slash', wing:'blade', intake:'boomerang', rim:'turbine'},
    cometa:    {title:'COMETA / X-01',          type:'future track hypercar',    nose:.87,shoulder:.39,waist:.63,arch:.12,roof:.73, splitter:.32, tail:'bar', led:'triple', wing:'dual', intake:'deep', rim:'mesh'},
    quetzal:   {title:'QUETZAL / GT-X',         type:'future luxury sports GT',  nose:.58,shoulder:.22,waist:.83,arch:.02,roof:.89, splitter:.12, tail:'sweep', led:'oval', wing:'duck', intake:'stream', rim:'five'},
    volcan:    {title:'VOLCAN / R34 NOVA',      type:'future Japanese GT',      nose:.73,shoulder:.37,waist:.77,arch:.09,roof:.82, splitter:.25, tail:'quad', led:'pixel', wing:'race', intake:'blade', rim:'split'},
    relampago: {title:'RELAMPAGO / E-VISION',   type:'future electric hyper GT',nose:.62,shoulder:.20,waist:.68,arch:.04,roof:.77, splitter:.13, tail:'bar', led:'pixel', wing:'duck', intake:'stream', rim:'disc'},
    colibri:   {title:'COLIBRI / ZR',          type:'future light coupe',      nose:.73,shoulder:.26,waist:.86,arch:.04,roof:.86, splitter:.16, tail:'arrow', led:'slash', wing:'duck', intake:'boomerang', rim:'split'},
    danta:     {title:'DANTA / X-TERRAIN',     type:'future performance SUV',  nose:.88,shoulder:.20,waist:.94,arch:.14,roof:.94, splitter:.13, tail:'bar', led:'stack', wing:'rack', intake:'blade', rim:'mesh'}
  };
  const C=themes[M.id]||themes.aurora;
  const W=M.wheels, F=M.zf, R=M.zr;
  const body=P.body, highSeg=high?72:36, secSeg=high?5:3;
  const group=new THREE.Group();group.name=C.title;
  const material={
    paint:new THREE.MeshPhysicalMaterial({color:paint?.color || new THREE.Color(M.paint||'#c42424'),
      metalness:.55,roughness:.19,clearcoat:1,clearcoatRoughness:.035,envMapIntensity:2.1,side:THREE.DoubleSide}),
    carbon:new THREE.MeshPhysicalMaterial({color:0x0b0e12,metalness:.28,roughness:.32,clearcoat:1,clearcoatRoughness:.10,side:THREE.DoubleSide}),
    vent:new THREE.MeshStandardMaterial({color:0x06080b,metalness:.14,roughness:.9,side:THREE.DoubleSide}),
    mesh:new THREE.MeshStandardMaterial({color:0x222932,metalness:.58,roughness:.55,side:THREE.DoubleSide}),
    glass:new THREE.MeshPhysicalMaterial({color:0x192935,metalness:.18,roughness:.055,transparent:true,opacity:.84,depthWrite:false,clearcoat:1,clearcoatRoughness:0,envMapIntensity:1.9,side:THREE.DoubleSide}),
    trim:new THREE.MeshPhysicalMaterial({color:0x58626a,metalness:.9,roughness:.24,side:THREE.DoubleSide}),
    seat:new THREE.MeshStandardMaterial({color:M.id==='volcan'?0x5c1a20:0x1d222a,roughness:.75}),
    stitch:new THREE.MeshStandardMaterial({color:0xb08e66,roughness:.85}),
    head:new THREE.MeshStandardMaterial({color:0xdfeeff,emissive:0xb6dbff,emissiveIntensity:2.5,roughness:.2}),
    tail:new THREE.MeshStandardMaterial({color:0x5a0607,emissive:0xff1b18,emissiveIntensity:2.1,roughness:.26})
  };
  const add=(geometry,mat,x=0,y=0,z=0)=>{
    const o=new THREE.Mesh(geometry,mat);o.position.set(x,y,z);o.castShadow=mat!==material.glass&&mat!==material.head&&mat!==material.tail;
    o.receiveShadow=true;group.add(o);return o;
  };
  const box=(w,h,l,mat,x,y,z,bevel=0)=>{
    if(bevel>0&&high){
      // Bevelled extrusion softens the visible edge of carbon aero components.
      const sh=new THREE.Shape();sh.moveTo(-w/2,-h/2);sh.lineTo(w/2,-h/2);sh.lineTo(w/2,h/2);
      sh.lineTo(-w/2,h/2);sh.closePath();
      const g=new THREE.ExtrudeGeometry(sh,{depth:l,bevelEnabled:true,bevelSize:bevel,bevelThickness:bevel,bevelSegments:2,steps:1});
      g.translate(0,0,-l/2);return add(g,mat,x,y,z);
    }
    return add(new THREE.BoxGeometry(w,h,l),mat,x,y,z);
  };
  const curve=(nodes,mat,r=.012)=>{
    if(nodes.length<2)return null;
    const ps=nodes.map(p=>new THREE.Vector3(...p));
    const g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ps),Math.max(12,ps.length*7),r,6,false);
    return add(g,mat);
  };
  const cw=z=>M.B.w(z), roof=z=>M.B.yt(z);
  const shear=C.shoulder, thin=z=>(z-F)/(R-F);
  // Side surfaces and fenders are deliberately based on the wheel centers:
  // the ground contact and tyre track always match the actual carKit wheel rig.
  const archHeight=(x,z,y)=>{
    for(const [wz,rad] of [[W.zf,W.rf],[W.zr,W.rr]]){
      const archR=rad+(W.gap||.06)+C.arch;
      const dz=z-wz;
      if(Math.abs(dz)<archR&&Math.abs(x)>cw(z)*.46){
        const h=rad+Math.sqrt(Math.max(0,archR*archR-dz*dz));
        y=Math.max(y,h);
      }
    }
    return y;
  };
  const styleRidge=(z,x,w)=>{
    const n=Math.abs(x)/Math.max(.01,w);
    const hip=Math.exp(-Math.pow((z-W.zr)/.85,2));
    const shoulder=Math.exp(-Math.pow((n-.82)/.20,2))*(C.shoulder*.14);
    const hood= z>W.zf-.15 ?-.06*Math.pow((z-W.zf+.15)/1.1,2):0;
    return shoulder+hip*C.arch*.34+hood;
  };
  // Original polygonal topography. Surface grows continuously from nose to tail
  // and uses six distinct longitudinal strips per half; wheel openings are
  // sculpted by elevating the lower fascia above the tyre's circular envelope.
  const profile=(z,side)=>{
    const w=cw(z)*(1 + (C.waist-.8)*.11*Math.exp(-Math.pow(z/.75,2)));
    const top=roof(z), shoulderY=M.B.ye(z),rocker=M.B.yr(z),base=M.B.yb(z);
    const shoulderW=Math.min(.94,.72+shear*.16);
    const half=[
      [0,top+styleRidge(z,0,w)],
      [.40*w,top-.014+styleRidge(z,.40*w,w)],
      [shoulderW*w,shoulderY+styleRidge(z,shoulderW*w,w)],
      [w*.955,M.B.ys(z)+.012],
      [w,rocker+.13],
      [w*.985,rocker],
      [w*.70,base+.02],
      [.18*w,base],[0,base]
    ];
    return half.map(([x,y])=>[side*x,archHeight(x,z,y),z]);
  };
  // Smooth curvature across the width of the vehicle, not only lengthwise.
  // The old nine-point half-section made paint highlights look like folded
  // polygons. Centripedal splines create continuous hood, shoulder and haunch.
  const curveDetail=high?4:2;
  const smoothProfile=(z,side)=>{
    const points=profile(z,side).map(p=>new THREE.Vector3(...p));
    const spline=new THREE.CatmullRomCurve3(points,false,'centripetal',.18);
    return spline.getPoints((points.length-1)*curveDetail)
      .map(p=>[p.x,p.y,p.z]);
  };
  const vertices=[],indices=[],uv=[];
  const rowParts=8*curveDetail+1,ring=2*rowParts-2;
  for(let i=0;i<=highSeg;i++){
    const z=F+(R-F)*i/highSeg;
    const pR=smoothProfile(z,1),pL=smoothProfile(z,-1);
    const ringPts=[...pR,...pL.slice(1,-1).reverse()];
    if(ringPts.length!==ring)throw Error('Invalid continuous body ring');
    for(let j=0;j<ringPts.length;j++){
      vertices.push(...ringPts[j]);uv.push(j/ring,i/highSeg);
    }
  }
  for(let i=0;i<highSeg;i++)for(let j=0;j<ring;j++){
    const a=i*ring+j,b=i*ring+(j+1)%ring,c=(i+1)*ring+j,d=(i+1)*ring+(j+1)%ring;
    indices.push(a,c,b,b,c,d);
  }
  const bodyGeo=new THREE.BufferGeometry();
  bodyGeo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  bodyGeo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  bodyGeo.setIndex(indices);bodyGeo.computeVertexNormals();
  // Connected smooth normals across the longitudinal seam, avoiding a
  // conspicuous dark line along the center of the hood and roof.
  const normals=bodyGeo.getAttribute('normal');
  for(let k=0;k<=highSeg;k++){
    const a=k*ring,b=a+ring-1;
    const nx=(normals.getX(a)+normals.getX(b))*.5,
          ny=(normals.getY(a)+normals.getY(b))*.5,
          nz=(normals.getZ(a)+normals.getZ(b))*.5;
    const len=Math.hypot(nx,ny,nz)||1;
    normals.setXYZ(a,nx/len,ny/len,nz/len);
    normals.setXYZ(b,nx/len,ny/len,nz/len);
  }
  normals.needsUpdate=true;
  const shell=add(bodyGeo,material.paint);shell.name='Original hand-parametric fender and body shell';

  // Bespoke curved front and tail caps, stitched to the loft perimeter.
  // A flat full-width box looked toy-like and projected beyond the fender.
  for(const [z,front] of [[F,true],[R,false]]){
    const outline=[...profile(z,1),...profile(z,-1).slice(1,-1).reverse()];
    const yz=(M.B.yt(z)+M.B.yb(z))/2, positions=[0,yz,z+(front?.004:-.004)];
    const idx=[];
    for(const pt of outline)positions.push(pt[0],pt[1],z+(front?.004:-.004));
    for(let k=0;k<outline.length;k++)idx.push(0,1+k,1+(k+1)%outline.length);
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    g.setIndex(idx);g.computeVertexNormals();
    add(g,material.paint);
    const y0=M.B.yb(z)+.05,y1=M.B.yt(z)-.045,w=cw(z)*.9;
    const lower=Math.max(.13,Math.min(.31,(y1-y0)*.6));
    box(w*(front?1.45:1.25),lower,.053,material.vent,0,y0+lower*.58,z+(front?.029:-.029));
    if(high){
      for(let i=-5;i<=5;i++){
        box(.018,lower*.85,.057,material.mesh,i*w*.105,y0+lower*.57,z+(front?.059:-.059));
      }
    }
  }
  // Cabin: bespoke longitudinal canopy, trapezoidal side glass, windshield,
  // integrated solid roof spine. Front and rear body proportions follow M's
  // original wheelbase; roof is raised on offroad model.
  const z1=M.cabin.z1,z0=M.cabin.z0,cabSeg=high?40:20;
  function cab(z){
    const top=M.K.top(z)*(.985+C.roof*.017);
    const wb=M.K.wb(z),wt=M.K.wt(z);
    const base=Math.min(top-.04,roof(z)+.018);
    return [
      [0,top,z],
      [wt*.68,top-.015,z],
      [wt,top-.035,z],
      [wb*.88,base+Math.max(.035,(top-base)*.35),z],
      [wb,base,z]
    ];
  }
  const cp=[],ci=[],cu=[],nr=9;
  for(let i=0;i<=cabSeg;i++){
    const z=z0+(z1-z0)*i/cabSeg,pr=cab(z);
    // Keep both lower edges; the previous eight-point ring omitted the
    // driver's side glass foot and produced asymmetric roof geometry.
    const ringPoints=[...pr,...pr.slice(1).reverse().map(([x,y,z])=>[-x,y,z])];
    for(let j=0;j<nr;j++){cp.push(...ringPoints[j]);cu.push(j/(nr-1),i/cabSeg);}
  }
  for(let i=0;i<cabSeg;i++)for(let j=0;j<nr-1;j++){
    const a=i*nr+j,b=a+1,c=a+nr,d=c+1;ci.push(a,c,b,b,c,d);
  }
  const cg=new THREE.BufferGeometry();
  cg.setAttribute('position',new THREE.Float32BufferAttribute(cp,3));
  cg.setAttribute('uv',new THREE.Float32BufferAttribute(cu,2));cg.setIndex(ci);cg.computeVertexNormals();
  add(cg,material.glass).renderOrder=2;
  // Roof crossbar, windshield pillars and window edge rubbers.
  const roofMid=(z0+z1)*.5;
  for(const s of [-1,1]){
    curve([[-1,0,0].map((_,i)=>[s*M.K.wb(z0),roof(z0)+.04,z0][i]),
      [s*M.K.wt(roofMid)*.98,M.K.top(roofMid)-.028,roofMid],
      [s*M.K.wb(z1),roof(z1)+.025,z1]],material.carbon,.017);
    curve([[s*M.K.wb(z0),roof(z0)+.04,z0],
      [s*M.K.wt(z0-.13),M.K.top(z0-.13)-.02,z0-.13],
      [s*M.K.wt(roofMid),M.K.top(roofMid)-.03,roofMid],
      [s*M.K.wt(z1+.14),M.K.top(z1+.14)-.025,z1+.14]],material.trim,.009);
  }
  box(M.K.wt(roofMid)*1.85,.023,Math.max(.15,(z0-z1)*.25),material.carbon,0,M.K.top(roofMid)+.002,roofMid-.045);

  // Physical cockpit: original bucket seats, backs, bolsters, dash, center
  // tunnel, turbine vents and steering wheel on the same axis as camera mode.
  if(high){
    const seatY=Math.max(.36,M.interior?.y||.45),seatZ=M.interior?.z??-.35;
    const seatX=Math.min(.44,M.interior?.x??.33);
    for(const s of [-1,1]){
      const seat=box(.40,.50,.14,material.seat,s*seatX,seatY+.32,seatZ-.13,.025);seat.rotation.x=-.22;
      box(.43,.11,.42,material.seat,s*seatX,seatY+.04,seatZ+.17,.02);
      for(const ss of [-1,1]){
        const bolster=box(.075,.27,.12,material.carbon,s*seatX+ss*.18,seatY+.33,seatZ-.15);bolster.rotation.x=-.18;
      }
      box(.13,.15,.06,material.seat,s*seatX,seatY+.64,seatZ-.22,.015);
      curve([[s*(seatX-.085),seatY+.35,seatZ-.03],
        [s*(seatX-.08),seatY+.50,seatZ-.11]],material.stitch,.006);
    }
    box(1.2,.10,.40,material.carbon,0,seatY+.36,z0-.32);
    box(.17,.14,.88,material.carbon,0,seatY+.14,seatZ+.42);
    for(const x of [-.46,.46])add(new THREE.TorusGeometry(.060,.012,6,16),material.trim,x,seatY+.38,z0-.08);
  }

  // Strong shoulder and door lines provide large-scale surface detail. These
  // curves emphasize the side silhouette without projecting into wheel space.
  const mids=[W.zf-.55,.15,W.zr+.60];
  for(const s of [-1,1]){
    curve(mids.map(z=>[s*cw(z)*.966,M.B.ye(z)+.02,z]),material.trim,high?.010:.009);
    const lowFrom=W.zf-.62,lowTo=W.zr+.61;
    curve([[s*cw(lowFrom)*.985,M.B.yr(lowFrom)+.17,lowFrom],
      [s*cw(.05)*1.002,M.B.yr(.05)+.16,.05],
      [s*cw(lowTo)*.974,M.B.yr(lowTo)+.23,lowTo]],material.carbon,.025);
    // Deep side air inlet with sculpted surrounding geometry and realistic floor.
    const vin=M.id==='danta'?.24:.45, iz=W.zr+.79;
    const intake=box(.021,vin,.53,material.vent,s*(cw(iz)*.978),M.B.ys(iz)-.09,iz);
    intake.rotation.y=s*.10;intake.rotation.z=s*.065;
    for(let k=0;k<3;k++)box(.027,.015,.40,material.mesh,
      s*cw(iz)*.99,M.B.ys(iz)-.16+k*.1,iz);
    // Architectural fender vents placed behind the front axle.
    if(M.id==='volcan'||M.id==='cometa'||M.id==='aurora'){
      for(let k=0;k<3;k++){
        const z=W.zf-.56-k*.115;
        const gill=box(.014,.13,.027,material.vent,s*cw(z)*1.004,M.B.ys(z)+.075,z);
        gill.rotation.z=s*.13;
      }
    }
    // Sculpted door handle and side-camera housing.
    const handleZ=-.07;
    box(.038,.027,.18,material.trim,s*cw(handleZ)*1.005,M.B.ys(handleZ)+.18,handleZ);
    const mirror=add(new THREE.SphereGeometry(.095,high?16:8,high?10:6),material.paint,
       s*(M.K.wb(z0-.18)+.19),M.K.top(z0-.18)-.17,z0-.17);
    mirror.scale.set(1.22,.62,.74);
  }
  // Matching four wheel arches: fender lips follow exact tire centre and
  // radius; no independent shifts of the axles or wheels.
  for(const [z,rad] of [[W.zf,W.rf],[W.zr,W.rr]]){
    const radius=rad+(W.gap||.06)+C.arch;
    for(const sign of [-1,1]){
      const pts=[];
      for(let j=0;j<=24;j++){
        const a=Math.PI*j/24,zz=z-radius*Math.cos(a);
        const yy=rad+radius*Math.sin(a);
        pts.push([sign*cw(zz)*.998,yy,zz]);
      }
      curve(pts,material.carbon,.018);
    }
  }

  // Distinct curved LED silhouettes: designed as luminous volume, not stickers.
  const headY=M.B.ye(F-.29)+.035,hz=F-.27;
  for(const s of [-1,1]){
    const wx=cw(hz);
    const p=(x,y,z=hz)=>[s*wx*x,headY+y,z];
    if(C.led==='slash'){
      curve([p(.38,.025),p(.59,.02),p(.79,.015),p(.92,-.12)],material.head,.018);
      curve([p(.75,-.02),p(.80,-.17)],material.head,.010);
    } else if(C.led==='triple'){
      for(let k=0;k<3;k++)curve([p(.43,-.005-k*.042),p(.66,-.022-k*.032),p(.87,-.045-k*.02)],material.head,.013);
    } else if(C.led==='oval'){
      const nodes=[];for(let k=0;k<=14;k++){
        const a=k/14*Math.PI*2;nodes.push(p(.71+Math.cos(a)*.18,-.08+Math.sin(a)*.09));
      }curve(nodes,material.head,.014);
    } else if(C.led==='pixel'){
      for(let k=0;k<4;k++)box(.095,.03,.035,material.head,s*wx*(.41+k*.13),headY-(k%2)*.012,hz);
      curve([p(.39,-.14),p(.82,-.14)],material.head,.012);
    } else if(C.led==='stack'){
      for(let k=0;k<3;k++)curve([p(.36,-k*.075),p(.8,-k*.075)],material.head,.017);
    }
  }
  const taY=M.B.ye(R+.15)-.06,tailZ=R-.042,tailW=cw(R+.12)*.86;
  if(C.tail==='bar'||C.tail==='sweep'){
    curve([[-tailW,taY,tailZ],[-tailW*.53,taY+.02,tailZ],
      [0,taY+.03,tailZ],[tailW*.53,taY+.02,tailZ],[tailW,taY,tailZ]],material.tail,.019);
  } else if(C.tail==='quad'){
    for(const s of [-1,1])for(const off of [.38,.70]){
      const x=s*tailW*off;
      add(new THREE.TorusGeometry(.087,.016,8,20),material.tail,x,taY,tailZ).scale.y=.86;
    }
  } else {
    for(const s of [-1,1]){
      curve([[s*tailW*.28,taY,tailZ],[s*tailW*.60,taY+.045,tailZ],
        [s*tailW*.93,taY-.04,tailZ]],material.tail,.021);
    }
  }

  // Rear diffuser, splitter, realistic undertray and aircraft-like rear wing.
  const rearY=Math.max(.15,M.B.yb(R)+.065);
  box(cw(R)*1.65,.055,.36,material.carbon,0,rearY,R+.045,.014);
  for(let k=-3;k<=3;k++)box(.024,.17,.32,material.carbon,
    k*cw(R)*.215,rearY+.06,R+.04);
  box(cw(F)*1.78,.033,C.splitter,material.carbon,0,Math.max(.11,M.B.yb(F)+.01),F-.055,.015);
  const wingY=Math.max(M.K.top((z0+z1)*.5),M.B.yt(R+.1))+.13;
  if(['dual','race','blade'].includes(C.wing)){
    const span=cw(R+.2)*(C.wing==='dual'?2.03:1.82);
    for(const s of [-1,1]){
      box(.032,.29,.10,material.carbon,s*span*.26,wingY-.11,R+.29);
    }
    const wing=box(span,.033,C.wing==='dual'?.38:.30,material.carbon,0,wingY+.08,R+.29,.012);
    wing.rotation.x=-.04;
    if(C.wing==='dual')box(span*.90,.024,.19,material.carbon,0,wingY-.04,R+.41);
    for(const s of [-1,1])box(.025,.17,.34,material.carbon,s*span*.5,wingY+.08,R+.29);
  } else if(C.wing==='duck'){
    const w=cw(R+.12)*1.62;
    const wing=box(w,.033,.15,material.paint,0,M.B.yt(R+.12)+.04,R+.10,.014);
    wing.rotation.x=.09;
  } else if(C.wing==='rack'){
    for(const s of [-1,1])box(.042,.035,2.1,material.trim,
      s*M.K.wt(roofMid)*.88,M.K.top(roofMid)+.17,roofMid);
    box(M.K.wt(roofMid)*1.9,.045,.09,material.carbon,0,M.K.top(roofMid)+.17,roofMid-.78);
  }

  // Correct wheel packaging: original carKit rim/tyre already contains a
  // complete wheel at the correct axle. New visible rim detail must stay
  // INSIDE the tyre width, not protrude beyond the outer sidewall.
  // Each carKit side-group mirrors X, so a positive faceX is outward on both.
  for(let i=0;i<P.wheels.length;i++){
    const wh=P.wheels[i],rad=wh.r;
    const half=(wh.front?W.wf:W.wr)*.5;
    const faceX=Math.max(.045,half-.052),rimR=rad*.685;
    const ring=new THREE.Mesh(
      new THREE.TorusGeometry(rimR,.009,8,high?48:24),material.trim);
    ring.rotation.y=Math.PI/2;ring.position.x=faceX;wh.spin.add(ring);
    if(high){
      const n=C.rim==='turbine'?11:C.rim==='mesh'?14:C.rim==='disc'?6:C.rim==='five'?5:10;
      const inner=rad*.16,outer=rad*.61;
      const spokeGeometry=new THREE.BoxGeometry(.018,.022,outer-inner);
      const spokes=new THREE.Group();spokes.position.x=faceX-.012;
      for(let k=0;k<n;k++){
        const a=k*2*Math.PI/n;
        const spoke=new THREE.Mesh(spokeGeometry,k%2?material.trim:material.carbon);
        // Spokes lie within the YZ face of the rim, rotate around the X axle.
        const radius=(inner+outer)*.5;
        spoke.position.set(0,Math.sin(a)*radius,Math.cos(a)*radius);
        spoke.rotation.x=-a;
        spokes.add(spoke);
      }
      const hub=new THREE.Mesh(
        new THREE.CylinderGeometry(rad*.095,rad*.095,.023,20),
        material.trim);
      hub.rotation.z=Math.PI/2;hub.position.x=.005;spokes.add(hub);
      wh.spin.add(spokes);
    }
  }
  // Protect silhouettes from flying mirrors: the mirror housings are
  // tightly anchored inside the fender envelope rather than on a free arm.
  // Add a narrow metal roof centerline to reinforce the canopy geometry.
  if(high){
    curve([[0,M.K.top(z0-.2)+.008,z0-.2],
      [0,M.K.top(roofMid)+.01,roofMid],
      [0,M.K.top(z1+.2)+.008,z1+.2]],material.carbon,.012);
  }
  // Preserve the game's steering wheel, nitro flames and animation references.
  const keep=new Set([P.wheelSt,...(P.flames||[])].filter(Boolean));
  for(const old of [...body.children]){if(!keep.has(old))old.visible=false;}
  body.add(group);
  // Attach the existing brake-light animation to the original rear LEDs.
  // The simulation writes P.tailMat.emissiveIntensity every frame.
  P.tailMat={
    set emissiveIntensity(value){material.tail.emissiveIntensity=value>2?4.5:2.1;},
    get emissiveIntensity(){return material.tail.emissiveIntensity;}
  };
  P.futureChassis={group,material,theme:C,player};
  return P.futureChassis;
}
export function syncFuturePaint(P,sourceMaterial){
  if(!P?.futureChassis?.material?.paint||!sourceMaterial)return;
  const m=P.futureChassis.material.paint;
  m.color.copy(sourceMaterial.color);
  m.metalness=Math.max(.52,sourceMaterial.metalness||.6);
  m.roughness=Math.min(.32,Math.max(.11,sourceMaterial.roughness||.2));
  m.needsUpdate=true;
}
