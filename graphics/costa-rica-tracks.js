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
  function roadShore(start,end,side=1,offset=27,width=90){
    const pos=[],uv=[],idx=[],stride=Math.max(4,Math.floor((end-start)/190));
    for(let j=start;j<=end;j+=stride){
      for(const d of [offset,offset+width]){
        const p=node(j%N,side,d,-1.5);
        pos.push(p.x,p.y,p.z);uv.push(d/width,j/120);
      }
    }
    let rows=pos.length/6;for(let j=0;j<rows-1;j++){const a=j*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}
    if(rows<2)return;
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
    const shore=new THREE.Mesh(g,mats.aqua);shore.receiveShadow=true;world.add(shore);
  }
  function kiosk(i,side,dist,color=0xbca483){
    const g=new THREE.Group(),walls=new THREE.MeshStandardMaterial({color,roughness:.85});
    g.add(cube(5.6,3.2,4.3,walls,0,1.6,0));
    g.add(cube(6.6,.35,5.2,mats.roof,0,3.45,0));
    g.add(cube(4.5,1.4,.06,mats.black,0,1.8,2.18));
    const roofSign=cube(3.9,.4,.12,mats.curb,0,3,2.23);g.add(roofSign);
    place(g,i,side,dist);
  }

  if(id==='zurqui'){
    rainforestTrees(hi?240:95);
    sign('RUTA 32 · ZURQUI',Math.floor(N*.07),1,20);
    sign('BRAULIO CARRILLO',Math.floor(N*.46),-1,20);
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
