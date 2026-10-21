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

var ALMOND=[162.57,1.03,162.35,0.35,161.84,-0.53,160.62,-2,158.52,-4.15,155.93,-6.65,153.25,-9.22,150.63,-11.74,148.07,-14.18,145.59,-16.56,143.16,-18.89,140.8,-21.14,138.53,-23.33,136.32,-25.44,134.16,-27.51,132.04,-29.54,129.96,-31.56,127.95,-33.55,126.02,-35.45,124.1,-37.29,122.18,-39.11,120.28,-40.91,118.41,-42.69,116.56,-44.47,114.77,-46.25,113.04,-47.99,111.38,-49.67,109.73,-51.32,108.09,-52.95,106.49,-54.54,104.91,-56.06,103.3,-57.55,101.65,-59.04,100,-60.54,98.35,-62.04,96.71,-63.53,95.07,-65.04,93.48,-66.55,91.96,-67.99,90.47,-69.37,88.97,-70.69,87.46,-71.97,85.91,-73.23,84.32,-74.47,82.7,-75.72,81.08,-76.94,79.48,-78.12,77.87,-79.26,76.25,-80.38,74.61,-81.46,72.97,-82.51,71.31,-83.53,69.61,-84.53,67.9,-85.53,66.2,-86.5,64.51,-87.43,62.79,-88.34,61.05,-89.25,59.31,-90.14,57.59,-91.01,55.87,-91.84,54.12,-92.65,52.36,-93.46,50.63,-94.23,48.93,-94.96,47.2,-95.65,45.41,-96.33,43.61,-97.01,41.86,-97.65,40.12,-98.24,38.33,-98.82,36.51,-99.38,34.7,-99.92,32.92,-100.43,31.13,-100.91,29.3,-101.37,27.46,-101.81,25.63,-102.24,23.8,-102.64,21.97,-103.02,20.1,-103.39,18.21,-103.75,16.37,-104.1,14.59,-104.39,12.8,-104.65,10.92,-104.87,9,-105.11,7.12,-105.33,5.28,-105.52,3.41,-105.68,1.5,-105.83,-0.35,-105.96,-2.09,-106.04,-3.78,-106.04,-5.52,-105.96,-7.37,-105.83,-9.27,-105.68,-11.15,-105.51,-13,-105.32,-14.89,-105.1,-16.83,-104.86,-18.72,-104.63,-20.54,-104.38,-22.34,-104.08,-24.16,-103.74,-25.98,-103.37,-27.74,-102.97,-29.51,-102.51,-31.32,-102.01,-33.15,-101.48,-34.96,-100.94,-36.74,-100.37,-38.53,-99.77,-40.35,-99.14,-42.12,-98.5,-43.83,-97.85,-45.53,-97.14,-47.26,-96.39,-49,-95.61,-50.73,-94.8,-52.45,-93.97,-54.17,-93.12,-55.89,-92.25,-57.6,-91.36,-59.27,-90.46,-60.93,-89.53,-62.59,-88.57,-64.17,-87.62,-65.56,-86.71,-66.87,-85.7,-68.42,-84.42,-70.2,-83.05,-71.98,-81.81,-73.64,-80.65,-75.38,-79.44,-77.29,-78.2,-79.11,-77.13,-80.58,-76.19,-81.9,-75.18,-83.29,-74.01,-84.74,-72.72,-86.17,-71.39,-87.59,-70.02,-89.03,-68.6,-90.49,-67.14,-91.98,-65.65,-93.47,-64.16,-94.97,-62.67,-96.47,-61.16,-97.98,-59.65,-99.45,-58.15,-100.89,-56.65,-102.33,-55.1,-103.79,-53.49,-105.28,-51.85,-106.8,-50.19,-108.36,-48.49,-109.97,-46.76,-111.64,-45.02,-113.36,-43.27,-115.11,-41.53,-116.85,-39.81,-118.54,-38.09,-120.2,-36.35,-121.87,-34.54,-123.58,-32.65,-125.36,-30.68,-127.22,-28.67,-129.13,-26.66,-131.09,-24.61,-133.09,-22.51,-135.13,-20.36,-137.22,-18.18,-139.34,-15.96,-141.49,-13.7,-143.7,-11.38,-145.97,-9,-148.32,-6.54,-150.69,-4.04,-152.85,-1.72,-154.35,0.07,-155.07,1.18,-155.36,1.9,-155.48,2.6,-155.46,3.33,-155.3,4.03,-154.98,4.74,-154.32,5.69,-152.94,7.18,-150.83,9.23,-148.36,11.58,-145.84,13.95,-143.39,16.27,-141.02,18.51,-138.71,20.69,-136.47,22.8,-134.28,24.87,-132.13,26.9,-130,28.91,-127.9,30.9,-125.85,32.85,-123.86,34.74,-121.93,36.59,-120.05,38.38,-118.2,40.13,-116.38,41.84,-114.58,43.51,-112.81,45.15,-111.03,46.76,-109.24,48.39,-107.46,50.04,-105.74,51.7,-104.09,53.33,-102.52,54.9,-100.99,56.41,-99.47,57.87,-97.93,59.29,-96.36,60.72,-94.76,62.16,-93.17,63.6,-91.57,65.05,-89.97,66.53,-88.4,68.04,-86.89,69.54,-85.43,71.01,-83.99,72.45,-82.56,73.87,-81.16,75.26,-79.75,76.6,-78.33,77.91,-76.89,79.18,-75.46,80.41,-73.99,81.6,-72.47,82.77,-70.89,83.96,-69.31,85.13,-67.73,86.28,-66.13,87.41,-64.5,88.55,-62.88,89.67,-61.28,90.74,-59.67,91.79,-58.02,92.82,-56.38,93.82,-54.74,94.79,-53.09,95.71,-51.38,96.63,-49.63,97.55,-47.9,98.45,-46.19,99.3,-44.47,100.12,-42.7,100.93,-40.91,101.73,-39.13,102.5,-37.35,103.23,-35.56,103.93,-33.74,104.62,-31.89,105.29,-30.05,105.93,-28.24,106.54,-26.44,107.1,-24.61,107.61,-22.74,108.1,-20.85,108.57,-18.95,109,-17.05,109.41,-15.16,109.78,-13.28,110.11,-11.38,110.4,-9.43,110.66,-7.46,110.91,-5.5,111.13,-3.55,111.32,-1.58,111.48,0.41,111.63,2.34,111.75,4.17,111.81,5.97,111.78,7.83,111.68,9.74,111.53,11.65,111.34,13.56,111.1,15.53,110.81,17.53,110.51,19.53,110.2,21.48,109.88,23.39,109.53,25.28,109.15,27.15,108.72,29.03,108.24,30.9,107.73,32.75,107.18,34.59,106.59,36.49,105.94,38.4,105.28,40.27,104.62,42.1,103.94,43.93,103.21,45.76,102.46,47.57,101.69,49.33,100.89,51.08,100.05,52.85,99.17,54.62,98.25,56.36,97.32,58.09,96.36,59.82,95.37,61.54,94.35,63.24,93.32,64.92,92.27,66.59,91.18,68.25,90.07,69.9,88.93,71.54,87.78,73.16,86.6,74.78,85.39,76.4,84.15,78.01,82.9,79.59,81.65,81.13,80.38,82.7,79.05,84.29,77.68,85.86,76.34,87.38,74.99,88.9,73.59,90.46,72.15,92.01,70.7,93.54,69.26,95.07,67.78,96.68,66.23,98.34,64.67,100.02,63.13,101.69,61.61,103.36,60.09,105.04,58.56,106.68,57.03,108.3,55.48,109.94,53.87,111.62,52.21,113.33,50.52,115.11,48.77,116.98,46.99,118.92,45.21,120.84,43.48,122.73,41.74,124.63,39.95,126.56,38.11,128.49,36.24,130.47,34.29,132.54,32.26,134.7,30.2,136.91,28.11,139.16,25.97,141.47,23.79,143.83,21.55,146.25,19.26,148.73,16.91,151.27,14.5,153.89,12.02,156.54,9.52,158.99,7.17,160.84,5.28,161.87,4.03,162.33,3.21,162.56,2.5,162.64,1.76];  // traced outline: straight edges fitted at the tips, 10px fillets, inset by the bevel size
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
  for(var i=0;i<ALMOND.length;i+=2)i?sh.lineTo(ALMOND[i],ALMOND[i+1]):sh.moveTo(ALMOND[i],ALMOND[i+1]);
  sh.closePath();
  var hole=new T.Path();hole.absarc(0,0,HOLE+BS,0,Math.PI*2,true);sh.holes.push(hole);
  var redMat=new T.MeshPhysicalMaterial({color:RED,roughness:.42,clearcoat:.55,clearcoatRoughness:.3});
  var alm=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:DEP,bevelEnabled:true,bevelThickness:BT,bevelSize:BS,bevelSegments:8,curveSegments:64}),redMat);
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
