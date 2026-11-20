/**
 * Paso Alpino | Costa Rica Racing Pack
 * Stylized recreations of three famous Costa Rican road landscapes.
 * All scenery is synthesized in Three.js: no borrowed photographs, maps or brands.
 * Physics and the original fixed-width track ribbon remain unchanged.
 * p[n] = point on the track centre, t[n] tangent, s[n] roadside normal.
 */
export function addCostaRicaScenery(THREE, world, def, points, tangents, normals, quality) {
  const id=def.theme?.cr;
  if(!['zurqui','costanera','puntarenas','ruta1','ruta2','ruta27'].includes(id))return;
  const N=points.length, hi=quality==='alta'||quality==='cine';
  const step=hi?16:quality==='media'?24:36;
  const mats={
    concrete:new THREE.MeshStandardMaterial({color:0x777971,roughness:.93,side:THREE.DoubleSide}),
    stone:new THREE.MeshStandardMaterial({color:0x777060,roughness:.97,side:THREE.DoubleSide}),
    // Subtle damp concrete: a restrained PBR sheen, without reflection probes or new textures.
    tunnel:new THREE.MeshPhysicalMaterial({color:0x575d57,metalness:0,roughness:.72,clearcoat:.16,clearcoatRoughness:.34,side:THREE.DoubleSide}),
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

  // Identity-only additions for adapted arcade circuits. These are not GIS road replicas.
  // Reuse procedural road signs, preserving road meshes, collision and car physics.
  // Small original low-poly pedestrians, placed behind the promenade wall.
  // Animated limbs use mesh callbacks; no texture downloads or per-frame allocations.
  function beachWalkers(count){
    const skin=new THREE.MeshStandardMaterial({color:0xb68a6a,roughness:1});
    const shirt=[0x1d83a2,0xe4a34a,0x6d9b73,0xd45f63].map(color=>new THREE.MeshStandardMaterial({color,roughness:.94}));
    const shorts=new THREE.MeshStandardMaterial({color:0x343c47,roughness:.95});
    const sphere=new THREE.SphereGeometry(.34,7,5);
    const torso=new THREE.BoxGeometry(.85,1.1,.42);
    const limb=new THREE.BoxGeometry(.22,.9,.25);
    for(let j=0;j<count;j++){
      const i=Math.floor(N*(j+.4)/count),g=new THREE.Group();
      const head=new THREE.Mesh(sphere,skin);head.position.y=2.38;g.add(head);
      const body=new THREE.Mesh(torso,shirt[j%shirt.length]);body.position.y=1.52;g.add(body);
      const limbs=[];
      for(const side of [-1,1]){
        const leg=new THREE.Mesh(limb,shorts);leg.position.set(side*.22,.64,0);g.add(leg);limbs.push(leg);
        const arm=new THREE.Mesh(limb,skin);arm.position.set(side*.56,1.46,0);g.add(arm);limbs.push(arm);
      }
      const speed=.0012+(j%3)*.0002,phase=j*2.1;
      body.onBeforeRender=()=>{
        const step=Math.sin(performance.now()*speed+phase)*.25;
        limbs[0].rotation.x=step;limbs[2].rotation.x=-step;
        limbs[1].rotation.x=-step*.7;limbs[3].rotation.x=step*.7;
      };
      place(g,i,1,37+j%3*3,.25);
      g.scale.setScalar(.85+(j%3)*.09);
    }
  }
  // Guanacaste-inspired landscape: open cattle pasture, shade trees and fenced herds.
  // Scenery sits well outside the driving ribbon; instancing limits draw calls on mobile.
  function guanacastePastures(){
    const pastureMat=new THREE.MeshStandardMaterial({color:0x8caa57,roughness:1,side:THREE.DoubleSide});
    const fieldGeo=new THREE.PlaneGeometry(46,68);
    const fields=hi?28:12, fieldMesh=new THREE.InstancedMesh(fieldGeo,pastureMat,fields);
    const obj=new THREE.Object3D();
    for(let j=0;j<fields;j++){
      const k=Math.floor(N*(j+.4)/fields),side=j%2?1:-1;
      obj.position.copy(node(k,side,64,-.48));obj.rotation.set(-Math.PI/2,0,-Math.atan2(tangents[k].x,tangents[k].z));
      obj.scale.set(1,1,1);obj.updateMatrix();fieldMesh.setMatrixAt(j,obj.matrix);
    }
    fieldMesh.receiveShadow=true;world.add(fieldMesh);
    // Broadleaf shade trees, distinct from the dense rainforest.
    const nTrees=hi?100:38;
    const crowns=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(4.8,1),new THREE.MeshStandardMaterial({color:0x447342,roughness:.95}),nTrees);
    const trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.48,.7,6,6),mats.bark,nTrees);
    for(let j=0;j<nTrees;j++){
      const k=Math.floor(N*(j+.2)/nTrees),side=j%2?1:-1,dist=49+24*Math.abs(Math.sin(j*9.7));
      const p=node(k,side,dist,0);
      obj.rotation.set(0,j*1.9,0);obj.scale.setScalar(.8+.35*Math.abs(Math.sin(j*2.3)));
      obj.position.copy(p).add(new THREE.Vector3(0,3.2,0));obj.updateMatrix();trunks.setMatrixAt(j,obj.matrix);
      obj.position.copy(p).add(new THREE.Vector3(0,8.5,0));obj.scale.multiplyScalar(1.5);obj.updateMatrix();crowns.setMatrixAt(j,obj.matrix);
    }
    world.add(trunks,crowns);
    const white=new THREE.MeshStandardMaterial({color:0xe6e2d3,roughness:.95});
    const dark=new THREE.MeshStandardMaterial({color:0x3d342e,roughness:.96});
    const cowBody=new THREE.BoxGeometry(2.7,1.35,1.35);
    const cowHead=new THREE.BoxGeometry(.9,.9,.85);
    const cowLeg=new THREE.CylinderGeometry(.15,.2,1.15,5);
    const cowCount=hi?20:8;
    for(let j=0;j<cowCount;j++){
      const k=Math.floor(N*(j+.7)/cowCount),side=j%2?1:-1;
      const cow=new THREE.Group(),coat=j%3===0?dark:white;
      const body=new THREE.Mesh(cowBody,coat);body.position.y=1.65;cow.add(body);
      const head=new THREE.Mesh(cowHead,coat);head.position.set(1.55,1.88,0);cow.add(head);
      for(const x of [-.9,.9])for(const z of [-.43,.43]){
        const leg=new THREE.Mesh(cowLeg,coat);leg.position.set(x,.6,z);cow.add(leg);
      }
      const earGeo=new THREE.BoxGeometry(.38,.15,.26);
      for(const z of [-.57,.57]){const ear=new THREE.Mesh(earGeo,coat);ear.position.set(1.5,2.19,z);cow.add(ear);}
      // Cattle remain behind the roadside vegetation and never enter the road.
      place(cow,k,side,60+11*Math.abs(Math.sin(j*3.7)),-.1);
      cow.rotation.y+=Math.sin(j*4.7)*1.4;
      cow.scale.setScalar(.8+.12*(j%3));
    }
    const fenceMat=new THREE.MeshStandardMaterial({color:0x766247,roughness:1});
    const postGeo=new THREE.BoxGeometry(.2,1.7,.2),railGeo=new THREE.BoxGeometry(.12,.12,10);
    const postCount=hi?90:38;
    const posts=new THREE.InstancedMesh(postGeo,fenceMat,postCount);
    for(let j=0;j<postCount;j++){
      const k=Math.floor(N*j/postCount),side=j%2?1:-1;
      obj.position.copy(node(k,side,42,.75));obj.rotation.set(0,0,0);obj.scale.set(1,1,1);obj.updateMatrix();posts.setMatrixAt(j,obj.matrix);
    }
    world.add(posts);
  }
  if(id==='ruta1'){
    guanacastePastures();
    sign('RUTA 1 · LIBERIA',Math.floor(N*.08),1,22);
    sign('INTERAMERICANA NORTE',Math.floor(N*.55),-1,23);
    sign('HACIA GUANACASTE',Math.floor(N*.79),1,23);
  } else if(id==='ruta27'){
    // Fictional race loop inspired by Ruta 27: overhead gantries leave the whole
    // racing ribbon unobstructed. These are not surveyed toll locations.
    const green=new THREE.MeshStandardMaterial({color:0x275c35,roughness:.84});
    const steel=new THREE.MeshStandardMaterial({color:0x89959b,metalness:.55,roughness:.47});
    const grass=new THREE.MeshStandardMaterial({color:0x7eaa5e,roughness:1,side:THREE.DoubleSide});
    const rock=new THREE.MeshStandardMaterial({color:0x667a62,roughness:1});
    const laneBoard=(title,accent=0x207744)=>{
      const canvas=document.createElement('canvas');canvas.width=512;canvas.height=192;
      const ctx=canvas.getContext('2d');
      ctx.fillStyle='#173f32';ctx.fillRect(0,0,512,192);
      ctx.strokeStyle='#e7f4eb';ctx.lineWidth=10;ctx.strokeRect(8,8,496,176);
      ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.font='bold 58px Arial';ctx.fillText(title,256,98,470);
      const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
      const board=new THREE.Mesh(new THREE.PlaneGeometry(5.7,2.15),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));
      return board;
    };
    const gantry=(i,labels)=>{
      const group=new THREE.Group();
      // Overhead signs are advisory. Do not close a playable lane or add collisions.
      for(const x of [-20,20])group.add(cube(.8,10,.8,steel,x,5,0));
      group.add(cube(41,.55,.9,steel,0,10,0));
      labels.forEach((label,j)=>{
        const x=(j-1)*11.2;
        const board=laneBoard(label);board.position.set(x,8.4,.6);group.add(board);
        const light=cube(2,.35,.4,new THREE.MeshBasicMaterial({color:label==='CERRADO'?0xf04c42:0x35dc73}),x,6.9,.6);
        group.add(light);
      });
      place(group,i,1,0,.1);
    };
    const viaduct=(i)=>{
      const group=new THREE.Group();
      // Stylized mountain-to-mountain viaduct. The deck is above the race road,
      // while its pillars stand outside the 32 m clear corridor.
      group.add(cube(112,1.5,11,mats.concrete,0,22,0));
      for(const z of [-5.2,5.2])group.add(cube(112,1.2,.3,steel,0,23.3,z));
      for(const x of [-51,-35,35,51]){
        group.add(cube(2.6,21,2.6,mats.concrete,x,10.5,0));
      }
      for(const x of [-44,44]){
        const abutment=new THREE.Mesh(new THREE.ConeGeometry(17,22,7),rock);
        abutment.position.set(x,5,0);group.add(abutment);
      }
      place(group,i,1,0,.2);
    };
    gantry(Math.floor(N*.16),['QUICK PASS','ABIERTO','CERRADO']);
    viaduct(Math.floor(N*.62));
    gantry(Math.floor(N*.85),['QUICK PASS','ABIERTO','CERRADO']);
    sign('PEAJE · RUTA 27',Math.floor(N*.16),1,25);
    sign('VIADUCTO · RUTA 27',Math.floor(N*.62),-1,25);
    sign('QUICK PASS',Math.floor(N*.85),1,25);
    // Suburban districts near the San Jose end: low-rise buildings, not
    // claimed to be exact real-world structures.
    const glass=new THREE.MeshPhysicalMaterial({color:0x789aa4,metalness:.12,roughness:.3,clearcoat:.18});
    const walls=new THREE.MeshStandardMaterial({color:0xc6bfb0,roughness:.88});
    const buildings=hi?40:16;
    for(let j=0;j<buildings;j++){
      const k=Math.floor(N*(.02+.35*(j+.5)/buildings)),side=j%2?1:-1;
      const g=new THREE.Group(),h=7+(j%6)*3.2;
      g.add(cube(8,h,8,walls,0,h/2,0));
      for(let floor=0;floor<Math.floor(h/3);floor++){
        for(const z of [-4.05,4.05])g.add(cube(5.5,1.3,.08,glass,0,2.2+floor*3,z));
      }
      g.add(cube(9,.5,9,steel,0,h+.25,0));
      place(g,k,side,52+13*Math.abs(Math.sin(j*3.4)));
    }
    // Distant ridges, pasture patches and roadside shade vegetation.
    const hills=hi?75:28, hillGeo=new THREE.ConeGeometry(15,26,6);
    const hillMesh=new THREE.InstancedMesh(hillGeo,rock,hills);
    const dummy=new THREE.Object3D();
    for(let j=0;j<hills;j++){
      const k=Math.floor(N*(j+.3)/hills),side=j%2?1:-1;
      dummy.position.copy(node(k,side,120+38*Math.abs(Math.sin(j*2.2)),8));
      dummy.rotation.set(0,j*.83,0);
      dummy.scale.set(1.2+.7*Math.abs(Math.sin(j*3.1)),1+.55*Math.abs(Math.cos(j)),1.2);
      dummy.updateMatrix();hillMesh.setMatrixAt(j,dummy.matrix);
    }
    world.add(hillMesh);
    const fieldGeo=new THREE.PlaneGeometry(40,70),fields=hi?24:10;
    const fieldMesh=new THREE.InstancedMesh(fieldGeo,grass,fields);
    for(let j=0;j<fields;j++){
      const k=Math.floor(N*(j+.5)/fields),side=j%2?1:-1;
      dummy.position.copy(node(k,side,65,-.38));
      dummy.rotation.set(-Math.PI/2,0,-Math.atan2(tangents[k].x,tangents[k].z));
      dummy.scale.set(1,1,1);dummy.updateMatrix();fieldMesh.setMatrixAt(j,dummy.matrix);
    }
    world.add(fieldMesh);
    streetlights(0,N,1,80);
    sign('RUTA 27 · CALDERA',Math.floor(N*.08),1,22);
    sign('SAN JOSE · OROTINA',Math.floor(N*.55),-1,23);
    sign('SANTA ANA',Math.floor(N*.28),1,23);
    sign('ESCAZU',Math.floor(N*.74),-1,23);
    sign('CIUDAD COLON',Math.floor(N*.42),1,24);
    sign('HACIA CALDERA',Math.floor(N*.93),-1,23);
  } else if(id==='ruta2'){
    sign('RUTA 2 · CERRO DE LA MUERTE',Math.floor(N*.08),1,23);
    sign('HACIA PEREZ ZELEDON',Math.floor(N*.55),-1,23);
    sign('PARAMO · ALTA MONTANA',Math.floor(N*.27),1,24);
    sign('FAUNA SILVESTRE',Math.floor(N*.77),-1,24);
  }
    if(id==='zurqui'){
    rainforestTrees(hi?350:145);ferns(hi?230:90);
    sign('RUTA 32 · ZURQUI',Math.floor(N*.07),1,20);
    sign('PARQUE BRAULIO CARRILLO',Math.floor(N*.46),-1,20);
    sign('TUNEL ZURQUI',Math.floor(N*.25),1,22);
    sign('PRECAUCION · FAUNA',Math.floor(N*.79),-1,23);
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
    for(let k=0;k<14;k++)boat(Math.floor(N*(k+.4)/17),k%2?1:-1,82+16*(k%3),k%4===0);
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
    sign('EL FARO · LA PUNTA',Math.floor(N*.16),-1,22);
    sign('MUELLE DE CRUCEROS',Math.floor(N*.70),-1,22);
    lighthouse();
    // Generic tourist pier, inspired by the cruise-pier setting documented by ICT.
    // Decorative only: exact geometry, length and position are artistic, not surveyed.
    // All supports are at least 39 world units from the road centre.
    const pier=new THREE.Group();
    const deckMat=new THREE.MeshStandardMaterial({color:0x9d9587,roughness:.91});
    const pilingMat=new THREE.MeshStandardMaterial({color:0x858b89,roughness:.87,metalness:.12});
    const railingMat=new THREE.MeshStandardMaterial({color:0xc8d0cc,metalness:.32,roughness:.5});
    const pierLength=hi?56:42,deckY=2.7;
    pier.add(cube(pierLength,.65,8.4,deckMat,-pierLength/2,deckY,0));
    const pileCount=hi?8:6;
    for(let j=0;j<pileCount;j++){
      const x=-(3+j*(pierLength-6)/(pileCount-1));
      for(const z of [-3.5,3.5]){
        pier.add(cube(.7,4.8,.7,pilingMat,x,.2,z));
        pier.add(cube(.17,1.25,.17,railingMat,x,deckY+1.05,z));
      }
    }
    for(const z of [-4.0,4.0])pier.add(cube(pierLength,.13,.13,railingMat,-pierLength/2,deckY+1.65,z));
    // place() aligns the local negative X axis to the positive roadside normal.
    place(pier,Math.floor(N*.70),1,40,-.1);
    // Compact seating and visitor kiosks reinforce the documented promenade.
    const benchMat=new THREE.MeshStandardMaterial({color:0x946b46,roughness:.88});
    for(let j=0;j<(hi?12:5);j++){
      const bench=new THREE.Group();
      bench.add(cube(2.4,.22,.75,benchMat,0,.9,0));
      bench.add(cube(2.4,.95,.17,benchMat,0,1.35,-.37));
      for(const x of [-.95,.95])bench.add(cube(.14,.85,.14,mats.black,x,.45,0));
      place(bench,Math.floor(N*(j+.4)/(hi?12:5)),-1,43);
    }
    beachWalkers(hi?18:8);
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
