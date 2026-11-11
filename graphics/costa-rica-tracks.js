/**
 * Paso Alpino | Costa Rica Racing Pack
 * Stylized recreations of three famous Costa Rican road landscapes.
 * All scenery is synthesized in Three.js: no borrowed photographs, maps or brands.
 * Physics and the original fixed-width track ribbon remain unchanged.
 * p[n] = point on the track centre, t[n] tangent, s[n] roadside normal.
 */
export function addCostaRicaScenery(THREE, world, def, points, tangents, normals, quality) {
  const id=def.theme?.cr;
  if(!['zurqui','costanera','puntarenas'].includes(id))return;
  const N=points.length, hi=quality==='alta'||quality==='cine';
  const step=hi?16:quality==='media'?24:36;
  const mats={
    concrete:new THREE.MeshStandardMaterial({color:0x777971,roughness:.93,side:THREE.DoubleSide}),
    stone:new THREE.MeshStandardMaterial({color:0x777060,roughness:.97,side:THREE.DoubleSide}),
    tunnel:new THREE.MeshStandardMaterial({color:0x575d57,roughness:.86,side:THREE.DoubleSide}),
    sand:new THREE.MeshStandardMaterial({color:0xb3a27a,roughness:1}),
    lamp:new THREE.MeshBasicMaterial({color:0xffd399}),
    foliage:new THREE.MeshStandardMaterial({color:0x1b5634,roughness:.94,side:THREE.DoubleSide}),
    palm:new THREE.MeshStandardMaterial({color:0x317346,roughness:.9,side:THREE.DoubleSide}),
    bark:new THREE.MeshStandardMaterial({color:0x736044,roughness:1}),
    black:new THREE.MeshStandardMaterial({color:0x17252a,roughness:.65}),
    wall:new THREE.MeshStandardMaterial({color:0xd8cba9,roughness:.91}),
    roof:new THREE.MeshStandardMaterial({color:0xb85f42,roughness:.77}),
    curb:new THREE.MeshStandardMaterial({color:0xe4dfca,roughness:1}),
    aqua:new THREE.MeshPhysicalMaterial({color:0x226f91,metalness:.14,roughness:.16,envMapIntensity:1.4,transparent:true,opacity:.91,side:THREE.DoubleSide})
  };
  const node=(i,side=0,dist=0,height=0)=>{
    const k=((i%N)+N)%N,p=points[k],n=normals[k];
    return new THREE.Vector3(p.x+n.x*side*dist,p.y+height,p.z+n.z*side*dist);
  };
  const place=(obj,i,side=1,dist=25,height=0)=>{
    const k=((i%N)+N)%N;
    obj.position.copy(node(k,side,dist,height));
    obj.rotation.y=Math.atan2(tangents[k].x,tangents[k].z);
    world.add(obj);return obj;
  };
  const cube=(w,h,d,mat=mats.concrete,x=0,y=0,z=0)=>{
    const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);
    m.receiveShadow=true;return m;
  };
  const sign=(label,i,side=1,dist=18)=>{
    const group=new THREE.Group(),canvas=document.createElement('canvas');
    canvas.width=512;canvas.height=160;
    const g=canvas.getContext('2d');g.fillStyle='#174e30';g.fillRect(0,0,512,160);
    g.strokeStyle='#e8f1e7';g.lineWidth=9;g.strokeRect(10,10,492,140);
    g.fillStyle='#ffffff';g.font='bold 45px Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';
    g.fillText(label.toUpperCase(),256,82,485);
    const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
    const plate=new THREE.Mesh(new THREE.PlaneGeometry(6.4,2),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));
    plate.position.y=4.8;plate.rotation.y=Math.PI/2;group.add(plate);
    for(const x of [-2.5,2.5]){const pole=cube(.14,5,.14,mats.black,x,2.5,0);group.add(pole);}
    place(group,i,side,dist);
  };
  // One lightweight 3D palm mesh per instanced tree: bent trunk + 6 tapered
  // organic leaf blades, no sprites, photographs or network downloads.
  const treeGeo=new THREE.CylinderGeometry(.18,.27,7.1,5,2);
  treeGeo.translate(0,3.45,0);
  const leafVerts=[],leafIds=[];
  for(let k=0;k<7;k++){
    const a=k*Math.PI*2/7,u=Math.cos(a),v=Math.sin(a),start=leafVerts.length/3;
    const samples=[[0,7.2,0],[u*.6,7.55,v*.6],[u*2.4,7.12,v*2.4],[u*4.2,5.8,v*4.2]];
    for(let i=0;i<samples.length;i++){
      const [x,y,z]=samples[i],width=[.04,.46,.63,.04][i];
      leafVerts.push(x-v*width,y,z+u*width,x+v*width,y,z-u*width);
    }
    for(let j=0;j<3;j++){let a0=start+j*2,b0=a0+1,c0=a0+2,d0=a0+3;leafIds.push(a0,c0,b0,b0,c0,d0);}
  }
  const frondGeo=new THREE.BufferGeometry();
  frondGeo.setAttribute('position',new THREE.Float32BufferAttribute(leafVerts,3));
  frondGeo.setIndex(leafIds);frondGeo.computeVertexNormals();
  const foliage= new THREE.Mesh(frondGeo,mats.palm);
  // Instanced trees and trunks: only two draw calls for hundreds of trees.
  function palms(count,start=0,end=N,side=1,distance=24){
    const trunks=new THREE.InstancedMesh(treeGeo,mats.bark,count);
    const crowns=new THREE.InstancedMesh(frondGeo,mats.palm,count),dummy=new THREE.Object3D();
    for(let i=0;i<count;i++){
      const k=Math.floor(start+(end-start)*(i+.31)/count)%N;
      const variance=3*Math.sin(k*.73)+2.8*Math.sin(k*1.13);
      const p=node(k,side,distance+variance,-.18),scale=.73+.28*(.5+.5*Math.sin(i*8.17));
      dummy.position.copy(p);dummy.scale.set(scale,scale,scale);
      dummy.rotation.y=i*2.4;dummy.updateMatrix();
      trunks.setMatrixAt(i,dummy.matrix);crowns.setMatrixAt(i,dummy.matrix);
    }
    world.add(trunks,crowns);
  }
  // A generic tree model complements the existing pine forest in Zurquí.
  function rainforestTrees(count){
    const crown=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(3.2,1),mats.foliage,count);
    const trunk=new THREE.InstancedMesh(new THREE.CylinderGeometry(.4,.5,5,5),mats.bark,count);
    const d=new THREE.Object3D(),e=new THREE.Object3D();
    for(let i=0;i<count;i++){
      const k=(Math.floor(i*N/count)+29)%N,s=i%2?1:-1;
      const p=node(k,s,27+7*Math.abs(Math.sin(i*11.3)),0),h=6+2*Math.sin(i*.6);
      d.position.copy(p);d.position.y+=h;d.scale.set(1.2,1.15,1.25);d.updateMatrix();crown.setMatrixAt(i,d.matrix);
      e.position.copy(p);e.position.y+=2.1;e.scale.set(1,1,1);e.updateMatrix();trunk.setMatrixAt(i,e.matrix);
    }
    world.add(crown,trunk);
  }
  function streetlights(from,to,side=1,every=45){
    const amount=Math.max(0,Math.floor((to-from)/every)),post=new THREE.InstancedMesh(new THREE.CylinderGeometry(.07,.12,7.2,6),mats.black,amount);
    const heads=new THREE.InstancedMesh(new THREE.BoxGeometry(1.6,.1,.33),mats.lamp,amount),o=new THREE.Object3D();
    for(let j=0;j<amount;j++){
      const k=from+j*every,p=node(k,side,20,3.6);
      o.position.copy(p);o.scale.set(1,1,1);o.rotation.set(0,0,0);o.updateMatrix();post.setMatrixAt(j,o.matrix);
      const q=node(k,side,19.7,7.1);o.position.copy(q);o.rotation.y=Math.atan2(tangents[k%N].x,tangents[k%N].z);o.updateMatrix();heads.setMatrixAt(j,o.matrix);
    }
    world.add(post,heads);
  }
  // Ruta 34: low-profile raised pavement markers ("ojos de gato").
  // MOPT, 2 June 2025: Dominical–Uvita / Punta Mala resurfacing, edge/centre
  // markings and installation of reflectors. This is a stylized circuit,
  // not a surveyed reproduction of the exact real-world marker positions.
  // https://www.mopt.go.cr/noticias/2025/35-km-de-costanera-sur-ya-cuentan-con-superficie-de-ruedo-nueva-entre-dominical-y
  function roadReflectors(){
    const spacing=hi?15:quality==='media'?24:36,indices=[];
    let distance=0,next=spacing;
    for(let k=1;k<N;k++){
      distance+=points[k].distanceTo(points[k-1]);
      if(distance<next)continue;
      next=distance+spacing;
      // Leave the start/finish paint clear.
      if(points[k].distanceTo(points[0])>4)indices.push(k);
    }
    const count=indices.length*3;if(!count)return;
    const base=new THREE.InstancedMesh(new THREE.BoxGeometry(.22,.045,.20),
      new THREE.MeshStandardMaterial({color:0x3d4144,roughness:.74}),count);
    const lens=new THREE.InstancedMesh(new THREE.BoxGeometry(.16,.025,.14),
      new THREE.MeshStandardMaterial({color:0xffffff,roughness:.28,metalness:.12,envMapIntensity:.8}),count);
    base.name='cr-costanera-reflector-bases';lens.name='cr-costanera-reflector-lenses';
    const o=new THREE.Object3D(),basis=new THREE.Matrix4();
    const right=new THREE.Vector3(),forward=new THREE.Vector3(),up=new THREE.Vector3();
    const amber=new THREE.Color(0xf1bb39),white=new THREE.Color(0xe9eef1);
    let j=0;
    for(const k of indices){
      // Match the same horizontal cross-section and longitudinal grade as
      // the road ribbon; the visual-only markers never alter collision data.
      right.copy(normals[k]).negate();forward.copy(tangents[k]).normalize();
      up.crossVectors(forward,right).normalize();
      basis.makeBasis(right,up,forward);o.quaternion.setFromRotationMatrix(basis);
      for(const offset of [0,-11.525,11.525]){
        const p=node(k,Math.sign(offset),Math.abs(offset),.02);
        o.position.copy(p).addScaledVector(up,.0275);o.updateMatrix();base.setMatrixAt(j,o.matrix);
        o.position.copy(p).addScaledVector(up,.0625);o.updateMatrix();lens.setMatrixAt(j,o.matrix);
        lens.setColorAt(j,offset===0?amber:white);j++;
      }
    }
    base.instanceMatrix.needsUpdate=true;lens.instanceMatrix.needsUpdate=true;
    lens.instanceColor.needsUpdate=true;
    base.computeBoundingSphere();lens.computeBoundingSphere();
    // Two draw calls for all markers, no extra lights or shadow passes.
    world.add(base,lens);
  }
  function roadShore(start,end,side=1,offset=27,width=90){
    const pos=[],uv=[],idx=[],stride=Math.max(4,Math.floor((end-start)/190));
    for(let j=start;j<=end;j+=stride){
      for(const d of [offset,offset+width]){
        const p=node(j%N,side,d,.23);
        pos.push(p.x,p.y,p.z);uv.push((d-offset)/width,j/120);
      }
    }
    let rows=pos.length/6;for(let j=0;j<rows-1;j++){const a=j*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}
    if(rows<2)return;
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
    const seaMat=new THREE.ShaderMaterial({side:THREE.DoubleSide,uniforms:{uT:{value:0}},
      vertexShader:`varying vec3 vW;varying float vAcross;uniform float uT;void main(){vAcross=uv.x;vec3 p=position;p.y+=.15*sin(p.x*.16+uT*.85)*cos(p.z*.09-uT*.64);vW=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader:`varying vec3 vW;varying float vAcross;uniform float uT;void main(){float wave=sin(vW.x*.25+uT*.75)*cos(vW.z*.24-uT*.48);float foam=pow(max(0.,sin(vW.x*.46+vW.z*.3+uT*.75)),13.);vec3 c=mix(vec3(.025,.17,.27),vec3(.07,.45,.55),.55+.32*wave);c+=vec3(.24,.31,.29)*foam*.25;float shoreline=(1.-smoothstep(.0,.09,vAcross))*sin(vW.x*.65+uT*.55)*.07;c+=max(0.,shoreline)*vec3(.5,.72,.78);gl_FragColor=vec4(c,1.);}`});
    const shore=new THREE.Mesh(g,seaMat);shore.receiveShadow=true;
    shore.onBeforeRender=()=>{seaMat.uniforms.uT.value=performance.now()*.001;};world.add(shore);
  }
  function kiosk(i,side,dist,color=0xbca483){
    const g=new THREE.Group(),walls=new THREE.MeshStandardMaterial({color,roughness:.85});
    g.add(cube(5.6,3.2,4.3,walls,0,1.6,0));
    g.add(cube(6.6,.35,5.2,mats.roof,0,3.45,0));
    g.add(cube(4.5,1.4,.06,mats.black,0,1.8,2.18));
    const roofSign=cube(3.9,.4,.12,mats.curb,0,3,2.23);g.add(roofSign);
    place(g,i,side,dist);
  }


  // Coastal scene accents. These are positioned outside the playable roadway
  // and never participate in physics or collision detection.
  function boat(i,side=1,distance=85,sail=false){
    const boatGroup=new THREE.Group();
    const hull=new THREE.Mesh(new THREE.SphereGeometry(3.4,20,12),
      new THREE.MeshPhysicalMaterial({color:0xf0f1e8,metalness:.15,roughness:.33,clearcoat:.9}));
    hull.scale.set(1.4,.22,.51);hull.position.y=.45;boatGroup.add(hull);
    const edge=cube(5.7,.13,2.8,mats.black,0,.96,0);boatGroup.add(edge);
    const cabin=cube(2.25,1.35,1.8,mats.wall,-.35,1.53,0);boatGroup.add(cabin);
    const glass=cube(.04,.69,1.4,mats.black,.81,1.72,0);boatGroup.add(glass);
    const mast=new THREE.Mesh(new THREE.CylinderGeometry(.055,.075,3.7,8),mats.black);
    mast.position.set(.96,2.55,0);boatGroup.add(mast);
    if(sail){
      const geom=new THREE.BufferGeometry();
      geom.setAttribute('position',new THREE.Float32BufferAttribute([.9,4.7,0, .9,1.5,0, 3.5,1.55,0],3));
      geom.computeVertexNormals();
      const cloth=new THREE.Mesh(geom,new THREE.MeshStandardMaterial({color:0xf5e9d2,side:THREE.DoubleSide,roughness:.86}));
      boatGroup.add(cloth);
    }
    place(boatGroup,i,side,distance,.56);
    boatGroup.rotation.y+=Math.PI*.5;
    return boatGroup;
  }
  function waterfall(i,side=1,distance=37,height=18){
    const group=new THREE.Group();
    const cliffMaterial=new THREE.MeshStandardMaterial({color:0x536154,roughness:.97,flatShading:true});
    for(let k=0;k<4;k++){
      const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(5.3,0),cliffMaterial);
      rock.scale.set(1.2,.95+Math.sin(k+2)*.12,.65);rock.position.set((k-1.5)*3.9,height*.68,0);
      group.add(rock);
    }
    const flowMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,
      uniforms:{uT:{value:0}},
      vertexShader:`varying vec2 vUv;uniform float uT;void main(){vUv=uv;vec3 p=position;p.z+=sin(vUv.y*18.+uT*2.)*.12;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader:`varying vec2 vUv;uniform float uT;void main(){float a=sin(vUv.y*48.-uT*6.+sin(vUv.x*26.)*2.);float b=sin(vUv.y*76.-uT*8.-vUv.x*31.);vec3 c=mix(vec3(.13,.42,.53),vec3(.85,.96,1.),.42+.38*a*a);gl_FragColor=vec4(c,.53+.28*a*a+.09*b*b);}`});
    for(let k=0;k<4;k++){
      const flow=new THREE.Mesh(new THREE.PlaneGeometry(3.25,height,6,32),flowMat);
      flow.position.set((k-1.5)*1.35,height*.5,4.35+.1*k);group.add(flow);
      flow.onBeforeRender=()=>{flowMat.uniforms.uT.value=performance.now()*.001;};
    }
    const sprayMat=new THREE.MeshBasicMaterial({color:0xe0f7ff,transparent:true,opacity:.38,depthWrite:false});
    for(let k=0;k<7;k++){
      const mist=new THREE.Mesh(new THREE.IcosahedronGeometry(.73,1),sprayMat);
      mist.scale.set(1.5,.4,1);mist.position.set((k-3)*1.05,.4,5+Math.sin(k)*.45);
      group.add(mist);
    }
    place(group,i,side,distance,.1);
  }
  function lighthouse(i){
    const g=new THREE.Group();
    const white=new THREE.MeshStandardMaterial({color:0xf5eee3,roughness:.78});
    const red=new THREE.MeshStandardMaterial({color:0xbf4a3a,roughness:.75});
    const tower=new THREE.Mesh(new THREE.CylinderGeometry(2.35,3.35,19,20),white);
    tower.position.y=9.5;tower.castShadow=true;g.add(tower);
    for(const y of [5.0,11.1,16.6]){
      const band=new THREE.Mesh(new THREE.CylinderGeometry(2.8-y*.018,3.15-y*.024,1.3,20),red);
      band.position.y=y;g.add(band);
    }
    const deck=new THREE.Mesh(new THREE.CylinderGeometry(3.35,3.35,.55,20),mats.black);
    deck.position.y=19.4;g.add(deck);
    const lantern=new THREE.Mesh(new THREE.CylinderGeometry(1.72,1.72,2.65,16),
      new THREE.MeshPhysicalMaterial({color:0xc8e9f9,roughness:.07,metalness:.05,transparent:true,opacity:.65,depthWrite:false}));
    lantern.position.y=20.95;g.add(lantern);
    const light=new THREE.Mesh(new THREE.SphereGeometry(.9,12,8),new THREE.MeshBasicMaterial({color:0xffebba}));
    light.position.y=21;g.add(light);
    const roof=new THREE.Mesh(new THREE.ConeGeometry(2.25,1.8,20),mats.black);
    roof.position.y=23.2;g.add(roof);
    // A softly illuminated beam is a visible part of the lighthouse silhouette.
    // MeshBasicMaterial avoids an expensive dynamic shadow-casting spotlight.
    const beamPivot=new THREE.Group();beamPivot.position.y=21.0;
    const beam=new THREE.Mesh(new THREE.ConeGeometry(3.3,24,16,1,true),
      new THREE.MeshBasicMaterial({color:0xffe9ba,transparent:true,opacity:.10,
        depthWrite:false,side:THREE.DoubleSide}));
    beam.rotation.x=-Math.PI/2;beam.position.z=11.5;beamPivot.add(beam);
    beamPivot.onBeforeRender=()=>{beamPivot.rotation.y=performance.now()*.00022;};
    // Group callbacks are not invoked by the renderer: attach the callback
    // to the beam mesh itself, while rotating its parent.
    beam.onBeforeRender=()=>{beamPivot.rotation.y=performance.now()*.00022;};
    g.add(beamPivot);
    place(g,Math.floor(N*.15),1,42,.1);
  }
  function ferns(count){
    const mat=new THREE.MeshStandardMaterial({color:0x327445,roughness:.94,side:THREE.DoubleSide});
    const geometry=new THREE.ConeGeometry(1.55,2.4,7);
    geometry.translate(0,1.25,0);
    const mesh=new THREE.InstancedMesh(geometry,mat,count),d=new THREE.Object3D();
    for(let k=0;k<count;k++){
      const idx=(Math.floor(k*N/count)+13)%N;
      const p=node(idx,k%2?-1:1,23+8*Math.abs(Math.sin(k*2.3)),-.6);
      d.position.copy(p);d.rotation.y=k*1.52;const scale=.6+.45*Math.abs(Math.sin(k*.7));
      d.scale.set(scale,scale,scale);d.updateMatrix();mesh.setMatrixAt(k,d.matrix);
    }
    world.add(mesh);
  }

  if(id==='zurqui'){
    rainforestTrees(hi?350:145);ferns(hi?230:90);
    sign('RUTA 32 · ZURQUI',Math.floor(N*.07),1,20);
    sign('BRAULIO CARRILLO',Math.floor(N*.46),-1,20);
    for(const [f,side,h] of [[.15,-1,18],[.56,1,15],[.70,-1,21]])waterfall(Math.floor(N*f),side,39,h);
    // Open-ended 3D tunnel follows the actual track, approx. 550 m.
    // Double-sided geometry yields a convincing concrete roof interior.
    const start=Math.floor(N*.28),length=points[(start+1)%N].distanceTo(points[start]);
    const count=Math.max(18,Math.min(Math.floor(565/Math.max(1,length)),Math.floor(N*.22)));
    const increment=hi?2:4;
    const va=[],inds=[],uv=[],arc=16,roofHeight=9;
    const makeRing=i=>{
      const k=(start+i)%N,cp=points[k],right=normals[k];
      for(let j=0;j<=arc;j++){
        const th=Math.PI*j/arc; // left wall -> crown -> right wall
        const lateral=Math.cos(th)*14.6,up=Math.sin(th)*roofHeight;
        va.push(cp.x+right.x*lateral,cp.y+1.25+up,cp.z+right.z*lateral);
        uv.push(j/arc,i/8);
      }
    };
    const nRings=Math.ceil(count/increment);
    for(let row=0;row<=nRings;row++)makeRing(Math.min(count,row*increment));
    for(let row=0;row<nRings;row++)for(let j=0;j<arc;j++){
      const a=row*(arc+1)+j,b=a+1,c=a+arc+1,d=c+1;
      inds.push(a,c,b,b,c,d);
    }
    const gg=new THREE.BufferGeometry();
    gg.setAttribute('position',new THREE.Float32BufferAttribute(va,3));
    gg.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
    gg.setIndex(inds);gg.computeVertexNormals();
    const vault=new THREE.Mesh(gg,mats.tunnel);vault.receiveShadow=true;world.add(vault);
    // Bright linear light strips and reinforced stone portal frames.
    for(let k=0;k<=count;k+=hi?28:48){
      const pt=node(start+k,0,0,9.96),m=new THREE.Mesh(new THREE.BoxGeometry(2.4,.12,2),mats.lamp);
      m.position.copy(pt);m.rotation.y=Math.atan2(tangents[(start+k)%N].x,tangents[(start+k)%N].z);world.add(m);
    }
    for(const k of [start,start+count]){
      const frame=new THREE.Group(),seg=12;
      for(let j=0;j<seg;j++){
        const a=Math.PI*j/seg,b=Math.PI*(j+1)/seg;
        const center=(a+b)/2;
        const strut=new THREE.Mesh(new THREE.BoxGeometry(.55,.48,2.4),mats.stone);
        strut.position.set(Math.cos(center)*14.8,1.2+Math.sin(center)*9.2,0);
        strut.rotation.z=center+Math.PI/2;frame.add(strut);
      }
      place(frame,k,1,0,.15);
    }
    streetlights(0,start-50,1,85);
  } else if(id==='costanera'){
    palms(hi?190:85,0,Math.floor(N*.48),1,31);
    palms(hi?140:65,Math.floor(N*.49),N,-1,32);
    roadShore(0,Math.floor(N*.35),1,28,100);
    roadShore(Math.floor(N*.67),N,-1,32,115);
    sign('RUTA 34 · COSTANERA',Math.floor(N*.10),-1,20);
    sign('PACIFICO CENTRAL',Math.floor(N*.55),1,20);
    for(let j=0;j<12;j++)kiosk(Math.floor(N*(.40+j*.021)),1,37, j%2?0xdecda8:0xe1bb8a);
    streetlights(Math.floor(N*.34),Math.floor(N*.54),-1,84);
    roadReflectors();
    // Only place boats inside the two existing seaward water ribbons.
    // The previous alternating sides put several boats on the inland side.
    // Keep them clear of the ribbon ends and reduce boat count on mobile.
    const boatsPerSector=hi?7:quality==='media'?5:3;
    for(const sector of [{from:.035,to:.315,side:1,near:65,far:110},
                         {from:.70,to:.96,side:-1,near:68,far:124}]){
      for(let j=0;j<boatsPerSector;j++){
        const k=Math.floor(N*(sector.from+(sector.to-sector.from)*(j+.5)/boatsPerSector));
        const dist=sector.near+(sector.far-sector.near)*(.5+.5*Math.sin((j+1)*2.399+sector.side));
        boat(k,sector.side,dist,hi&&j%4===0).name='cr-costanera-boat';
      }
    }
  } else if(id==='puntarenas'){
    // Roadside city promenade, with sea on one side and storefronts on other.
    roadShore(0,N,1,26,85);
    palms(hi?260:100,0,N,1,31);
    streetlights(0,N,1,65);streetlights(0,N,-1,82);
    for(let j=0;j<36;j++){
      const i=Math.floor(N*(j+.4)/36);
      kiosk(i,-1,31, j%3===0?0xf2d9aa:j%3===1?0xa0c7cf:0xf1bc91);
    }
    sign('PASEO DE LOS TURISTAS',Math.floor(N*.06),-1,20);
    sign('PUNTARENAS',Math.floor(N*.50),-1,20);
    lighthouse();
    for(let k=0;k<11;k++)boat(Math.floor(N*(k+.3)/11),1,74+8*(k%3),k%4===0);
    // Low coastal guard wall along the beach, broken into individual meshes.
    const wallGeo=new THREE.BoxGeometry(12,.5,.48);
    const nWall=Math.floor(N/26);
    const wall=new THREE.InstancedMesh(wallGeo,mats.curb,nWall);
    const o=new THREE.Object3D();
    for(let j=0;j<nWall;j++){
      const k=j*26,p=node(k,1,24,.42);
      o.position.copy(p);o.rotation.y=Math.atan2(tangents[k].x,tangents[k].z);o.updateMatrix();wall.setMatrixAt(j,o.matrix);
    }
    world.add(wall);
  }
}
