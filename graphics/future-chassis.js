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
      metalness:M.id==='aurora'?.52:.66,roughness:M.id==='aurora'?.235:.175,clearcoat:1,clearcoatRoughness:M.id==='aurora'?.075:.04,envMapIntensity:M.id==='aurora'?1.55:2.2,side:THREE.DoubleSide}),
    carbon:new THREE.MeshPhysicalMaterial({color:0x0b0e12,metalness:.28,roughness:.32,clearcoat:1,clearcoatRoughness:.10,side:THREE.DoubleSide}),
    vent:new THREE.MeshStandardMaterial({color:0x06080b,metalness:.14,roughness:.9,side:THREE.DoubleSide}),
    mesh:new THREE.MeshStandardMaterial({color:0x222932,metalness:.58,roughness:.55,side:THREE.DoubleSide}),
    glass:new THREE.MeshPhysicalMaterial({color:M.id==='aurora'?0x273d4a:0x192935,metalness:.06,roughness:M.id==='aurora'?.115:.06,transparent:true,opacity:M.id==='aurora'?.68:.78,depthWrite:false,clearcoat:1,clearcoatRoughness:.055,envMapIntensity:M.id==='aurora'?1.35:2.05,side:THREE.DoubleSide}),
    trim:new THREE.MeshPhysicalMaterial({color:0x58626a,metalness:.76,roughness:M.id==='aurora'?.31:.24,side:THREE.DoubleSide}),
    seat:new THREE.MeshStandardMaterial({color:M.id==='volcan'?0x5c1a20:0x1d222a,roughness:.75}),
    stitch:new THREE.MeshStandardMaterial({color:0xb08e66,roughness:.85}),
    head:new THREE.MeshPhysicalMaterial({color:0xdfeeff,emissive:0xb6dbff,emissiveIntensity:M.id==='aurora'?1.65:2.5,metalness:.08,roughness:M.id==='aurora'?.12:.2,clearcoat:1,clearcoatRoughness:.07}),
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
    // Aurora V12: raised instrument binnacle and two recessed gauges
    // visible through the windscreen in high detail. Entirely cosmetic.
    if(M.id==='aurora'){
      const dashZ=z0-.30,dashY=seatY+.455;
      const driverX=-Math.min(.37,seatX);
      const binnacle=box(.49,.15,.20,material.carbon,driverX,dashY,dashZ,.035);
      binnacle.castShadow=false;
      const dialMat=new THREE.MeshStandardMaterial({
        color:0x121d25,metalness:.16,roughness:.47,
        emissive:0x132b36,emissiveIntensity:.25
      });
      for(const dx of [-.115,.115]){
        const gauge=new THREE.Mesh(new THREE.CylinderGeometry(.073,.073,.018,18),dialMat);
        gauge.rotation.x=Math.PI/2;
        gauge.position.set(driverX+dx,dashY+.026,dashZ+.112);
        gauge.castShadow=false;
        group.add(gauge);
        const bezel=new THREE.Mesh(new THREE.TorusGeometry(.074,.009,6,20),material.trim);
        bezel.position.copy(gauge.position);
        bezel.rotation.x=Math.PI/2;
        bezel.castShadow=false;
        group.add(bezel);
        // Readable gauge needles in the Aurora cockpit, without changing
        // dashboard collision, steering controls or the instrument rig.
        const needle=new THREE.Mesh(
          new THREE.BoxGeometry(.008,.065,.006),
          new THREE.MeshStandardMaterial({
            color:0xe94b36,metalness:.18,roughness:.38,
            emissive:0x50140b,emissiveIntensity:.22
          }));
        needle.position.set(driverX+dx+.012,dashY+.048,dashZ+.125);
        needle.rotation.z=dx<0?-.43:.35;
        needle.castShadow=false;
        group.add(needle);
      }
    }
  }

  // Sculpted bonnet shoulders: smooth continuous metal surfaces rather than
  // floating boxes. Patches are slightly above the base loft, and taper into
  // the cabin so the car reads as a real pressed-metal structure.
  const sculpt=(side,materialRef,rows,cols,coord)=>{
    const v=[],uv=[],ix=[];
    for(let i=0;i<=rows;i++)for(let j=0;j<=cols;j++){
      const p=coord(i/rows,j/cols);v.push(...p);uv.push(j/cols,i/rows);
    }
    for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){
      const a=i*(cols+1)+j,b=a+1,c=a+cols+1,d=c+1;
      if(side>0)ix.push(a,b,c,b,d,c);else ix.push(a,c,b,b,c,d);
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));
    g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();
    return add(g,materialRef);
  };
  for(const side of [-1,1]){
    const zBeg=Math.min(F-.18,W.zf+.53),zEnd=Math.max(.82,M.cabin.z0+.10);
    sculpt(side,material.paint,high?24:12,high?8:4,(u,v)=>{
      const z=zEnd+(zBeg-zEnd)*u,w=cw(z);
      const x=side*w*(.44+.34*v);
      const ridge=Math.sin(Math.PI*v)**2*Math.sin(Math.PI*u)**1.25*.058*(1+C.shoulder);
      return [x,roof(z)+styleRidge(z,x,w)+ridge+.011,z];
    });
    // Rear haunch bulges blend into the engine cover and do not intersect tyres.
    const rz0=W.zr+.44,rz1=R+.24;
    sculpt(side,material.paint,high?26:12,high?9:4,(u,v)=>{
      const z=rz0+(rz1-rz0)*u,w=cw(z);
      const x=side*w*(.47+.29*v);
      const rise=.037*Math.sin(Math.PI*u)*Math.sin(Math.PI*v)*(1+C.arch);
      return [x,roof(z)+styleRidge(z,x,w)+rise+.012,z];
    });
  }
  // Continuous wheel-arch lip follows the real wheel envelope instead of
  // bolting polygon blocks around it. This lives in the BODY group only:
  // pivot, steering, suspension, wheel spin and collision are untouched.
  const archLipMaterial=new THREE.MeshPhysicalMaterial({
    color:0x11171e,metalness:.64,roughness:.27,clearcoat:.65,
    clearcoatRoughness:.11,side:THREE.DoubleSide
  });
  for(const side of [-1,1])for(const [wheelZ,radius] of [[W.zf,W.rf],[W.zr,W.rr]]){
    const outer=radius+(W.gap||.06)+C.arch+.025;
    const nodes=[];
    for(let k=0;k<=22;k++){
      const ang=Math.PI*k/22;
      const dz=-outer*Math.cos(ang);
      const z=wheelZ+dz;
      const x=side*cw(z)*.993;
      const y=radius+Math.sin(ang)*outer+.022;
      nodes.push([x,y,z]);
    }
    curve(nodes,archLipMaterial,high?.017:.012);
  }
  // Two precise pressed-metal bonnet crease lines guide highlights to the
  // front lights; subtle enough not to look like external plastic trim.
  for(const side of [-1,1]){
    const stations=[W.zf-.32,W.zf+.04,W.zf+.42,F-.19]
      .filter(z=>z<=F-.06&&z>=R+.12);
    if(stations.length>=2)curve(stations.map((z,i)=>{
      const w=cw(z),x=side*w*(.51+i*.055);
      return [x,roof(z)+styleRidge(z,x,w)+.025,z];
    }),material.trim,high?.008:.006);
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
    // Aurora: thin satin-metal sill blade follows the original rocker line.
    // A visible continuous highlight from exterior camera, tucked above the
    // ground clearance and away from the wheels; visual geometry only.
    if(M.id==='aurora'){
      const sillZ=[W.zf-.60,.05,W.zr+.63];
      curve(sillZ.map(z=>[s*cw(z)*.985,M.B.yr(z)+.205,z]),
        material.trim,high?.014:.010);
    }
    // Deep side air inlet with sculpted surrounding geometry and realistic floor.
    const vin=M.id==='danta'?.24:.45, iz=W.zr+.79;
    const intake=box(.021,vin,.53,material.vent,s*(cw(iz)*.978),M.B.ys(iz)-.09,iz);
    intake.rotation.y=s*.10;intake.rotation.z=s*.065;
    // Aurora V12: three satin inlet vanes create a readable layered side
    // intake in exterior view, with no modification to shell or collision rig.
    if(M.id==='aurora'){
      for(let vane=0;vane<3;vane++){
        const fin=box(.027,.018,.40,material.trim,
          s*(cw(iz)*.988),M.B.ys(iz)-.09+(vane-1)*.105,iz);
        fin.rotation.y=s*.10;
        fin.rotation.z=s*.065;
        fin.castShadow=false;
      }
    }
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
    // Aurora mirror glass: inset reflective face, following the existing
    // housing instead of changing its silhouette or the driving physics.
    if(M.id==='aurora'){
      const mirrorGlass=new THREE.MeshPhysicalMaterial({
        color:0x8aabb6,metalness:.72,roughness:.16,
        clearcoat:1,clearcoatRoughness:.08,side:THREE.DoubleSide
      });
      const inset=add(new THREE.SphereGeometry(.074,high?14:8,high?8:5),
        mirrorGlass,s*(M.K.wb(z0-.18)+.19),M.K.top(z0-.18)-.17,z0-.215);
      inset.scale.set(1.12,.53,.12);
    }
    // Aurora-only slim amber mirror repeater: original design, purely visual.
    // Mounted on the existing housing; no dynamic light or collision change.
    if(M.id==='aurora'){
      const repeaterMaterial=new THREE.MeshPhysicalMaterial({color:0xf7b45c,emissive:0x9b4b09,emissiveIntensity:.38,roughness:.24,metalness:.08,clearcoat:.8});
      const repeater=box(.018,.018,.108,repeaterMaterial,
        s*(M.K.wb(z0-.18)+.285),M.K.top(z0-.18)-.165,z0-.11);
      repeater.rotation.y=s*.12;
    }
  }
  // Aurora V12: two sculpted bonnet extractors with inset dark centers.
  // Keep them on the visual skin and clear of the wheel envelopes; no physics.
  if(M.id==='aurora'){
    const bonnetStations=[F-.42,F-.58,F-.74];
    for(const side of [-1,1]){
      const insetPoints=bonnetStations.map(z=>{
        const x=side*cw(z)*.32;
        return [x,roof(z)+styleRidge(z,x,cw(z))+.024,z];
      });
      curve(insetPoints,material.vent,high?.065:.046);
      // Dark recessed centre rib makes each bonnet extractor legible at
      // oblique camera angles; geometry only, with no collision change.
      curve(insetPoints.map(([x,y,z])=>[x,y+.012,z]),
        material.carbon,high?.018:.012);
      // Thin satin edge emphasizes the depth of each opening in exterior view.
      curve(insetPoints.map(([x,y,z])=>[x+side*.050,y+.008,z]),
        material.trim,high?.009:.006);
    }
  }
  // Aurora V12: twin bonnet shoulder highlights make the front silhouette
  // readable from chase camera without moving any body or collision geometry.
  if(M.id==='aurora'){
    for(const side of [-1,1]){
      const shoulderLine=[F-.22,F-.43,F-.64,F-.84].map(z=>{
        const x=side*cw(z)*.64;
        return [x,roof(z)+styleRidge(z,x,cw(z))+.032,z];
      });
      curve(shoulderLine,material.trim,high?.014:.009);
    }
  }
  // Aurora V12: a restrained centre bonnet spine provides a continuous
  // reflected highlight in chase and bonnet cameras, using existing PBR trim.
  // Decorative only: original shell, collision hull and controls are untouched.
  if(M.id==='aurora'){
    const spine=[F-.18,F-.37,F-.56,F-.76].map(z=>
      [0,roof(z)+styleRidge(z,0,cw(z))+.037,z]);
    curve(spine,material.trim,high?.019:.012);
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


  // Dark multi-piece lower aero intake, shaped with a real curve rather than
  // a flat decal. Matches the true bumper width of each car variant.
  for(const side of [-1,1]){
    const noseZ=F-.065,w=cw(noseZ),yy=M.B.ys(noseZ)-.12;
    const outline=[
      [side*w*.26,yy+.09,noseZ+.019],
      [side*w*.46,yy+.06,noseZ+.022],
      [side*w*.70,yy-.045,noseZ+.015],
      [side*w*.77,yy-.17,noseZ],
    ];
    curve(outline,material.carbon,high?.025:.018);
    if(high){
      const floor=box(.025,.058,.33,material.mesh,side*w*.57,yy-.092,noseZ+.025);
      floor.rotation.y=side*.13;
    }
  }
  // Aurora V12: broad inset grille with satin horizontal crossbars.
  // Exterior silhouette cue only; keep the bumper shell, collision rig and wheels intact.
  if(M.id==='aurora'){
    const grilleZ=F-.058,grilleW=cw(grilleZ)*.50,grilleY=M.B.ys(grilleZ)-.20;
    box(grilleW*2,.22,.035,material.carbon,0,grilleY,grilleZ+.027,.008);
    for(const level of [-1,0,1]){
      const slat=box(grilleW*1.84,.016,.045,material.trim,
        0,grilleY+level*.068,grilleZ+.052,.005);
      slat.castShadow=false;
    }
  }
  // Aurora V12: twin layered front corner air curtains with satin blades.
  // These visibly define the lower fascia from front/chase cameras while
  // remaining inside the existing body silhouette and outside wheel rigs.
  if(M.id==='aurora'){
    const z=F-.12,halfW=cw(z),y=M.B.ys(z)-.21;
    for(const side of [-1,1]){
      const x=side*halfW*.76;
      const intake=box(halfW*.27,.22,.026,material.carbon,x,y,z+.034,.007);
      intake.rotation.y=side*.12;intake.castShadow=false;
      for(const level of [-1,1]){
        const blade=box(halfW*.23,.017,.046,material.trim,
          x,y+level*.068,z+.058,.004);
        blade.rotation.y=side*.12;blade.castShadow=false;
      }
    }
  }
  // Recessed lens housings share the car's front fender proportions.
  for(const sign of [-1,1]){
    const z=F-.28,x=sign*cw(z)*.69,y=M.B.ye(z)+.012;
    const lens=new THREE.Mesh(new THREE.SphereGeometry(.23,high?20:12,high?10:6),material.carbon);
    lens.scale.set(1.25,.36,1.4);lens.position.set(x,y,z);
    lens.rotation.y=sign*.18;group.add(lens);
    const surround=new THREE.Mesh(new THREE.TorusGeometry(.13,.013,6,20),material.trim);
    surround.scale.set(1.5,.63,1);surround.rotation.y=sign*.24;
    surround.position.set(x,y,z+.23);group.add(surround);
    // Aurora-only inset projector: visible lens depth without extra lights.
    // High detail is confined to the visual group, not the physics wheel rig.
    if(M.id==='aurora'){
      const projector=new THREE.Mesh(
        new THREE.SphereGeometry(.105,high?16:10,high?10:6),
        material.head);
      projector.scale.set(1.14,.42,.66);
      projector.position.set(x,y,z+.255);
      projector.rotation.y=sign*.18;
      projector.castShadow=false;
      group.add(projector);
    }
  }
  // Aurora V12: twin sculpted dark headlamp eyebrows, with a satin upper edge.
  // The wide outer sweep is visible from the chase camera and helps define
  // the original grand-tourer front fascia without changing the body shell.
  if(M.id==='aurora'){
    const z=F-.28,eyebrowY=M.B.ye(z)+.095,halfW=cw(z);
    for(const side of [-1,1]){
      const sweep=[[.43,.035],[.57,.072],[.73,.077],[.89,.015]];
      curve(sweep.map(([x,y])=>[side*halfW*x,eyebrowY+y,z+.105]),
        material.carbon,high?.043:.031);
      curve(sweep.map(([x,y])=>[side*halfW*x,eyebrowY+y+.037,z+.11]),
        material.trim,high?.014:.009);
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

  // Aurora V12: a recessed central reversing lamp and paired brake-light
  // surrounds make the rear recognizable without altering the vehicle rig.
  if(M.id==='aurora'){
    // High-mounted third brake-light strip under the rear glass.
    // Visual-only, shares the animated tail material; no new light source.
    const rearGlassZ=z1+.075;
    const thirdBrakeY=M.K.top(z1)+.012;
    curve([[-cw(rearGlassZ)*.30,thirdBrakeY,rearGlassZ],
           [0,thirdBrakeY+.006,rearGlassZ-.008],
           [cw(rearGlassZ)*.30,thirdBrakeY,rearGlassZ]],
          material.tail,high?.014:.010);
    const reverseY=taY-.115;
    const reverse=box(.24,.046,.025,material.head,0,reverseY,tailZ-.012,.012);
    reverse.castShadow=false;
    for(const s of [-1,1]){
      const x=s*tailW*.64;
      const inset=box(.24,.064,.022,material.carbon,x,taY-.038,tailZ+.014,.009);
      inset.castShadow=false;
      curve([[x-s*.13,taY-.026,tailZ-.018],
             [x,taY-.014,tailZ-.022],
             [x+s*.13,taY-.036,tailZ-.018]],material.tail,high?.015:.011);
    }
  }
  // Aurora V12: paired satin diffuser blades emphasize the lower rear
  // silhouette from chase camera, with no collision or drivetrain changes.
  if(M.id==='aurora'){
    for(const s of [-1,1]){
      const x=s*cw(R)*.58;
      const blade=box(.018,.115,.29,material.trim,
        x,Math.max(.15,M.B.yb(R)+.065)+.035,R+.062,.008);
      blade.rotation.z=s*.10;
      blade.castShadow=false;
    }
  }
  // Aurora V12: recessed rear grille slats add a clear layered silhouette
  // above the diffuser in chase view, without touching collision geometry.
  if(M.id==='aurora'){
    const grilleY=Math.max(.15,M.B.yb(R)+.065)+.21;
    for(let j=0;j<3;j++){
      const slat=box(cw(R)*.92,.018,.025,material.carbon,
        0,grilleY+j*.043,R+.083,.006);
      slat.castShadow=false;
    }
  }
  // Aurora V12: paired machined exhaust surrounds visible in chase camera.
  // Original lightweight rings only; do not change exhaust physics or hitboxes.
  if(M.id==='aurora'){
    const exhaustY=Math.max(.15,M.B.yb(R)+.065)+.125;
    for(const s of [-1,1]){
      const tip=add(new THREE.TorusGeometry(.105,.021,6,high?20:12),
        material.trim,s*cw(R)*.49,exhaustY,R+.117);
      tip.castShadow=false;
      const bore=add(new THREE.CircleGeometry(.081,high?20:12),
        material.vent,s*cw(R)*.49,exhaustY,R+.106);
      bore.castShadow=false;
    }
  }
  // Aurora V12: a continuous satin lip above the rear exhaust/grille area.
  // Stronger rear silhouette in chase view, with original low-poly geometry.
  if(M.id==='aurora'){
    const lipY=Math.max(.15,M.B.yb(R)+.065)+.355;
    const lip=box(cw(R)*1.22,.028,.052,material.trim,0,lipY,R+.108,.008);
    lip.castShadow=false;
    for(const s of [-1,1]){
      const corner=box(.034,.075,.052,material.trim,s*cw(R)*.61,lipY-.025,R+.108);
      corner.castShadow=false;
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
    ring.rotation.y=Math.PI/2;ring.position.x=faceX;ring.userData.fcDetail=1;wh.spin.add(ring);
    if(high){
      // Brake rotor and hub concentric details stay INSIDE the wheel face,
      // not outside the rubber's lateral envelope.
      const rotor=new THREE.Mesh(new THREE.TorusGeometry(rad*.51,.008,6,36),material.trim);
      rotor.rotation.y=Math.PI/2;rotor.position.x=faceX-.041;rotor.userData.fcDetail=1;wh.spin.add(rotor);
      for(let t=0;t<8;t++){
        const a=2*Math.PI*t/8;
        const hole=new THREE.Mesh(new THREE.SphereGeometry(rad*.018,6,4),material.vent);
        hole.scale.set(.25,1,1);
        hole.position.set(faceX-.028,Math.sin(a)*rad*.43,Math.cos(a)*rad*.43);
        hole.userData.fcDetail=1;wh.spin.add(hole);
      }
    }
    // Aurora V12: a machined inner wheel lip gives the turbine wheel
    // visual depth without changing the tyre envelope, wheel rig or physics.
    // Only four lightweight rings, using the existing metallic trim material.
    if(M.id==='aurora'){
      const innerLip=new THREE.Mesh(
        new THREE.TorusGeometry(rad*.565,rad*.012,6,high?36:18),
        material.trim);
      innerLip.rotation.y=Math.PI/2;
      innerLip.position.x=faceX-.016;
      innerLip.castShadow=false;
      innerLip.userData.fcDetail=1;
      wh.spin.add(innerLip);
    }
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
        spoke.userData.fcDetail=1;spokes.add(spoke);
      }
      const hub=new THREE.Mesh(
        new THREE.CylinderGeometry(rad*.095,rad*.095,.023,20),
        material.trim);
      hub.rotation.z=Math.PI/2;hub.position.x=.005;hub.userData.fcDetail=1;spokes.add(hub);
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
  // Performance: the body is made of ~100 small pieces. Phones pay per piece drawn, so the static pieces are
  // baked into one mesh per material (about 10 per car) and the wheel details into one per material per wheel.
  bakeByMaterial(THREE,group);
  for(const wh of P.wheels)if(wh.spin)bakeByMaterial(THREE,wh.spin,true);
  // Attach the existing brake-light animation to the original rear LEDs.
  // The simulation writes P.tailMat.emissiveIntensity every frame.
  P.tailMat={
    set emissiveIntensity(value){material.tail.emissiveIntensity=value>2?4.5:2.1;},
    get emissiveIntensity(){return material.tail.emissiveIntensity;}
  };
  P.futureChassis={group,material,theme:C,player};
  return P.futureChassis;
}
// Merges every plain mesh under `root` that uses the same material into one mesh (positions baked relative to root).
// onlyNew: inside a wheel, keep the original carKit wheel meshes as they are and bake only the added details.
function bakeByMaterial(THREE,root,onlyNew=false){
  root.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(root.matrixWorld).invert(),groups=new Map(),victims=[];
  root.traverse(o=>{
    if(!o.isMesh||o===root||o.isInstancedMesh||o.isSkinnedMesh||!o.visible||Array.isArray(o.material))return;
    if(onlyNew&&!o.userData.fcDetail)return;
    let a=o.parent;while(a&&a!==root){if(!a.visible)return;a=a.parent;}
    const m=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld);
    let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();
    if(!g.attributes.normal)g.computeVertexNormals();
    g.applyMatrix4(m);
    if(m.determinant()<0){const a=g.attributes.position.array,nn=g.attributes.normal.array,u=g.attributes.uv&&g.attributes.uv.array;
      // a mirrored piece: swap two corners of every triangle so it still faces outward
      for(let t=0;t<a.length;t+=9){for(let c=0;c<3;c++){const x=a[t+3+c];a[t+3+c]=a[t+6+c];a[t+6+c]=x;const y=nn[t+3+c];nn[t+3+c]=nn[t+6+c];nn[t+6+c]=y;}
        if(u){const q=t/9*6;for(let c=0;c<2;c++){const x=u[q+2+c];u[q+2+c]=u[q+4+c];u[q+4+c]=x;}}}}
    if(!groups.has(o.material))groups.set(o.material,{list:[],cast:false,recv:false});
    const e=groups.get(o.material);e.list.push(g);e.cast=e.cast||o.castShadow;e.recv=e.recv||o.receiveShadow;victims.push(o);});
  if(victims.length<2)return;
  const parents=new Set();for(const o of victims){parents.add(o.parent);o.parent.remove(o);}
  // drop the little groups that only held baked pieces
  for(const g of parents)if(g!==root&&g.isGroup&&!g.children.length&&g.parent)g.parent.remove(g);
  for(const[mat,e]of groups){
    let n=0;for(const g of e.list)n+=g.attributes.position.count;
    const pos=new Float32Array(n*3),nor=new Float32Array(n*3),uv=new Float32Array(n*2);let k=0;
    for(const g of e.list){const c=g.attributes.position.count;pos.set(g.attributes.position.array,k*3);nor.set(g.attributes.normal.array,k*3);
      if(g.attributes.uv)uv.set(g.attributes.uv.array.subarray(0,c*2),k*2);k+=c;g.dispose();}
    const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.BufferAttribute(pos,3));bg.setAttribute('normal',new THREE.BufferAttribute(nor,3));
    bg.setAttribute('uv',new THREE.BufferAttribute(uv,2));bg.computeBoundingSphere();
    const mesh=new THREE.Mesh(bg,mat);mesh.castShadow=e.cast;mesh.receiveShadow=e.recv;mesh.name='fc-baked';root.add(mesh);}
}
export function syncFuturePaint(P,sourceMaterial){
  if(!P?.futureChassis?.material?.paint||!sourceMaterial)return;
  const m=P.futureChassis.material.paint;
  m.color.copy(sourceMaterial.color);
  m.metalness=Math.max(.52,sourceMaterial.metalness||.6);
  m.roughness=Math.min(.32,Math.max(.11,sourceMaterial.roughness||.2));
  m.needsUpdate=true;
}
