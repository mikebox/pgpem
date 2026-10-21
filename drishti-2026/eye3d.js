/* Drishti eye in WebGL: a bevelled red almond, a glossy eyeball that looks around,
   3D eyelids that blink, and the grey arcs as glass panels in front.
   Scene units are logo pixels (logo image is 520×567), origin at the iris centre, y up.
   The CSS logo stays underneath as the fallback and is hidden once this renders. */
(function(){
var host=document.querySelector('.lga');if(!host)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var probe=document.createElement('canvas');if(!(probe.getContext('webgl')||probe.getContext('experimental-webgl')))return;
function start(){if(window.THREE)init();else{var s=document.createElement('script');s.src='vendor/three.r128.min.js';s.onload=init;document.head.appendChild(s)}}
if('requestIdleCallback' in window)requestIdleCallback(start,{timeout:1200});else setTimeout(start,200);

var ALMOND=[170.6,-0,162.7,-8.5,154.6,-16.3,146.7,-23.2,139.7,-29.7,133.7,-35.8,128,-41.6,121.6,-46.7,116.7,-51.9,111.6,-56.9,106.7,-61.6,101.6,-66,97.2,-70.6,92.6,-75,87.7,-79,82.6,-82.6,77.7,-86.3,72.5,-89.5,67.2,-92.6,61.7,-94.9,56.3,-97.5,50.7,-99.5,45.7,-102.6,40.1,-104.6,34.3,-105.6,28.8,-107.5,23.1,-108.6,17.3,-109.5,11.6,-110.6,5.8,-110.5,0,-111.5,-5.8,-111.5,-11.6,-110.6,-17.5,-110.5,-23.3,-109.6,-29.1,-108.6,-34.6,-106.5,-40.3,-104.9,-45.7,-102.6,-51.3,-100.6,-56.9,-98.6,-62,-95.5,-67.2,-92.6,-72.2,-89.2,-77,-85.5,-82.2,-82.2,-87.2,-78.6,-91.2,-73.9,-95.8,-69.6,-100.2,-65.1,-104.9,-60.5,-109.2,-55.7,-113.6,-50.6,-118.8,-45.6,-124.2,-40.4,-129.2,-34.6,-134.5,-28.6,-141.2,-22.4,-147.3,-15.5,-154.3,-8.1,-162.3,-0,-160.3,8.4,-152.3,16,-144.2,22.8,-138.2,29.4,-131.3,35.2,-125.3,40.7,-120.2,46.2,-114.3,50.9,-109.2,55.7,-104.6,60.4,-100.2,65.1,-95.2,69.2,-90.6,73.4,-86.3,77.7,-82.2,82.2,-77.3,85.8,-72.4,89.4,-67.8,93.4,-62.6,96.4,-57.4,99.3,-52.2,102.4,-46.9,105.3,-41.2,107.4,-35.5,109.4,-29.8,111.4,-24.1,113.4,-18.1,114.4,-12.2,116.4,-6.1,116.3,-0,117.4,6.1,117.3,12.2,116.4,18.4,116.3,24.5,115.3,30.4,113.4,36.2,111.4,42,109.3,47.8,107.3,53.7,105.3,59.1,102.4,64.5,99.4,69.7,95.9,74.8,92.3,79.7,88.5,84.6,84.6,89.3,80.4,94.3,76.4,98.6,71.7,103.7,67.3,108.7,62.7,113.7,57.9,118.7,52.8,123.7,47.5,130.5,42.4,135.8,36.4,142.6,30.3,149.6,23.7,156.6,16.5,165.7,8.7];
var NAVY=0x0c3249,RED=0xc11720,CREAM='#fff1d6',SKY='#679cbc';
// iris centre in the logo image, and where the canvas sits relative to .lga (matches the CSS)
var CX=226.3,CY=169.4,IW=520,IH=567,BOX={l:-.15,t:-.08,w:1.3,h:.75},D=1600;
var HOLE=84,R=110,C=Math.sqrt(R*R-90*90);  // eyeball meets the face plane just under the bevel

function init(){
  var T=window.THREE;
  var cv=document.createElement('canvas');cv.className='l3d';cv.setAttribute('aria-hidden','true');host.appendChild(cv);
  var renderer;try{renderer=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true,premultipliedAlpha:true})}catch(e){cv.remove();return}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setClearColor(0x000000,0);

  var scene=new T.Scene();
  var x0=BOX.l*IW,x1=(BOX.l+BOX.w)*IW,y0=BOX.t*IH,y1=(BOX.t+BOX.h)*IH;
  var wcx=(x0+x1)/2-CX,wcy=-((y0+y1)/2-CY);
  var cam=new T.PerspectiveCamera(2*Math.atan((y1-y0)/2/D)*180/Math.PI,(x1-x0)/(y1-y0),10,4000);
  cam.position.set(wcx,wcy,D);cam.lookAt(wcx,wcy,0);

  scene.add(new T.HemisphereLight(0xffffff,0xd8c7a6,.42));
  var key=new T.DirectionalLight(0xffffff,.42);key.position.set(-.55,.8,1);scene.add(key);
  var rim=new T.DirectionalLight(0xffe6c4,.12);rim.position.set(.9,-.4,.5);scene.add(rim);
  var glint=new T.PointLight(0xffffff,.4,0,2);glint.position.set(-160,200,520);scene.add(glint);

  var head=new T.Group();scene.add(head);

  // almond: traced outline with a round hole, extruded and bevelled; front face sits at z=0
  var BS=6,BT=10,DEP=18;
  var sh=new T.Shape();
  for(var i=0;i<ALMOND.length;i+=2){var x=ALMOND[i],y=ALMOND[i+1],r=Math.hypot(x,y),k=(r-BS)/r;i?sh.lineTo(x*k,y*k):sh.moveTo(x*k,y*k)}
  sh.closePath();
  var hole=new T.Path();hole.absarc(0,0,HOLE+BS,0,Math.PI*2,true);sh.holes.push(hole);
  var redMat=new T.MeshPhysicalMaterial({color:RED,roughness:.42,clearcoat:.55,clearcoatRoughness:.3});
  var alm=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:DEP,bevelEnabled:true,bevelThickness:BT,bevelSize:BS,bevelSegments:6,curveSegments:64}),redMat);
  alm.position.z=-DEP-BT;head.add(alm);

  // eyeball: logo iris painted on the front, planar-mapped so it reads like the flat logo at rest
  function canvasTex(size,draw){var c=document.createElement('canvas');c.width=c.height=size;draw(c.getContext('2d'),size);var t=new T.CanvasTexture(c);t.anisotropy=4;return t}
  var SEG=[[0,48,CREAM],[48,90,SKY],[90,130,CREAM],[130,180,SKY],[180,219,CREAM],[219,268,SKY],[268,318.5,CREAM],[318.5,360,SKY]];
  var irisTex=canvasTex(1024,function(g,n){
    var s=n/2/R,c=n/2;g.fillStyle='#ead9b6';g.fillRect(0,0,n,n);
    var sc=g.createRadialGradient(c,c,HOLE*s,c,c,R*s);sc.addColorStop(0,'#f1e3c5');sc.addColorStop(1,'#d9c39a');g.fillStyle=sc;g.beginPath();g.arc(c,c,R*s,0,7);g.fill();
    SEG.forEach(function(q){g.fillStyle=q[2];g.beginPath();g.moveTo(c,c);g.arc(c,c,HOLE*s,(q[0]-90)*Math.PI/180,(q[1]-90)*Math.PI/180);g.closePath();g.fill()});
    // fine radial fibres and a soft limbal ring for a real-iris feel, kept light so the logo colours lead
    g.save();g.globalAlpha=.07;g.strokeStyle='#0c3249';g.lineWidth=1.2;
    for(var a=0;a<360;a+=2.2){var t=a*Math.PI/180,j=1+((a*37)%7)/40;g.beginPath();g.moveTo(c+Math.cos(t)*58*s,c+Math.sin(t)*58*s);g.lineTo(c+Math.cos(t)*HOLE*s*j*.97,c+Math.sin(t)*HOLE*s*j*.97);g.stroke()}
    g.restore();
    var lim=g.createRadialGradient(c,c,(HOLE-12)*s,c,c,HOLE*s);lim.addColorStop(0,'rgba(12,50,73,0)');lim.addColorStop(1,'rgba(12,50,73,.32)');
    g.fillStyle=lim;g.beginPath();g.arc(c,c,HOLE*s,0,7);g.fill();
    g.fillStyle='#0c3249';g.beginPath();g.arc(c,c,56.5*s,0,7);g.fill();
  });
  function planarUV(geo,half,map){var p=geo.attributes.position,uv=geo.attributes.uv;for(var i=0;i<p.count;i++){var v=map(p.getX(i),p.getY(i),p.getZ(i));uv.setXY(i,v[0]/(2*half)+.5,v[1]/(2*half)+.5)}uv.needsUpdate=true}
  var ballGeo=new T.SphereGeometry(R,96,64);ballGeo.rotateX(Math.PI/2);  // poles on z so the front is evenly tessellated
  planarUV(ballGeo,R,function(x,y){return[x,y]});
  var ballMat=new T.MeshPhysicalMaterial({map:irisTex,roughness:.38,clearcoat:1,clearcoatRoughness:.05});
  var eye=new T.Group();eye.position.z=-C;head.add(eye);
  eye.add(new T.Mesh(ballGeo,ballMat));

  // pupil: a cap just above the eyeball so the red wedge can sweep on its own
  var PR=56,capA=Math.asin(PR/(R+.8));
  var pupTex=canvasTex(512,function(g,n){var c=n/2,s=n/2/PR;g.fillStyle='#0c3249';g.beginPath();g.arc(c,c,PR*s,0,7);g.fill();
    g.fillStyle='#c11720';g.beginPath();g.moveTo(c,c);g.arc(c,c,PR*s*.985,(49-90)*Math.PI/180,(99-90)*Math.PI/180);g.closePath();g.fill();
    var sh2=g.createRadialGradient(c,c,PR*s*.55,c,c,PR*s);sh2.addColorStop(0,'rgba(0,0,0,0)');sh2.addColorStop(1,'rgba(0,0,0,.28)');g.fillStyle=sh2;g.beginPath();g.arc(c,c,PR*s,0,7);g.fill()});
  var capGeo=new T.SphereGeometry(R+.8,64,12,0,Math.PI*2,0,capA);capGeo.rotateX(Math.PI/2);
  planarUV(capGeo,PR,function(x,y){return[x,y]});
  var spin=new T.Group();eye.add(spin);
  spin.add(new T.Mesh(capGeo,new T.MeshPhysicalMaterial({map:pupTex,roughness:.3,clearcoat:1,clearcoatRoughness:.04})));

  // eyelids: half shells around the eyeball, tucked behind the face when open
  var LR=R+2.2,lidMat=new T.MeshPhysicalMaterial({color:RED,roughness:.48,clearcoat:.4,clearcoatRoughness:.35,side:T.DoubleSide});
  var lashMat=new T.MeshBasicMaterial({color:NAVY});
  function lid(top){var g=new T.Group();g.position.z=-C-1;
    var m=new T.Mesh(new T.SphereGeometry(LR,96,32,0,Math.PI*2,top?0:Math.PI/2,Math.PI/2),lidMat);g.add(m);
    var lash=new T.Mesh(new T.TorusGeometry(LR+.4,1.6,8,128),lashMat);lash.rotation.x=Math.PI/2;g.add(lash);
    head.add(g);return g}
  var lidT=lid(true),lidB=lid(false);

  // grey arcs: glass panels floating in front, scaled so they line up with the logo at rest
  var AZ=60,as=(D-AZ)/D;
  var arcMat=new T.MeshPhysicalMaterial({color:0x1e2536,transparent:true,opacity:.74,roughness:.18,clearcoat:1,clearcoatRoughness:.06,depthWrite:false});
  function arc(a0,a1){var s=new T.Shape(),r0=54.5,r1=145.4,t0=(90-a1)*Math.PI/180,t1=(90-a0)*Math.PI/180;
    s.absarc(0,0,r1,t0,t1,false);s.absarc(0,0,r0,t1,t0,true);s.closePath();
    return new T.Mesh(new T.ExtrudeGeometry(s,{depth:3,bevelEnabled:true,bevelThickness:1.2,bevelSize:1,bevelSegments:2,curveSegments:48}),arcMat)}
  var arcs=new T.Group();arcs.add(arc(318.5,360));arcs.add(arc(180,221));
  arcs.scale.set(as,as,1);arcs.position.set(wcx*(1-as),wcy*(1-as),AZ);arcs.renderOrder=2;head.add(arcs);

  // sizing
  function size(){var w=cv.clientWidth,h=cv.clientHeight;if(w&&h)renderer.setSize(w,h,false)}
  size();if('ResizeObserver' in window)new ResizeObserver(size).observe(cv);else addEventListener('resize',size);

  // pointer: where the eye should look (angles), with idle glances when the pointer is away
  var gaze={x:0,y:0},want={x:0,y:0},tilt={x:0,y:0},tiltWant={x:0,y:0},lastMove=-1e9,nextGlance=0;
  addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=cv.getBoundingClientRect(),
    ex=r.left+r.width*(CX-x0)/(x1-x0),ey=r.top+r.height*(CY-y0)/(y1-y0),dx=e.clientX-ex,dy=e.clientY-ey,d=Math.hypot(dx,dy),k=d/(d+220)/(d||1);
    want.x=dx*k*.26;want.y=dy*k*.2;tiltWant.x=dx*k*.14;tiltWant.y=dy*k*.1;lastMove=performance.now()},{passive:true});
  document.documentElement.addEventListener('pointerleave',function(){lastMove=-1e9});

  // blinking: random, sometimes double; the first one opens the eye
  var blinkAt=200,blinkT=-1,blinkLen=240,doubleNext=false,closed=1;
  function blinkCurve(t){if(t<.38)return t/.38;if(t<.5)return 1;return 1-(t-.5)/.5}
  var sweepAt=2500,SWEEP=1600,hold=null;
  var visible=true,t0=performance.now(),last=t0,shown=false;
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){visible=e[0].isIntersecting;if(visible)requestAnimationFrame(frame)}).observe(host);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)requestAnimationFrame(frame)});
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}

  function frame(now){
    if(!visible||document.hidden)return;
    var t=now-t0,dt=Math.min(.05,(now-last)/1000);last=now;
    // idle glances (saccades) when the mouse is not driving the eye
    if(now-lastMove>2200&&t>nextGlance){var c=Math.random()<.3;want.x=c?0:(Math.random()*2-1)*.2;want.y=c?0:(Math.random()*2-1)*.12;
      tiltWant.x=want.x*.3;tiltWant.y=want.y*.3;nextGlance=t+900+Math.random()*2600}
    // eyes jump fast and settle; the head follows slowly
    var kg=1-Math.exp(-dt*18),kt=1-Math.exp(-dt*3);
    gaze.x+=(want.x-gaze.x)*kg;gaze.y+=(want.y-gaze.y)*kg;tilt.x+=(tiltWant.x-tilt.x)*kt;tilt.y+=(tiltWant.y-tilt.y)*kt;
    eye.rotation.y=gaze.x;eye.rotation.x=gaze.y;
    var f=Math.sin(t/2600)*.035;head.rotation.y=tilt.x+f;head.rotation.x=tilt.y+Math.cos(t/3100)*.02;
    glint.position.x=-160-tilt.x*500;glint.position.y=200+tilt.y*400;
    // blink
    if(blinkT<0&&t>=blinkAt){blinkT=t;blinkLen=t<1000?520:200+Math.random()*80}
    if(blinkT>=0){var p=(t-blinkT)/blinkLen;if(blinkLen>400&&p<.5)p=.5;closed=p>=1?0:blinkCurve(p);
      if(p>=1){blinkT=-1;if(doubleNext){doubleNext=false;blinkAt=t+120}else{doubleNext=Math.random()<.22;blinkAt=t+2600+Math.random()*3800}}}
    else closed=0;
    if(hold!==null)closed=hold;var a=Math.PI/2*(1-closed);lidT.rotation.x=-a;lidB.rotation.x=a;
    // wedge sweep, like the logo's radar hand
    var sp=(t-sweepAt)/SWEEP;if(sp>=1){sweepAt+=11000;sp=0}spin.rotation.z=sp>0?-ease(sp)*Math.PI*2:0;
    renderer.render(scene,cam);
    if(!shown){shown=true;host.classList.add('gl')}
    requestAnimationFrame(frame);
  }
  host.__eye={blink:function(){blinkAt=performance.now()-t0},hold:function(k){hold=k}};
  requestAnimationFrame(frame);
}
})();
