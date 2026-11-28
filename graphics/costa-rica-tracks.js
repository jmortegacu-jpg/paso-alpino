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
      fragmentShader:`varying vec3 vW;varying float vAcross;uniform float uT;void main(){float wave=sin(vW.x*.25+uT*.75)*cos(vW.z*.24-uT*.48);float foam=pow(max(0.,sin(vW.x*.46+vW.z*.3+uT*.75)),13.);vec3 c=mix(vec3(.025,.17,.27),vec3(.07,.45,.55),.55+.32*wave);c+=vec3(.24,.31,.29)*foam*.25;float shoreMask=1.-smoothstep(.015,.19,vAcross);float wash=.5+.5*sin(vW.x*.22+vW.z*.16-uT*.65);float shoreline=shoreMask*smoothstep(.35,.82,wash);float breaker=exp(-pow((vAcross-(.055+.024*sin(vW.x*.075+uT*.22)))/.022,2.));float ripples=breaker*(.55+.45*sin(vW.x*.43-vW.z*.31+uT*1.15));c=mix(c,vec3(.47,.75,.76),shoreline*.44);c=mix(c,vec3(.63,.83,.83),clamp(ripples*.30,0.,.30));c+=vec3(.09,.14,.13)*foam*.22;gl_FragColor=vec4(c,1.);}`});
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
    // Instance transforms are written after mesh construction: refresh their
    // culling bounds to avoid disappearing groves at the driving-camera edge.
    trunks.instanceMatrix.needsUpdate=true;crowns.instanceMatrix.needsUpdate=true;
    trunks.computeBoundingSphere();crowns.computeBoundingSphere();
    trunks.castShadow=false;crowns.castShadow=false;
    world.add(trunks,crowns);
    // Guanacaste-inspired wide shade canopies: original stylized geometry,
    // not an exact botanical model or a claim about a particular tree location.
    // Two instanced meshes regardless of quality, no collisions or shadows.
    const canopyCount=hi?26:quality==='media'?14:7;
    const canopyMat=new THREE.MeshStandardMaterial({color:0x577c39,roughness:.98,side:THREE.DoubleSide});
    const canopyGeo=new THREE.SphereGeometry(1,9,5);
    const canopyMesh=new THREE.InstancedMesh(canopyGeo,canopyMat,canopyCount);
    const canopyStems=new THREE.InstancedMesh(new THREE.CylinderGeometry(.38,.58,1,6),mats.bark,canopyCount);
    const canopyObj=new THREE.Object3D();
    for(let j=0;j<canopyCount;j++){
      const k=Math.floor(N*(j+.45)/canopyCount),side=j%2?1:-1;
      const p=node(k,side,75+8*Math.abs(Math.sin(j*4.9)),0);
      const height=8+2*Math.abs(Math.sin(j*1.7)),spread=8+2*Math.abs(Math.sin(j*2.9));
      canopyObj.position.copy(p);canopyObj.position.y+=height*.5;
      canopyObj.rotation.set(0,j*.7,0);canopyObj.scale.set(.58,height,.58);
      canopyObj.updateMatrix();canopyStems.setMatrixAt(j,canopyObj.matrix);
      // Vary canopy silhouette deterministically; preserve a fixed GPU instance budget.
      // Place foliage above the trunk and keep the road corridor free.
      canopyObj.position.copy(p);canopyObj.position.y+=height+1.3;
      canopyObj.rotation.set(0,j*.7,0);
      const crownHeight=2.1+0.65*Math.abs(Math.sin(j*2.13));
      canopyObj.scale.set(spread,crownHeight,spread*(.78+.16*Math.abs(Math.sin(j*1.31))));
      canopyObj.updateMatrix();canopyMesh.setMatrixAt(j,canopyObj.matrix);
    }
    canopyMesh.instanceMatrix.needsUpdate=true;canopyStems.instanceMatrix.needsUpdate=true;
    canopyMesh.computeBoundingSphere();canopyStems.computeBoundingSphere();
    world.add(canopyStems,canopyMesh);
    const white=new THREE.MeshStandardMaterial({color:0xe6e2d3,roughness:.95});
    const dark=new THREE.MeshStandardMaterial({color:0x3d342e,roughness:.96});
    const cowBody=new THREE.BoxGeometry(2.7,1.35,1.35);
    const cowHead=new THREE.BoxGeometry(.9,.9,.85);
    const cowLeg=new THREE.CylinderGeometry(.15,.2,1.15,5);
    // Reuse the same ear geometry across all cattle; each mesh keeps its own transform.
    // This avoids allocating identical GPU buffers for every decorative animal.
    const cowEar=new THREE.BoxGeometry(.38,.15,.26);
    const cowCount=hi?20:8;
    for(let j=0;j<cowCount;j++){
      const k=Math.floor(N*(j+.7)/cowCount),side=j%2?1:-1;
      const cow=new THREE.Group(),coat=j%3===0?dark:white;
      const body=new THREE.Mesh(cowBody,coat);body.position.y=1.65;cow.add(body);
      const head=new THREE.Mesh(cowHead,coat);head.position.set(1.55,1.88,0);cow.add(head);
      for(const x of [-.9,.9])for(const z of [-.43,.43]){
        const leg=new THREE.Mesh(cowLeg,coat);leg.position.set(x,.6,z);cow.add(leg);
      }
      for(const z of [-.57,.57]){const ear=new THREE.Mesh(cowEar,coat);ear.position.set(1.5,2.19,z);cow.add(ear);}
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
    // Transforms are assigned after construction; refresh culling bounds so
    // roadside fence posts do not vanish prematurely near the driving camera.
    posts.instanceMatrix.needsUpdate=true;
    posts.computeBoundingSphere();
    posts.castShadow=false;
    world.add(posts);
  }
  if(id==='ruta1'){
    guanacastePastures();
    // Original roadside reflective delineators: visible at low camera height.
    // Shared geometry/material and no physics colliders or light sources.
    {
      const count=hi?32:quality==='media'?20:12;
      const post=new THREE.InstancedMesh(new THREE.BoxGeometry(.22,1.18,.22),
        new THREE.MeshStandardMaterial({color:0xe6e0cb,roughness:.83}),count);
      const reflector=new THREE.InstancedMesh(new THREE.BoxGeometry(.25,.25,.025),
        new THREE.MeshBasicMaterial({color:0xf5b847,side:THREE.DoubleSide}),count);
      const o=new THREE.Object3D();
      for(let j=0;j<count;j++){
        const k=Math.floor(N*(j+.5)/count)%N,side=j%2?1:-1;
        const p=node(k,side,19,.59),angle=Math.atan2(tangents[k].x,tangents[k].z);
        o.position.copy(p);o.rotation.set(0,angle,0);o.scale.set(1,1,1);
        o.updateMatrix();post.setMatrixAt(j,o.matrix);
        o.position.y+=.31;o.position.x+=normals[k].x*side*.125;
        o.position.z+=normals[k].z*side*.125;
        o.updateMatrix();reflector.setMatrixAt(j,o.matrix);
      }
      for(const mesh of [post,reflector]){
        mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
        mesh.castShadow=false;world.add(mesh);
      }
    }
    // Cortez amarillo (Handroanthus ochraceus): stylized seasonal flowering
    // silhouette. Original procedural geometry, not a botanical reconstruction.
    // Keep trees outside the driving ribbon and avoid new physics colliders.
    {
      const count=hi?12:quality==='media'?7:4;
      const trunk=new THREE.InstancedMesh(
        new THREE.CylinderGeometry(.24,.43,6.4,6),
        mats.bark,count);
      const blossoms=new THREE.InstancedMesh(
        new THREE.IcosahedronGeometry(3.6,1),
        new THREE.MeshStandardMaterial({color:0xe9bb32,roughness:.92,flatShading:true}),
        count);
      const o=new THREE.Object3D();
      for(let j=0;j<count;j++){
        const k=Math.floor(N*(j+.37)/count)%N;
        const side=j%2?1:-1;
        const p=node(k,side,53+6*Math.sin(j*2.1),0);
        const scale=.8+.22*(.5+.5*Math.sin(j*3.7));
        o.position.copy(p);o.position.y+=3.2*scale;
        o.rotation.set(0,j*1.9,0);o.scale.setScalar(scale);o.updateMatrix();
        trunk.setMatrixAt(j,o.matrix);
        o.position.y+=5.1*scale;
        o.scale.set(1.25*scale,.68*scale,1.18*scale);o.updateMatrix();
        blossoms.setMatrixAt(j,o.matrix);
      }
      for(const mesh of [trunk,blossoms]){
        mesh.instanceMatrix.needsUpdate=true;
        mesh.computeBoundingSphere();
        mesh.castShadow=false;
        world.add(mesh);
      }
    }
    // Warm dry-season foothills beyond the cattle pastures. Their broad,
    // staggered silhouettes improve landscape depth from the driving camera.
    // All geometry is decorative and stays far outside the racing corridor.
    {
      const ridgeCount=hi?20:quality==='media'?11:6;
      const ridgeMat=new THREE.MeshStandardMaterial({
        color:0x8a936b,roughness:.96,metalness:0,flatShading:true
      });
      const ridgeGeo=new THREE.IcosahedronGeometry(1,hi?2:1);
      const ridge=new THREE.InstancedMesh(ridgeGeo,ridgeMat,ridgeCount);
      const dummy=new THREE.Object3D();
      for(let j=0;j<ridgeCount;j++){
        const k=Math.floor(N*(j+.38)/ridgeCount)%N;
        const side=j%2?1:-1;
        const height=17+15*Math.abs(Math.sin(j*1.37));
        dummy.position.copy(node(k,side,145+28*Math.abs(Math.sin(j*.93)),height*.24));
        dummy.rotation.set(0,j*.73,0);
        dummy.scale.set(30+13*Math.abs(Math.cos(j)),height,23+9*Math.abs(Math.sin(j)));
        dummy.updateMatrix();ridge.setMatrixAt(j,dummy.matrix);
        const tint=.78+.19*Math.abs(Math.sin(j*1.73));
        ridge.setColorAt(j,new THREE.Color().setRGB(tint,tint,tint));
      }
      ridge.instanceMatrix.needsUpdate=true;
      ridge.computeBoundingSphere();
      ridge.castShadow=false;ridge.receiveShadow=false;
      world.add(ridge);
    }
    // Distinctive dry-forest roadside landmark: low, broad guanacaste canopy.
    // Decorative silhouette is well outside the road and uses shared geometry.
    {
      const crownCount=hi?9:quality==='media'?6:3;
      const crown=new THREE.InstancedMesh(
        new THREE.IcosahedronGeometry(1,hi?2:1),
        new THREE.MeshStandardMaterial({color:0x477044,roughness:.95,flatShading:true}),
        crownCount);
      const trunk=new THREE.Mesh(
        new THREE.CylinderGeometry(.85,1.45,11,hi?10:6),
        mats.bark);
      const k=Math.floor(N*.34);
      const base=node(k,1,76,0);
      trunk.position.copy(base);trunk.position.y+=5.5;
      trunk.castShadow=false;world.add(trunk);
      const dummy=new THREE.Object3D();
      for(let j=0;j<crownCount;j++){
        const a=2*Math.PI*j/crownCount;
        dummy.position.copy(base);
        dummy.position.x+=Math.cos(a)*7.2;
        dummy.position.z+=Math.sin(a)*7.2;
        dummy.position.y+=12.8+1.5*Math.sin(j*2.4);
        dummy.scale.set(8.2,3.1,7.4);
        dummy.rotation.set(0,a,0);dummy.updateMatrix();
        crown.setMatrixAt(j,dummy.matrix);
      }
      crown.instanceMatrix.needsUpdate=true;
      crown.computeBoundingSphere();
      crown.castShadow=false;world.add(crown);
    }
    // Exposed ochre volcanic-soil outcrops along the dry-forest pasture edge.
    // Instanced low-poly shapes add a readable warm roadside landmark without
    // changing the race ribbon or introducing colliders / dynamic lights.
    {
      const count=hi?28:quality==='media'?15:7;
      const rock=new THREE.InstancedMesh(
        new THREE.DodecahedronGeometry(1,0),
        new THREE.MeshStandardMaterial({color:0xa36a43,roughness:.98,metalness:0,flatShading:true}),
        count);
      const dummy=new THREE.Object3D();
      for(let j=0;j<count;j++){
        const k=Math.floor(N*(.11+.70*(j+.5)/count))%N;
        const side=j%2?1:-1;
        const radius=1.8+2.3*Math.abs(Math.sin(j*1.81));
        dummy.position.copy(node(k,side,88+14*Math.abs(Math.sin(j*.83)),radius*.28));
        dummy.rotation.set(.13*j,.71*j,.09*j);
        dummy.scale.set(radius*1.6,radius*.65,radius*1.25);
        dummy.updateMatrix();rock.setMatrixAt(j,dummy.matrix);
      }
      rock.instanceMatrix.needsUpdate=true;
      rock.computeBoundingSphere();
      rock.castShadow=false;rock.receiveShadow=false;
      world.add(rock);
    }
    // Original shaded roadside bus-stop shelter: a recognisable rural Route 1
    // silhouette viewed from the racing camera. Entirely decorative, beyond
    // the road edge; shared PBR materials, instanced posts, no physics bodies.
    {
      const k=Math.floor(N*.64);
      const base=node(k,1,64,0);
      const tangent=node(Math.min(N-1,k+1),1,64,0).sub(node(Math.max(0,k-1),1,64,0)).normalize();
      const angle=Math.atan2(tangent.x,tangent.z);
      const shelter=new THREE.Group();
      shelter.position.copy(base);shelter.rotation.y=angle;
      const roof=new THREE.Mesh(new THREE.BoxGeometry(9,.34,3.8),
        new THREE.MeshStandardMaterial({color:0xb76c43,metalness:.08,roughness:.82}));
      roof.position.y=4.3;roof.rotation.z=.055;roof.castShadow=false;
      shelter.add(roof);
      const posts=new THREE.InstancedMesh(new THREE.CylinderGeometry(.13,.17,4.2,6),
        new THREE.MeshStandardMaterial({color:0x777d75,metalness:.45,roughness:.65}),4);
      const dummy=new THREE.Object3D();
      for(let j=0;j<4;j++){
        dummy.position.set(j%2?3.7:-3.7,2.1,j<2?-1.35:1.35);
        dummy.updateMatrix();posts.setMatrixAt(j,dummy.matrix);
      }
      posts.instanceMatrix.needsUpdate=true;posts.computeBoundingSphere();
      posts.castShadow=false;shelter.add(posts);
      const bench=new THREE.Mesh(new THREE.BoxGeometry(5.6,.28,.75),
        new THREE.MeshStandardMaterial({color:0x76533a,roughness:.9}));
      bench.position.set(0,1.05,0);bench.castShadow=false;shelter.add(bench);
      world.add(shelter);
    }
    sign('BOSQUE SECO · GUANACASTE',Math.floor(N*.31),1,24);
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
    // One canvas texture per unique message, reused by both toll plazas.
    // Larger board lettering and higher contrast for the chase/cockpit camera.
    const tollTextures=new Map();
    // Reuse both GPU textures and materials across toll plazas.
    const tollBoardMaterials=new Map();
    const laneBoard=(title)=>{
      let tex=tollTextures.get(title);
      if(!tex){
        const canvas=document.createElement('canvas');canvas.width=512;canvas.height=192;
        const ctx=canvas.getContext('2d');
        ctx.fillStyle=title==='CERRADO'?'#752b28':'#165439';
        ctx.fillRect(0,0,512,192);
        ctx.strokeStyle='#f7f8f0';ctx.lineWidth=12;ctx.strokeRect(8,8,496,176);
        ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.font='bold 66px Arial';ctx.fillText(title,256,98,472);
        tex=new THREE.CanvasTexture(canvas);
        tex.colorSpace=THREE.SRGBColorSpace;
        tex.anisotropy=Math.min(4,world?.userData?.maxAnisotropy||4);
        tollTextures.set(title,tex);
      }
      if(!tollBoardMaterials.has(title)){
        tollBoardMaterials.set(title,new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide,depthWrite:false}));
      }
      return new THREE.Mesh(new THREE.PlaneGeometry(7.8,2.5),tollBoardMaterials.get(title));
    };
    const tollStatusMaterials={
      open:new THREE.MeshBasicMaterial({color:0x35dc73}),
      closed:new THREE.MeshBasicMaterial({color:0xf04c42})
    };
    const gantry=(i,labels)=>{
      const group=new THREE.Group();
      // Overhead signs are advisory. Do not close a playable lane or add collisions.
      for(const x of [-20,20])group.add(cube(.8,10,.8,steel,x,5,0));
      group.add(cube(41,.55,.9,steel,0,10,0));
      labels.forEach((label,j)=>{
        const x=(j-1)*11.2;
        const board=laneBoard(label);board.position.set(x,8.4,.6);group.add(board);
        const light=cube(2,.35,.4,label==='CERRADO'?tollStatusMaterials.closed:tollStatusMaterials.open,x,6.9,.6);
        group.add(light);
      });
      place(group,i,1,0,.1);
    };
    // Route 27: tall approach markers make the viaduct silhouette easier to
    // recognize from the driving camera, without obstructing the race ribbon.
    // Decorative only; positions are artistic, not surveyed road furniture.
    const viaductApproachMarkers=(i)=>{
      const group=new THREE.Group();
      const stripeMat=new THREE.MeshBasicMaterial({color:0xffd77c});
      const darkMat=new THREE.MeshStandardMaterial({color:0x25313a,roughness:.82});
      for(const s of [-1,1]){
        const post=cube(.42,5.1,.42,steel,s*24,2.55,0);
        post.castShadow=false;group.add(post);
        const board=cube(2.4,2.8,.18,darkMat,s*24,5.8,0);
        board.castShadow=false;group.add(board);
        for(let j=0;j<3;j++){
          const band=cube(1.9,.26,.20,stripeMat,s*24,5.1+j*.63,.12);
          band.castShadow=false;group.add(band);
        }
      }
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
      // Thin upright parapet posts make the elevated deck read as a real
      // viaduct from the chase camera. Instanced, decorative, no collisions.
      const parapetCount=hi?36:18;
      const parapetGeo=new THREE.BoxGeometry(.22,1.3,.22);
      const parapets=new THREE.InstancedMesh(parapetGeo,steel,parapetCount);
      const parapetDummy=new THREE.Object3D();
      for(let j=0;j<parapetCount;j++){
        const side=j%2?1:-1;
        const slot=Math.floor(j/2);
        const slots=parapetCount/2;
        parapetDummy.position.set(-53+106*(slot+.5)/slots,24.1,side*5.2);
        parapetDummy.rotation.set(0,0,0);
        parapetDummy.scale.set(1,1,1);
        parapetDummy.updateMatrix();
        parapets.setMatrixAt(j,parapetDummy.matrix);
      }
      parapets.instanceMatrix.needsUpdate=true;
      parapets.computeBoundingSphere();
      parapets.castShadow=false;
      parapets.receiveShadow=false;
      group.add(parapets);
      // Amber reflectors on the viaduct guardrail: paired, instanced,
      // visible in chase view without adding dynamic lights or collision.
      const reflectorCount=hi?24:12;
      const reflectorMesh=new THREE.InstancedMesh(
        new THREE.BoxGeometry(.34,.18,.055),
        new THREE.MeshBasicMaterial({color:0xffc96b}),
        reflectorCount);
      const reflectorDummy=new THREE.Object3D();
      for(let j=0;j<reflectorCount;j++){
        const side=j%2?1:-1;
        const slot=Math.floor(j/2),slots=reflectorCount/2;
        reflectorDummy.position.set(-49+98*(slot+.5)/slots,24.45,side*5.35);
        reflectorDummy.rotation.set(0,0,0);
        reflectorDummy.scale.set(1,1,1);
        reflectorDummy.updateMatrix();
        reflectorMesh.setMatrixAt(j,reflectorDummy.matrix);
      }
      reflectorMesh.instanceMatrix.needsUpdate=true;
      reflectorMesh.computeBoundingSphere();
      reflectorMesh.castShadow=false;
      group.add(reflectorMesh);
      // High-contrast end-of-viaduct hazard panels: original geometry,
      // visible from the chase camera without textures, lights or collisions.
      // The bridge is scenic, not a surveyed road-navigation reference.
      const hazardMat=new THREE.MeshBasicMaterial({color:0xffd45e,side:THREE.DoubleSide});
      const hazardDark=new THREE.MeshBasicMaterial({color:0x202b30,side:THREE.DoubleSide});
      for(const x of [-54,54]){
        for(const side of [-1,1]){
          const plate=cube(1.45,.86,.10,hazardDark,x,24.2,side*5.48);
          plate.castShadow=false;group.add(plate);
          for(let stripe=0;stripe<3;stripe++){
            const slash=cube(.15,.71,.115,hazardMat,x+(stripe-1)*.37,24.2,side*5.55);
            slash.rotation.z=-.44;slash.castShadow=false;group.add(slash);
          }
        }
      }
      // Repeated diagonal side bracing makes the elevated viaduct readable
      // from the chase camera. Shared PBR material; decorative, no collisions.
      const braceGeo=new THREE.BoxGeometry(.38,1, .38);
      const braceCount=hi?16:8;
      const braces=new THREE.InstancedMesh(braceGeo,steel,braceCount);
      const braceDummy=new THREE.Object3D();
      const braceAxis=new THREE.Vector3(0,1,0);
      for(let j=0;j<braceCount;j++){
        const side=j%2?-1:1;
        const span=Math.floor(j/2);
        const x=-45+span*(90/Math.max(1,braceCount/2-1));
        const start=new THREE.Vector3(x,22.4,side*5.4);
        const end=new THREE.Vector3(x+4,18.5,side*5.4);
        const delta=end.clone().sub(start);
        braceDummy.position.copy(start).add(end).multiplyScalar(.5);
        braceDummy.quaternion.setFromUnitVectors(braceAxis,delta.clone().normalize());
        braceDummy.scale.set(1,delta.length(),1);
        braceDummy.updateMatrix();braces.setMatrixAt(j,braceDummy.matrix);
      }
      braces.instanceMatrix.needsUpdate=true;
      braces.computeBoundingSphere();
      braces.castShadow=false;braces.receiveShadow=false;
      group.add(braces);
      for(const x of [-44,44]){
        const abutment=new THREE.Mesh(new THREE.ConeGeometry(17,22,7),rock);
        abutment.position.set(x,5,0);group.add(abutment);
      }
      place(group,i,1,0,.2);
    };
    // Reflective roadside delineators announce both toll plazas without new lights
    // or collisions. One instanced mesh per plaza, away from the racing ribbon.
    const reflectorGeo=new THREE.BoxGeometry(.24,1.2,.18);
    const reflectorMat=new THREE.MeshBasicMaterial({color:0xffe5a2});
    const tollDelineators=(center)=>{
      const count=20,mesh=new THREE.InstancedMesh(reflectorGeo,reflectorMat,count);
      const marker=new THREE.Object3D();
      for(let j=0;j<count;j++){
        const side=j%2===0?1:-1;
        const offset=Math.floor(j/2)*7;
        const k=(center-85+offset+N)%N;
        marker.position.copy(node(k,side,24,.8));
        marker.rotation.set(0,Math.atan2(tangents[k].x,tangents[k].z),0);
        marker.scale.set(1,1,1);
        marker.updateMatrix();
        mesh.setMatrixAt(j,marker.matrix);
      }
      mesh.instanceMatrix.needsUpdate=true;
      // Rebuild instance bounds after placement so off-screen toll markers can be culled.
      // This affects rendering only; markers have no collision bodies.
      mesh.computeBoundingSphere();
      world.add(mesh);
    };
    tollDelineators(Math.floor(N*.16));
    tollDelineators(Math.floor(N*.85));
    gantry(Math.floor(N*.16),['QUICK PASS','ABIERTO','CERRADO']);
    viaduct(Math.floor(N*.62));
    gantry(Math.floor(N*.85),['QUICK PASS','ABIERTO','CERRADO']);
    sign('PEAJE · RUTA 27',Math.floor(N*.16),1,25);
    sign('VIADUCTO · RUTA 27',Math.floor(N*.62),-1,25);
    viaductApproachMarkers(Math.floor(N*.59));
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
    hillMesh.instanceMatrix.needsUpdate=true;
    hillMesh.computeBoundingSphere(); // Correct culling bounds after ridge placement.
    hillMesh.castShadow=false; // Distant backdrop: avoid unnecessary shadow passes.
    world.add(hillMesh);
    const fieldGeo=new THREE.PlaneGeometry(40,70),fields=hi?24:10;
    const fieldMesh=new THREE.InstancedMesh(fieldGeo,grass,fields);
    for(let j=0;j<fields;j++){
      const k=Math.floor(N*(j+.5)/fields),side=j%2?1:-1;
      dummy.position.copy(node(k,side,65,-.38));
      dummy.rotation.set(-Math.PI/2,0,-Math.atan2(tangents[k].x,tangents[k].z));
      dummy.scale.set(1,1,1);dummy.updateMatrix();fieldMesh.setMatrixAt(j,dummy.matrix);
    }
    fieldMesh.instanceMatrix.needsUpdate=true;
    fieldMesh.computeBoundingSphere(); // Avoid incorrect culling of instanced pasture patches.
    fieldMesh.castShadow=false;
    world.add(fieldMesh);
    streetlights(0,N,1,80);
    sign('RUTA 27 · CALDERA',Math.floor(N*.08),1,22);
    sign('SAN JOSE · OROTINA',Math.floor(N*.55),-1,23);
    sign('SANTA ANA',Math.floor(N*.28),1,23);
    sign('ESCAZU',Math.floor(N*.74),-1,23);
    sign('CIUDAD COLON',Math.floor(N*.42),1,24);
    // Roadside wayfinding: artistic sequence, not surveyed exit coordinates.
    sign('SALIDA · GUACHIPELIN',Math.floor(N*.18),-1,25);
    sign('SALIDA · LA GUACIMA',Math.floor(N*.48),1,25);
    sign('ATENAS · OROTINA',Math.floor(N*.67),-1,25);
    sign('CALDERA · PUNTARENAS',Math.floor(N*.89),1,25);
    sign('HACIA CALDERA',Math.floor(N*.93),-1,23);
  } else if(id==='ruta2'){
    // Parque Eolico Los Santos: up to 15 stylized turbines near Casa Mata/La Paz.
    // Positions below are scenic approximations along a fictional loop, NOT GPS.
    // The landmark is deliberately near the first part of the route, before the
    // high-altitude forest/páramo sector; all parts remain outside the roadway.
    const windWhite=new THREE.MeshStandardMaterial({color:0xe6e9e7,metalness:.12,roughness:.53});
    const windDark=new THREE.MeshStandardMaterial({color:0x56656b,metalness:.3,roughness:.62});
    const windCount=hi?15:7;
    const towerGeo=new THREE.CylinderGeometry(1.1,2.1,44,8);
    const towerMesh=new THREE.InstancedMesh(towerGeo,windWhite,windCount);
    const hubGeo=new THREE.SphereGeometry(1.6,8,6);
    const hubMesh=new THREE.InstancedMesh(hubGeo,windDark,windCount);
    const rotorGeo=new THREE.BoxGeometry(1.45,25,.42);
    rotorGeo.translate(0,12.2,0);
    const rotors=[];
    const marker=new THREE.Object3D();
    for(let j=0;j<windCount;j++){
      const fraction=.09+.18*(j+.35)/windCount;
      const k=Math.floor(N*fraction),side=j%2?1:-1;
      const offset=65+24*Math.abs(Math.sin(j*2.8));
      const p=node(k,side,offset,-.3);
      marker.position.copy(p);marker.position.y+=22;
      marker.rotation.set(0,0,0);marker.scale.set(1,1,1);
      marker.updateMatrix();towerMesh.setMatrixAt(j,marker.matrix);
      marker.position.y=p.y+45;marker.updateMatrix();hubMesh.setMatrixAt(j,marker.matrix);
      // One group per visible rotor, three simple blades, slow rotation.
      // A per-mesh callback runs only while its rotor is actually rendered.
      const rotor=new THREE.Group();
      for(let b=0;b<3;b++){
        const pivot=new THREE.Group();pivot.rotation.z=b*Math.PI*2/3;
        const blade=new THREE.Mesh(rotorGeo,windWhite);pivot.add(blade);rotor.add(pivot);
      }
      rotor.position.copy(p);rotor.position.y+=45;
      rotor.rotation.y=Math.atan2(tangents[k].x,tangents[k].z);
      const visibleBlade=rotor.children[0].children[0];
      visibleBlade.onBeforeRender=()=>{
        rotor.rotation.z=performance.now()*.00024+j*.61;
      };
      world.add(rotor);rotors.push(rotor);
    }
    towerMesh.instanceMatrix.needsUpdate=true;hubMesh.instanceMatrix.needsUpdate=true;
    // Recalculate bounds after setting instance transforms so off-screen turbines can be culled safely.
    towerMesh.computeBoundingSphere();hubMesh.computeBoundingSphere();
    world.add(towerMesh,hubMesh);
    // High-elevation landscape: compact, original wind-shaped shrubs.
    // Restrict to the upper section of the fictional loop; keep roadside clear.
    // Two instanced meshes regardless of plant count, with no collision bodies.
    const shrubCount=hi?96:quality==='media'?48:24;
    const shrubCrownMat=new THREE.MeshStandardMaterial({color:0x526b43,roughness:1,flatShading:true});
    const shrubStemMat=new THREE.MeshStandardMaterial({color:0x655d4c,roughness:1});
    const shrubCrown=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.4,0),shrubCrownMat,shrubCount);
    const shrubStem=new THREE.InstancedMesh(new THREE.CylinderGeometry(.16,.23,1.2,5),shrubStemMat,shrubCount);
    const shrubDummy=new THREE.Object3D();
    for(let j=0;j<shrubCount;j++){
      const k=Math.floor(N*(.34+.33*(j+.5)/shrubCount));
      const side=j%2?1:-1,dist=31+12*Math.abs(Math.sin(j*2.39));
      const p=node(k,side,dist,-.3),size=.65+.65*Math.abs(Math.sin(j*1.71));
      shrubDummy.rotation.set(0,j*1.13,0);
      shrubDummy.position.copy(p);shrubDummy.position.y+=1.15*size;
      shrubDummy.scale.set(1.5*size,.55*size,1.2*size);
      shrubDummy.updateMatrix();shrubCrown.setMatrixAt(j,shrubDummy.matrix);
      shrubDummy.position.copy(p);shrubDummy.position.y+=.55*size;
      shrubDummy.scale.set(size,size,size);shrubDummy.updateMatrix();
      shrubStem.setMatrixAt(j,shrubDummy.matrix);
    }
    shrubCrown.instanceMatrix.needsUpdate=true;
    shrubStem.instanceMatrix.needsUpdate=true;
    shrubCrown.computeBoundingSphere();shrubStem.computeBoundingSphere();
    world.add(shrubCrown,shrubStem);
    // Wind-shaped upper-montane tree silhouettes, set well back from the roadway.
    // Shared low-poly geometry, two draw calls, no collision bodies or textures.
    const montaneCount=hi?18:quality==='media'?10:6;
    const montaneTrunks=new THREE.InstancedMesh(
      new THREE.CylinderGeometry(.32,.52,5,5),mats.bark,montaneCount);
    const montaneCrowns=new THREE.InstancedMesh(
      new THREE.ConeGeometry(3.1,7.5,6),mats.foliage,montaneCount);
    const montaneDummy=new THREE.Object3D();
    for(let j=0;j<montaneCount;j++){
      const k=Math.floor(N*(.38+.22*(j+.5)/montaneCount));
      const side=j%2?1:-1;
      const p=node(k,side,64+13*Math.abs(Math.sin(j*1.9)),-.3);
      const scale=.72+.32*Math.abs(Math.sin(j*2.7));
      montaneDummy.rotation.set(0,j*.91,0);
      montaneDummy.scale.set(scale,scale,scale);
      montaneDummy.position.copy(p);montaneDummy.position.y+=2.5*scale;
      montaneDummy.updateMatrix();montaneTrunks.setMatrixAt(j,montaneDummy.matrix);
      montaneDummy.position.copy(p);montaneDummy.position.y+=7.1*scale;
      montaneDummy.updateMatrix();montaneCrowns.setMatrixAt(j,montaneDummy.matrix);
    }
    for(const mesh of [montaneTrunks,montaneCrowns]){
      mesh.instanceMatrix.needsUpdate=true;
      mesh.computeBoundingSphere();
      mesh.castShadow=false;
      world.add(mesh);
    }
    // Sparse highland rock outcrops: original low-poly geometry, no physics bodies.
    // Keep these beyond the driving corridor and scale counts for mobile GPUs.
    const rockCount=hi?24:quality==='media'?12:6;
    const rockMesh=new THREE.InstancedMesh(
      new THREE.DodecahedronGeometry(2.4,0),
      new THREE.MeshStandardMaterial({color:0x777c72,roughness:.98,metalness:0}),
      rockCount);
    const rockDummy=new THREE.Object3D();
    for(let j=0;j<rockCount;j++){
      const k=Math.floor(N*(.61+.17*(j+.5)/rockCount));
      const side=j%2?1:-1;
      const p=node(k,side,58+18*Math.abs(Math.sin(j*1.71)),-1.1);
      const scale=.7+.55*Math.abs(Math.sin(j*2.31));
      rockDummy.position.copy(p);
      rockDummy.rotation.set(j*.17,j*.83,j*.11);
      rockDummy.scale.set(scale*1.4,scale*.65,scale);
      rockDummy.updateMatrix();
      rockMesh.setMatrixAt(j,rockDummy.matrix);
    }
    rockMesh.instanceMatrix.needsUpdate=true;
    rockMesh.computeBoundingSphere();
    rockMesh.castShadow=false;
    world.add(rockMesh);
    // Layered highland ridgeline: cool distant silhouettes create atmospheric
    // depth behind the wind farm from the driver's view. Original geometry,
    // no textures, collisions or dynamic lights; quality-scaled instances.
    const ridgeCount=hi?16:quality==='media'?9:5;
    const ridgeMaterial=new THREE.MeshStandardMaterial({
      color:0x667b75,roughness:1,metalness:0,flatShading:true
    });
    const ridgeMesh=new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(1,hi?2:1),ridgeMaterial,ridgeCount);
    const ridgeDummy=new THREE.Object3D();
    for(let j=0;j<ridgeCount;j++){
      const k=Math.floor(N*(.32+.40*(j+.5)/ridgeCount));
      const side=j%2?1:-1;
      // Alternating highland summits break up the repeated rounded-hill skyline.
      const h=24+15*Math.abs(Math.sin(j*1.37))+8*Math.abs(Math.sin(j*2.71));
      ridgeDummy.position.copy(node(k,side,145+20*Math.abs(Math.sin(j*1.9)),h*.2));
      ridgeDummy.rotation.set(0,j*.73,0);
      ridgeDummy.scale.set(29+12*Math.abs(Math.cos(j)),h,23+8*Math.abs(Math.sin(j)));
      ridgeDummy.updateMatrix();ridgeMesh.setMatrixAt(j,ridgeDummy.matrix);
      const shade=.8+.18*Math.abs(Math.sin(j*1.53));
      ridgeMesh.setColorAt(j,new THREE.Color().setRGB(shade,shade,shade));
    }
    ridgeMesh.instanceMatrix.needsUpdate=true;
    ridgeMesh.computeBoundingSphere();
    ridgeMesh.castShadow=false;ridgeMesh.receiveShadow=false;
    world.add(ridgeMesh);
    // Bosque nuboso en parches: copas escalonadas de silueta amplia, separadas
    // de la calzada y sin colisiones. Dos draw calls, densidad adaptable.
    const cloudTreeCount=hi?36:quality==='media'?20:10;
    const cloudTrunks=new THREE.InstancedMesh(
      new THREE.CylinderGeometry(.35,.58,6,6),mats.bark,cloudTreeCount);
    const cloudCrowns=new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(1,1),
      new THREE.MeshStandardMaterial({color:0x315d48,roughness:1,metalness:0,flatShading:true}),cloudTreeCount);
    const cloudDummy=new THREE.Object3D();
    for(let j=0;j<cloudTreeCount;j++){
      const k=Math.floor(N*(.43+.19*(j+.5)/cloudTreeCount));
      const side=j%2?1:-1;
      const p=node(k,side,85+20*Math.abs(Math.sin(j*2.17)),-.3);
      const scale=.8+.4*Math.abs(Math.sin(j*1.83));
      cloudDummy.rotation.set(0,j*.83,0);
      cloudDummy.scale.set(scale,scale,scale);
      cloudDummy.position.copy(p);cloudDummy.position.y+=3*scale;
      cloudDummy.updateMatrix();cloudTrunks.setMatrixAt(j,cloudDummy.matrix);
      cloudDummy.scale.set(4.1*scale,3.0*scale,3.5*scale);
      cloudDummy.position.copy(p);cloudDummy.position.y+=7.5*scale;
      cloudDummy.updateMatrix();cloudCrowns.setMatrixAt(j,cloudDummy.matrix);
    }
    for(const mesh of [cloudTrunks,cloudCrowns]){
      mesh.instanceMatrix.needsUpdate=true;
      mesh.computeBoundingSphere();
      mesh.castShadow=false;world.add(mesh);
    }
    // High-altitude roadside delineators: inexpensive original geometry, no physics.
    // Keep posts off the racing ribbon; quality-scaled instance counts.
    const delineatorCount=hi?32:quality==='media'?20:12;
    const postGeo=new THREE.BoxGeometry(.18,1.35,.18);
    const postMat=new THREE.MeshStandardMaterial({color:0xd9dcd6,roughness:.83,metalness:0});
    const bandGeo=new THREE.BoxGeometry(.21,.25,.21);
    const bandMat=new THREE.MeshBasicMaterial({color:0xe7b34b});
    const posts=new THREE.InstancedMesh(postGeo,postMat,delineatorCount);
    const bands=new THREE.InstancedMesh(bandGeo,bandMat,delineatorCount);
    const postDummy=new THREE.Object3D();
    for(let j=0;j<delineatorCount;j++){
      const k=Math.floor(N*(.32+.47*(j+.5)/delineatorCount));
      const side=j%2?1:-1;
      const p=node(k,side,22,-.12);
      postDummy.position.copy(p);postDummy.position.y+=.675;
      postDummy.rotation.set(0,0,0);postDummy.scale.set(1,1,1);
      postDummy.updateMatrix();posts.setMatrixAt(j,postDummy.matrix);
      postDummy.position.y=p.y+1.03;
      postDummy.updateMatrix();bands.setMatrixAt(j,postDummy.matrix);
    }
    for(const mesh of [posts,bands]){
      mesh.instanceMatrix.needsUpdate=true;
      mesh.computeBoundingSphere();
      mesh.castShadow=false;
      world.add(mesh);
    }
    // Montane safety guardrail: paired lightweight rails and posts along a
    // short scenic outer curve, away from the drivable surface. Decorative only.
    // Geometry is original and LOD-scaled; no rigid bodies or road edits.
    const railCount=hi?26:quality==='media'?16:9;
    const railPosts=new THREE.InstancedMesh(
      new THREE.BoxGeometry(.22,1.3,.22),
      new THREE.MeshStandardMaterial({color:0x8e9997,metalness:.48,roughness:.43}),
      railCount);
    const railBeams=new THREE.InstancedMesh(
      new THREE.BoxGeometry(.18,.27,5.2),
      new THREE.MeshStandardMaterial({color:0xc3cac5,metalness:.55,roughness:.38}),
      railCount);
    const railDummy=new THREE.Object3D();
    for(let j=0;j<railCount;j++){
      const k=Math.floor(N*(.46+.085*(j+.5)/railCount));
      const p=node(k,1,26,-.15);
      railDummy.position.copy(p);
      railDummy.position.y+=.65;
      railDummy.rotation.set(0,0,0);
      railDummy.scale.set(1,1,1);
      railDummy.updateMatrix();
      railPosts.setMatrixAt(j,railDummy.matrix);
      railDummy.position.y=p.y+1.13;
      railDummy.rotation.y=Math.atan2(tangents[k].x,tangents[k].z);
      railDummy.updateMatrix();
      railBeams.setMatrixAt(j,railDummy.matrix);
    }
    for(const mesh of [railPosts,railBeams]){
      mesh.instanceMatrix.needsUpdate=true;
      mesh.computeBoundingSphere();
      mesh.castShadow=false;
      world.add(mesh);
    }
    // Original stylized resplendent-quetzal silhouettes on distant montane perches.
    // Each bird uses three low-poly instanced shapes; no animated fauna or collisions.
    const quetzalCount=hi?5:quality==='media'?3:2;
    const qGreen=new THREE.MeshStandardMaterial({color:0x147c55,roughness:.86,metalness:.03,flatShading:true});
    const qRed=new THREE.MeshStandardMaterial({color:0xb43d38,roughness:.9,metalness:0});
    const qBody=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),qGreen,quetzalCount);
    const qChest=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),qRed,quetzalCount);
    const qTail=new THREE.InstancedMesh(new THREE.ConeGeometry(.24,5.5,5),qGreen,quetzalCount);
    const qDummy=new THREE.Object3D();
    for(let j=0;j<quetzalCount;j++){
      const k=Math.floor(N*(.40+.17*(j+.5)/quetzalCount));
      const p=node(k,j%2?1:-1,64+13*Math.abs(Math.sin(j*1.9)),8.6);
      qDummy.rotation.set(0,j*.91,0);qDummy.scale.set(.72,.95,.62);
      qDummy.position.copy(p);qDummy.updateMatrix();qBody.setMatrixAt(j,qDummy.matrix);
      qDummy.scale.set(.48,.39,.49);qDummy.position.y=p.y-.35;
      qDummy.updateMatrix();qChest.setMatrixAt(j,qDummy.matrix);
      qDummy.rotation.set(Math.PI,0,j*.08);qDummy.scale.set(1,1,1);
      qDummy.position.y=p.y-3.0;qDummy.updateMatrix();qTail.setMatrixAt(j,qDummy.matrix);
    }
    for(const mesh of [qBody,qChest,qTail]){
      mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
      mesh.castShadow=false;world.add(mesh);
    }
    // Original low-poly tapir silhouettes in distant forest clearings.
    // Decorative only: no animal collisions, AI or alteration to the track ribbon.
    const tapirCount=hi?4:quality==='media'?3:2;
    const tapirMat=new THREE.MeshStandardMaterial({color:0x353b36,roughness:.98,flatShading:true});
    const tapirBodies=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),tapirMat,tapirCount);
    const tapirHeads=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),tapirMat,tapirCount);
    const tapirLegs=new THREE.InstancedMesh(new THREE.CylinderGeometry(.17,.22,1,5),tapirMat,tapirCount*4);
    const tapirDummy=new THREE.Object3D();
    for(let j=0;j<tapirCount;j++){
      const k=Math.floor(N*(.49+.16*(j+.5)/tapirCount)),side=j%2?1:-1;
      const p=node(k,side,58+8*Math.abs(Math.sin(j*2.4)),0);
      tapirDummy.rotation.set(0,Math.atan2(tangents[k].x,tangents[k].z),0);
      tapirDummy.position.copy(p);tapirDummy.position.y+=1.45;
      tapirDummy.scale.set(1.12,.77,1.68);tapirDummy.updateMatrix();
      tapirBodies.setMatrixAt(j,tapirDummy.matrix);
      tapirDummy.position.copy(p);tapirDummy.position.y+=1.73;
      tapirDummy.position.z+=side*.85;tapirDummy.scale.set(.58,.56,.67);
      tapirDummy.updateMatrix();tapirHeads.setMatrixAt(j,tapirDummy.matrix);
      for(let l=0;l<4;l++){
        tapirDummy.position.copy(p);
        tapirDummy.position.x+=(l%2?-.53:.53);
        tapirDummy.position.z+=(l<2?-.75:.75);
        tapirDummy.position.y+=.49;tapirDummy.scale.set(1,1,1);
        tapirDummy.rotation.set(0,0,0);tapirDummy.updateMatrix();
        tapirLegs.setMatrixAt(j*4+l,tapirDummy.matrix);
      }
    }
    for(const mesh of [tapirBodies,tapirHeads,tapirLegs]){
      mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
      mesh.castShadow=false;world.add(mesh);
    }
    // Driver-readable roadside identification, not a reproduction of a real sign.
    sign('PARQUE EOLICO LOS SANTOS',Math.floor(N*.07),1,18);
    sign('COOPESANTOS',Math.floor(N*.15),-1,18);
    sign('CASA MATA · LA PAZ',Math.floor(N*.23),1,19);
    sign('RUTA 2 · CERRO DE LA MUERTE',Math.floor(N*.08),1,23);
    sign('HACIA PEREZ ZELEDON',Math.floor(N*.55),-1,23);
    sign('PARAMO · ALTA MONTANA',Math.floor(N*.27),1,24);
    sign('FAUNA SILVESTRE',Math.floor(N*.77),-1,24);
  }
    if(id==='zurqui'){
    rainforestTrees(hi?350:145);ferns(hi?230:90);
    // Narrow forest streams inspired by SINAC's documented rivers and quebradas.
    // Decorative only, outside the race ribbon; not claimed to match surveyed sites.
    // Procedural meshes and materials require no third-party textures or licenses.
    const streamWater=new THREE.MeshPhysicalMaterial({
      color:0x326f70,metalness:.04,roughness:.19,clearcoat:.65,
      clearcoatRoughness:.12,transparent:true,opacity:.86,side:THREE.DoubleSide
    });
    const streamStone=new THREE.MeshStandardMaterial({color:0x5c675e,roughness:.98});
    const streamCount=hi?4:2;
    const bankGeo=new THREE.IcosahedronGeometry(1.25,0);
    for(let stream=0;stream<streamCount;stream++){
      const center=Math.floor(N*(.09+stream*.19)),side=stream%2?1:-1;
      const verts=[],idx=[],samples=15;
      for(let j=0;j<=samples;j++){
        const k=(center+j*3)%N,dist=46+j*2.1+2*Math.sin(j*.8+stream);
        for(const offset of [-2.1,2.1]){
          const p=node(k,side,dist+offset,-.45);
          verts.push(p.x,p.y,p.z);
        }
        if(j<samples){const a=j*2;idx.push(a,a+2,a+1,a+1,a+2,a+3);}
      }
      const geo=new THREE.BufferGeometry();
      geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
      geo.setIndex(idx);geo.computeVertexNormals();
      const streamMesh=new THREE.Mesh(geo,streamWater);
      streamMesh.receiveShadow=true;world.add(streamMesh);
      // Small bankside stones with bounded polygon count.
      for(let j=0;j<6;j++){
        const k=(center+j*7)%N;
        const stone=new THREE.Mesh(bankGeo,streamStone);
        stone.position.copy(node(k,side,46+j*4.5+(j%2?3:-3),-.1));
        stone.scale.set(1.5+j%3,.7,1+j%2);
        world.add(stone);
      }
    }

    // Lightweight humid mountain haze: camera-facing translucent wisps, NOT
    // true volumetric fog. No lights, render targets, textures or road collisions.
    // Inspired by the humid, forested Braulio Carrillo landscape documented by SINAC.
    const hazeCount=hi?16:6;
    const hazeCanvas=document.createElement('canvas');
    hazeCanvas.width=128;hazeCanvas.height=128;
    const hazeCtx=hazeCanvas.getContext('2d');
    if(hazeCtx){
      const grad=hazeCtx.createRadialGradient(64,64,8,64,64,63);
      grad.addColorStop(0,'rgba(224,237,228,0.24)');
      grad.addColorStop(.55,'rgba(219,235,227,0.12)');
      grad.addColorStop(1,'rgba(219,235,227,0)');
      hazeCtx.fillStyle=grad;hazeCtx.fillRect(0,0,128,128);
      const hazeTex=new THREE.CanvasTexture(hazeCanvas);
      const hazeMat=new THREE.SpriteMaterial({map:hazeTex,transparent:true,
        depthWrite:false,opacity:.7,fog:true});
      for(let j=0;j<hazeCount;j++){
        const k=Math.floor(N*(j+.45)/hazeCount);
        const side=j%2?1:-1;
        const sprite=new THREE.Sprite(hazeMat);
        sprite.position.copy(node(k,side,42+12*Math.abs(Math.sin(j*3.2)),8+5*Math.sin(j*.8)));
        sprite.scale.set(35+12*(j%3),12+5*(j%2),1);
        sprite.renderOrder=1;
        world.add(sprite);
      }
    }

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
  // Generic mangrove-inspired grove for Route 34 coastal environments.
  // The circuit is fictional: these are not surveyed tree positions.
  function coastalMangroves(){
    const count=hi?80:28,root=new THREE.InstancedMesh(new THREE.CylinderGeometry(.2,.3,4.5,5),mats.bark,count);
    const crown=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(3.3,1),mats.foliage,count);
    const o=new THREE.Object3D();
    for(let j=0;j<count;j++){
      const k=Math.floor(N*(.37+.24*(j+.5)/count)),p=node(k,1,56+24*Math.abs(Math.sin(j*5.7)),-.2);
      o.rotation.set(0,j*2.4,0);o.scale.setScalar(.8+.3*Math.abs(Math.sin(j*1.9)));
      o.position.copy(p).add(new THREE.Vector3(0,2.2,0));o.updateMatrix();root.setMatrixAt(j,o.matrix);
      o.position.copy(p).add(new THREE.Vector3(0,5.8,0));o.scale.multiplyScalar(1.6);o.updateMatrix();crown.setMatrixAt(j,o.matrix);
    }
    world.add(root,crown);
  }
  } else if(id==='costanera'){
    coastalMangroves();
    // Coastal foothills beyond the drivable ribbon. Two instanced meshes,
    // quality-scaled and without collision or additional dynamic lights.
    // Artistic placement: these are not surveyed landmarks.
    const coastalHills=hi?42:quality==='media'?24:12;
    const coastalRock=new THREE.MeshStandardMaterial({color:0x537b58,roughness:.91,metalness:0,flatShading:true});
    // More silhouette facets only on capable devices; no external textures.
    const coastalHillGeo=new THREE.IcosahedronGeometry(1,hi?2:1);
    const coastalHillMesh=new THREE.InstancedMesh(coastalHillGeo,coastalRock,coastalHills);
    const hillDummy=new THREE.Object3D();
    for(let j=0;j<coastalHills;j++){
      const k=Math.floor(N*(j+.5)/coastalHills);
      // Keep the sea-facing shore sectors clear; hills sit inland.
      const side=k<N*.35?-1:k>N*.67?1:(j%2?1:-1);
      const dist=115+25*Math.abs(Math.sin(j*2.17));
      const h=13+15*Math.abs(Math.sin(j*1.31));
      hillDummy.position.copy(node(k,side,dist,h*.24));
      hillDummy.rotation.set(0,j*.77,0);
      hillDummy.scale.set(23+8*Math.abs(Math.cos(j)),h,19+6*Math.abs(Math.sin(j)));
      hillDummy.updateMatrix();coastalHillMesh.setMatrixAt(j,hillDummy.matrix);
      // Deterministic tonal variation gives the coastal relief depth without
      // extra meshes, textures, lights or draw calls (instanceColor attribute).
      const shade=0.78+0.18*Math.abs(Math.sin(j*1.73));
      coastalHillMesh.setColorAt(j,new THREE.Color().setRGB(shade,shade,shade));
    }
    // Commit all transforms before frustum culling. The hills are spread
    // along a long coastal route; their bounds must include every instance.
    coastalHillMesh.instanceMatrix.needsUpdate=true;
    coastalHillMesh.computeBoundingSphere();
    coastalHillMesh.receiveShadow=true;
    coastalHillMesh.castShadow=false;
    world.add(coastalHillMesh);
    // A distant, cooler ridge creates depth and a recognizable coastal
    // mountain skyline from the driving camera. Instancing keeps draw calls
    // fixed; the ridge is scenery only, with no collision or dynamic lights.
    const distantCount=hi?18:quality==='media'?10:5;
    const distantMaterial=new THREE.MeshStandardMaterial({
      color:0x718b83,roughness:1,metalness:0,flatShading:true
    });
    const distantGeo=new THREE.IcosahedronGeometry(1,1);
    const distantRidge=new THREE.InstancedMesh(distantGeo,distantMaterial,distantCount);
    const ridgeDummy=new THREE.Object3D();
    for(let j=0;j<distantCount;j++){
      const k=Math.floor(N*(j+.42)/distantCount);
      const side=k<N*.35?-1:k>N*.67?1:(j%2?1:-1);
      const height=28+15*Math.abs(Math.sin(j*1.43));
      ridgeDummy.position.copy(node(k,side,175+25*Math.abs(Math.sin(j*1.91)),height*.22));
      ridgeDummy.rotation.set(0,j*.63,0);
      ridgeDummy.scale.set(35+12*Math.abs(Math.cos(j)),height,27+8*Math.abs(Math.sin(j)));
      ridgeDummy.updateMatrix();
      distantRidge.setMatrixAt(j,ridgeDummy.matrix);
      const tint=.82+.16*Math.abs(Math.sin(j*1.37));
      distantRidge.setColorAt(j,new THREE.Color().setRGB(tint,tint,tint));
    }
    distantRidge.instanceMatrix.needsUpdate=true;
    distantRidge.computeBoundingSphere();
    distantRidge.castShadow=false;
    distantRidge.receiveShadow=false;
    world.add(distantRidge);
    // Roadside delineators inspired by RN34 reflective safety markings (MOPT).
    // Purely decorative, outside the drivable corridor; no collision changes.
    const markerCount=hi?48:quality==='media'?24:12;
    const markerGeo=new THREE.BoxGeometry(.28,1.15,.20);
    const markerMat=new THREE.MeshStandardMaterial({color:0xe9e8d8,roughness:.7,metalness:0});
    const markerReflectorMat=new THREE.MeshBasicMaterial({color:0xffd88a});
    const markers=new THREE.InstancedMesh(markerGeo,markerMat,markerCount);
    const reflectors=new THREE.InstancedMesh(new THREE.BoxGeometry(.3,.23,.23),markerReflectorMat,markerCount);
    const markerDummy=new THREE.Object3D();
    for(let j=0;j<markerCount;j++){
      const k=Math.floor(N*(j+.5)/markerCount);
      const side=j%2?1:-1;
      markerDummy.position.copy(node(k,side,29,.62));
      markerDummy.rotation.set(0,Math.atan2(tangents[k].x,tangents[k].z),0);
      markerDummy.scale.set(1,1,1);markerDummy.updateMatrix();
      markers.setMatrixAt(j,markerDummy.matrix);
      markerDummy.position.y+=.32;markerDummy.updateMatrix();
      reflectors.setMatrixAt(j,markerDummy.matrix);
    }
    for(const mesh of [markers,reflectors]){
      mesh.instanceMatrix.needsUpdate=true;
      mesh.computeBoundingSphere();
      mesh.castShadow=false;mesh.receiveShadow=false;
      world.add(mesh);
    }
    // Small coastal rock outcrops beyond the road edge, using one instanced
    // PBR mesh. These are artistic roadside cues, not surveyed positions.
    const outcropCount=hi?28:quality==='media'?16:8;
    const outcropGeo=new THREE.DodecahedronGeometry(1,0);
    const outcropMat=new THREE.MeshStandardMaterial({color:0x77786a,roughness:.96,metalness:0,flatShading:true});
    const outcrops=new THREE.InstancedMesh(outcropGeo,outcropMat,outcropCount);
    const outcropDummy=new THREE.Object3D();
    for(let j=0;j<outcropCount;j++){
      const k=Math.floor(N*(j+.35)/outcropCount);
      // Place outcrops inland, at least 55 units from track centre.
      const side=k<N*.35?-1:k>N*.67?1:(j%2?1:-1);
      outcropDummy.position.copy(node(k,side,55+10*Math.abs(Math.sin(j*2.3)),.15));
      outcropDummy.rotation.set(.12*j,j*.71,.09*j);
      outcropDummy.scale.set(2.2+1.3*Math.abs(Math.sin(j)),1.2+.8*Math.abs(Math.cos(j)),1.7+.7*Math.abs(Math.sin(j*.8)));
      outcropDummy.updateMatrix();
      outcrops.setMatrixAt(j,outcropDummy.matrix);
    }
    outcrops.instanceMatrix.needsUpdate=true;
    outcrops.computeBoundingSphere();
    outcrops.castShadow=false;
    outcrops.receiveShadow=false;
    world.add(outcrops);
    // Offshore rocky islets reinforce the Pacific coast silhouette from the
    // driving camera. Deterministic, original instanced geometry; no colliders.
    const isletCount=hi?12:quality==='media'?7:4;
    const isletGeo=new THREE.IcosahedronGeometry(1,1);
    const isletMat=new THREE.MeshStandardMaterial({color:0x646f67,roughness:.97,metalness:0,flatShading:true});
    const islets=new THREE.InstancedMesh(isletGeo,isletMat,isletCount);
    const isletDummy=new THREE.Object3D();
    for(let j=0;j<isletCount;j++){
      const first=j<Math.ceil(isletCount*.55);
      const k=Math.floor(N*(first?.05+.25*(j+.5)/Math.ceil(isletCount*.55):.71+.24*(j-Math.ceil(isletCount*.55)+.5)/Math.max(1,isletCount-Math.ceil(isletCount*.55))));
      const side=first?1:-1;
      isletDummy.position.copy(node(k,side,110+22*Math.abs(Math.sin(j*1.9)),2.1));
      isletDummy.rotation.set(.08*j,j*.71,.05*j);
      isletDummy.scale.set(7+4*Math.abs(Math.sin(j)),3.2+2.4*Math.abs(Math.cos(j)),9+4*Math.abs(Math.sin(j*.7)));
      isletDummy.updateMatrix();
      islets.setMatrixAt(j,isletDummy.matrix);
    }
    islets.instanceMatrix.needsUpdate=true;
    islets.computeBoundingSphere();
    islets.castShadow=false;islets.receiveShadow=false;
    world.add(islets);
    // Subtle foam collars around the offshore islets, visible from the road.
    // Original instanced geometry, no textures, lighting, physics or colliders.
    const foamGeo=new THREE.TorusGeometry(1,.075,4,hi?28:16);
    const foamMat=new THREE.MeshBasicMaterial({color:0xb6dedc,transparent:true,opacity:.55,depthWrite:false,side:THREE.DoubleSide});
    const foamRings=new THREE.InstancedMesh(foamGeo,foamMat,isletCount);
    const foamDummy=new THREE.Object3D();
    for(let j=0;j<isletCount;j++){
      const first=j<Math.ceil(isletCount*.55);
      const k=Math.floor(N*(first?.05+.25*(j+.5)/Math.ceil(isletCount*.55):.71+.24*(j-Math.ceil(isletCount*.55)+.5)/Math.max(1,isletCount-Math.ceil(isletCount*.55))));
      foamDummy.position.copy(node(k,first?1:-1,110+22*Math.abs(Math.sin(j*1.9)),.34));
      foamDummy.rotation.set(-Math.PI/2,0,0);
      foamDummy.scale.set(9+4*Math.abs(Math.sin(j)),11+4*Math.abs(Math.sin(j*.7)),1);
      foamDummy.updateMatrix();
      foamRings.setMatrixAt(j,foamDummy.matrix);
    }
    foamRings.instanceMatrix.needsUpdate=true;
    foamRings.computeBoundingSphere();
    foamRings.castShadow=false;foamRings.receiveShadow=false;
    world.add(foamRings);
    // Coastal lookout pavilion: a recognizable shaded roadside viewpoint,
    // deliberately well outside the drivable corridor. Original lightweight
    // geometry and shared PBR materials; no collider or imported asset.
    const lookoutK=Math.floor(N*.58);
    const lookoutPos=node(lookoutK,-1,68,0);
    const lookout=new THREE.Group();
    lookout.position.copy(lookoutPos);
    lookout.rotation.y=Math.atan2(tangents[lookoutK].x,tangents[lookoutK].z);
    const shelterRoof=new THREE.Mesh(
      new THREE.ConeGeometry(5.8,2.2,4),
      new THREE.MeshStandardMaterial({color:0x9b6144,roughness:.88,metalness:0,flatShading:true})
    );
    shelterRoof.rotation.y=Math.PI/4;
    shelterRoof.position.y=4.9;
    shelterRoof.castShadow=hi;
    lookout.add(shelterRoof);
    const shelterPosts=new THREE.InstancedMesh(
      new THREE.CylinderGeometry(.19,.24,4.1,6),
      new THREE.MeshStandardMaterial({color:0xd5c8ac,roughness:.83,metalness:0}),
      4
    );
    const shelterPostDummy=new THREE.Object3D();
    for(let j=0;j<4;j++){
      shelterPostDummy.position.set(j%2?3.25:-3.25,2.05,j<2?-3.25:3.25);
      shelterPostDummy.updateMatrix();
      shelterPosts.setMatrixAt(j,shelterPostDummy.matrix);
    }
    shelterPosts.instanceMatrix.needsUpdate=true;
    shelterPosts.computeBoundingSphere();
    shelterPosts.castShadow=hi;
    lookout.add(shelterPosts);
    const lookoutDeck=new THREE.Mesh(
      new THREE.BoxGeometry(8.5,.24,8.5),
      new THREE.MeshStandardMaterial({color:0x9d9784,roughness:.92,metalness:0})
    );
    lookoutDeck.position.y=.12;
    lookoutDeck.receiveShadow=true;
    lookout.add(lookoutDeck);
    world.add(lookout);
    // Destination names are real; their positions on this arcade loop are illustrative.
    sign('DOMINICAL · UVITA',Math.floor(N*.25),-1,24);
    sign('RUTA 34 · HACIA PALMAR NORTE',Math.floor(N*.73),1,24);
    palms(hi?190:85,0,Math.floor(N*.48),1,31);
    palms(hi?140:65,Math.floor(N*.49),N,-1,32);
    roadShore(0,Math.floor(N*.35),1,28,100);
    roadShore(Math.floor(N*.67),N,-1,32,115);
    sign('RUTA 34 · COSTANERA',Math.floor(N*.10),-1,20);
    sign('COSTA PACIFICA',Math.floor(N*.55),1,20);
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
    // ICT documents kiosks, recreation spaces and beachfront lodging on the
    // Paseo. These are original, stylized meshes, not copies of named buildings.
    const coastalGlass=new THREE.MeshPhysicalMaterial({color:0x88b4bd,roughness:.27,metalness:.04,clearcoat:.24});
    const shade=new THREE.MeshStandardMaterial({color:0xe6d7b6,roughness:.92});
    for(let j=0;j<(hi?12:6);j++){
      const k=Math.floor(N*(.05+(j+.4)*.85/(hi?12:6)));
      const hotel=new THREE.Group(),height=9+(j%3)*3;
      hotel.add(cube(12,height,8,shade,0,height/2,0));
      for(let floor=0;floor<Math.floor(height/3);floor++){
        for(const x of [-3.5,0,3.5])hotel.add(cube(2.1,1.6,.1,coastalGlass,x,2+floor*3,4.06));
      }
      hotel.add(cube(13,.55,9,mats.roof,0,height+.25,0));
      place(hotel,k,-1,55+3*(j%3));
    }
    // Small resting areas remain outside the road and have no collision.
    for(let j=0;j<(hi?18:8);j++){
      const k=Math.floor(N*(j+.35)/(hi?18:8));
      const bench=new THREE.Group();
      bench.add(cube(2.8,.2,.75,mats.bark,0,1.1,0));
      bench.add(cube(2.8,1,.18,mats.bark,0,1.6,-.35));
      for(const x of [-1.1,1.1])bench.add(cube(.18,1.05,.65,mats.black,x,.53,0));
      place(bench,k,1,23,.2);
    }
    // Continuous shaded promenade: original canvas awnings above the existing
    // seafront kiosks. Instanced roofs create a recognizable streetscape at
    // driving speed without extra lights, collisions or per-kiosk draw calls.
    {
      const awningCount=hi?36:18;
      const awningMat=new THREE.MeshStandardMaterial({
        color:0xf1d8a7,roughness:.91,metalness:0,side:THREE.DoubleSide
      });
      const awnings=new THREE.InstancedMesh(
        new THREE.BoxGeometry(5.8,.13,3.5),awningMat,awningCount);
      const awningDummy=new THREE.Object3D();
      for(let j=0;j<awningCount;j++){
        const kioskIndex=hi?j:j*2;
        const i=Math.floor(N*(kioskIndex+.4)/36);
        const p=points[Math.max(0,Math.min(N-1,i))];
        const tangent=tangents[Math.max(0,Math.min(N-1,i))];
        const normal=normals[Math.max(0,Math.min(N-1,i))];
        awningDummy.position.set(
          p.x-normal.x*31,p.y+5.1,p.z-normal.z*31);
        awningDummy.rotation.set(0,-Math.atan2(tangent.z,tangent.x),0);
        awningDummy.scale.set(1,1,1);
        awningDummy.updateMatrix();
        awnings.setMatrixAt(j,awningDummy.matrix);
      }
      awnings.instanceMatrix.needsUpdate=true;
      awnings.computeBoundingSphere();
      awnings.castShadow=false;
      awnings.receiveShadow=false;
      world.add(awnings);
    }
    sign('PASEO DE LOS TURISTAS',Math.floor(N*.06),-1,20);
    sign('PUNTARENAS',Math.floor(N*.50),-1,20);
    sign('EL FARO · LA PUNTA',Math.floor(N*.16),-1,22);
    sign('MUELLE DE CRUCEROS',Math.floor(N*.70),-1,22);
    // Original stylized pier: a recognizable coastal landmark, not a surveyed
    // reconstruction. Keep it beyond the roadside wall and out of collisions.
    // Reuse shared materials and instance the pilings to limit draw calls.
    {
      const pier=new THREE.Group();
      const wood=new THREE.MeshStandardMaterial({color:0x92765a,roughness:.94});
      const steel=new THREE.MeshStandardMaterial({color:0x6c777b,metalness:.35,roughness:.68});
      const length=hi?58:42;
      const deck=new THREE.Mesh(new THREE.BoxGeometry(length,.65,7),wood);
      deck.position.set(length/2,2.8,0);deck.receiveShadow=true;pier.add(deck);
      const count=hi?18:12;
      const posts=new THREE.InstancedMesh(new THREE.CylinderGeometry(.32,.4,6,6),steel,count);
      const d=new THREE.Object3D();
      for(let j=0;j<count;j++){
        const side=j%2?-2.9:2.9;
        d.position.set(4+(length-8)*Math.floor(j/2)/Math.max(1,count/2-1),.15,side);
        d.rotation.set(0,0,0);d.scale.set(1,1,1);d.updateMatrix();
        posts.setMatrixAt(j,d.matrix);
      }
      posts.instanceMatrix.needsUpdate=true;
      posts.computeBoundingSphere();
      posts.castShadow=false;
      pier.add(posts);
      // Both pier handrails share one geometry/material and one instanced draw.
      const rails=new THREE.InstancedMesh(new THREE.BoxGeometry(length,.15,.12),steel,2);
      for(let j=0;j<2;j++){
        d.position.set(length/2,4.05,j===0?-3.3:3.3);
        d.rotation.set(0,0,0);d.scale.set(1,1,1);d.updateMatrix();
        rails.setMatrixAt(j,d.matrix);
      }
      rails.instanceMatrix.needsUpdate=true;
      rails.computeBoundingSphere();
      rails.castShadow=false;
      pier.add(rails);
      // Recognizable terminal canopy at the landward end of the pier: a broad
      // raised roof and slender supports. Original geometry, no texture assets,
      // dynamic lighting or collision bodies. Keep the roof outside the road.
      const canopyRoof=new THREE.Mesh(
        new THREE.BoxGeometry(12,.28,8.5),
        new THREE.MeshStandardMaterial({color:0xc9d6d8,metalness:.36,roughness:.55}));
      canopyRoof.position.set(9,8.25,0);
      canopyRoof.receiveShadow=false;
      canopyRoof.castShadow=false;
      pier.add(canopyRoof);
      // Readable terminal silhouette from the road: two contrasting fascia
      // bands and a shallow canopy lip, all original static PBR geometry.
      // No textures, lights, collision objects or borrowed signage.
      const fasciaMat=new THREE.MeshStandardMaterial({
        color:0x235c73,metalness:.18,roughness:.56
      });
      const fascia=new THREE.InstancedMesh(
        new THREE.BoxGeometry(11.7,.38,.14),fasciaMat,2);
      for(let j=0;j<2;j++){
        d.position.set(9,8.02,j===0?-4.31:4.31);
        d.rotation.set(0,0,0);d.scale.set(1,1,1);d.updateMatrix();
        fascia.setMatrixAt(j,d.matrix);
      }
      fascia.instanceMatrix.needsUpdate=true;
      fascia.computeBoundingSphere();
      fascia.castShadow=false;
      pier.add(fascia);
      const canopyPillars=new THREE.InstancedMesh(
        new THREE.CylinderGeometry(.11,.13,5.0,6),steel,4);
      for(let j=0;j<4;j++){
        d.position.set(j<2?4.2:13.8,5.61,j%2?-3.2:3.2);
        d.rotation.set(0,0,0);d.scale.set(1,1,1);d.updateMatrix();
        canopyPillars.setMatrixAt(j,d.matrix);
      }
      canopyPillars.instanceMatrix.needsUpdate=true;
      canopyPillars.computeBoundingSphere();
      canopyPillars.castShadow=false;
      pier.add(canopyPillars);
      // Stylized mooring bollards: INCOP documents mooring fittings at the
      // cruise terminal. Four low-poly fixtures share one draw call.
      // Decorative only; positions and scale are not surveyed.
      const bollardGeo=new THREE.CylinderGeometry(.28,.36,.75,8);
      const bollards=new THREE.InstancedMesh(bollardGeo,steel,4);
      const bollardDummy=new THREE.Object3D();
      for(let j=0;j<4;j++){
        bollardDummy.position.set(length*(j<2?.24:.78),3.55,j%2?-2.4:2.4);
        bollardDummy.rotation.set(0,0,0);
        bollardDummy.scale.set(1,1,1);
        bollardDummy.updateMatrix();
        bollards.setMatrixAt(j,bollardDummy.matrix);
      }
      bollards.instanceMatrix.needsUpdate=true;
      bollards.computeBoundingSphere();
      bollards.castShadow=false;
      pier.add(bollards);
      // Pier safety beacons add a legible silhouette at dusk without
      // dynamic lights or per-object draw calls. Decorative only.
      const beaconCount=hi?6:4;
      const beaconPosts=new THREE.InstancedMesh(
        new THREE.CylinderGeometry(.065,.085,1.35,6),
        steel,beaconCount);
      const beaconLamps=new THREE.InstancedMesh(
        new THREE.SphereGeometry(.19,8,6),
        new THREE.MeshBasicMaterial({color:0xffd5a0}),beaconCount);
      for(let j=0;j<beaconCount;j++){
        const along=4+(length-8)*Math.floor(j/2)/Math.max(1,Math.ceil(beaconCount/2)-1);
        const across=j%2?-3.18:3.18;
        d.position.set(along,4.75,across);
        d.rotation.set(0,0,0);d.scale.set(1,1,1);d.updateMatrix();
        beaconPosts.setMatrixAt(j,d.matrix);
        d.position.y=5.49;d.updateMatrix();
        beaconLamps.setMatrixAt(j,d.matrix);
      }
      for(const mesh of [beaconPosts,beaconLamps]){
        mesh.instanceMatrix.needsUpdate=true;
        mesh.computeBoundingSphere();
        mesh.castShadow=false;
        pier.add(mesh);
      }
      // Two low-poly safety ladders at the seaward end of the pier.
      // Original geometry, decorative only; no collider or dynamic light.
      const ladderRails=new THREE.InstancedMesh(
        new THREE.CylinderGeometry(.045,.045,2.8,6),steel,4);
      const ladderRungs=new THREE.InstancedMesh(
        new THREE.CylinderGeometry(.038,.038,.78,6),steel,hi?12:8);
      for(let j=0;j<4;j++){
        d.position.set(length-1.4,2.65,j<2?-3.52:3.52);
        d.position.x+=(j%2?-.37:.37);
        d.rotation.set(0,0,0);d.scale.set(1,1,1);d.updateMatrix();
        ladderRails.setMatrixAt(j,d.matrix);
      }
      const rungSteps=hi?6:4;
      for(let j=0;j<2*rungSteps;j++){
        const side=j<rungSteps?-3.52:3.52;
        d.position.set(length-1.4,1.45+(j%rungSteps)*(.42*(6/rungSteps)),side);
        d.rotation.set(0,0,Math.PI/2);d.scale.set(1,1,1);d.updateMatrix();
        ladderRungs.setMatrixAt(j,d.matrix);
      }
      for(const mesh of [ladderRails,ladderRungs]){
        mesh.instanceMatrix.needsUpdate=true;
        mesh.computeBoundingSphere();
        mesh.castShadow=false;
        pier.add(mesh);
      }
      // The promenade is a fictional racing circuit, so the pier position
      // is approximate; its roadway clearance must be checked in WebGL.
      place(pier,Math.floor(N*.70),1,36,-.1);
    }
    // Original low-poly coastal seabirds (pelican-like silhouettes), kept well
    // beyond the driving corridor. Shared geometry and instancing for mobile.
    {
      const birdCount=hi?12:5;
      const wingGeo=new THREE.ConeGeometry(1.65,5.4,3);
      const wingMat=new THREE.MeshStandardMaterial({color:0xd7d0bd,roughness:.92,side:THREE.DoubleSide});
      const left=new THREE.InstancedMesh(wingGeo,wingMat,birdCount);
      const right=new THREE.InstancedMesh(wingGeo,wingMat,birdCount);
      const dummy=new THREE.Object3D();
      for(let j=0;j<birdCount;j++){
        const k=Math.floor(N*(j+.45)/birdCount);
        const center=node(k,1,62+9*Math.sin(j*2.7)**2,12+5*Math.sin(j*1.8)**2);
        const yaw=Math.atan2(tangents[k].x,tangents[k].z);
        for(const [mesh,side] of [[left,-1],[right,1]]){
          dummy.position.copy(center);
          dummy.position.x+=side*1.2*Math.cos(yaw);
          dummy.position.z-=side*1.2*Math.sin(yaw);
          dummy.rotation.set(0,yaw,side*(Math.PI/2.9));
          dummy.scale.setScalar(.72+.14*(j%3));
          dummy.updateMatrix();mesh.setMatrixAt(j,dummy.matrix);
        }
      }
      for(const mesh of [left,right]){
        mesh.instanceMatrix.needsUpdate=true;
        mesh.computeBoundingSphere();
        mesh.castShadow=false;
        world.add(mesh);
      }
    }
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
    // ICT confirms kiosks, local Churchill refreshments and recreational areas
    // along the promenade. Locations below are artistic, not surveyed positions.
    sign('CHURCHILL Y ARTESANIAS',Math.floor(N*.32),-1,24);
    sign('PARQUE Y DEPORTES',Math.floor(N*.88),-1,24);
    // A lightweight original recreation court beyond the urban roadside.
    // No physics changes, licensed textures or new runtime dependencies.
    const court=new THREE.Group();
    const courtMat=new THREE.MeshStandardMaterial({color:0x648b83,roughness:.88,side:THREE.DoubleSide});
    const lineMat=new THREE.MeshBasicMaterial({color:0xf1e9d5,side:THREE.DoubleSide});
    const surface=new THREE.Mesh(new THREE.PlaneGeometry(19,31),courtMat);
    surface.rotation.x=-Math.PI/2;surface.position.y=.05;surface.receiveShadow=true;court.add(surface);
    for(const x of [-9.1,9.1]){
      const stripe=new THREE.Mesh(new THREE.PlaneGeometry(.17,30),lineMat);
      stripe.rotation.x=-Math.PI/2;stripe.position.set(x,.075,0);court.add(stripe);
    }
    for(const z of [-15,15]){
      const stripe=new THREE.Mesh(new THREE.PlaneGeometry(18.3,.17),lineMat);
      stripe.rotation.x=-Math.PI/2;stripe.position.set(0,.075,z);court.add(stripe);
    }
    const midline=new THREE.Mesh(new THREE.PlaneGeometry(18.3,.15),lineMat);
    midline.rotation.x=-Math.PI/2;midline.position.y=.078;court.add(midline);
    const ring=new THREE.Mesh(new THREE.RingGeometry(2.9,3.05,32),lineMat);
    ring.rotation.x=-Math.PI/2;ring.position.y=.08;court.add(ring);
    place(court,Math.floor(N*.88),-1,76,.2);

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
    wall.instanceMatrix.needsUpdate=true;
    wall.computeBoundingSphere();
    wall.castShadow=false;
    world.add(wall);
  }
}
