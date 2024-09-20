import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import spline from './spline.js';

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';


// import getStarfield from "./getStarField.js"
// import { getFresnelMat } from './getFresnelMat.js';


const h = window.innerHeight;
const w  = window.innerWidth

// 1. create  a scene

const scene =  new THREE.Scene();
scene.fog  = new THREE.FogExp2(0x000000, 0.3)

// 2. Add the camera
const  camera =  new THREE.PerspectiveCamera(130, window.innerWidth  / window.innerHeight, 0.1, 500);
camera.position.z = 2;





//3. create and adda cube object 
// const  geometry = new THREE.BoxGeometry();
// const material =  new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' })


const points =  spline.getPoints(100)
const geometry =  new THREE.BufferGeometry().setFromPoints(points)
const  material = new THREE.LineBasicMaterial({color: 0xffffff})
const line = new THREE.Line(geometry, material)

const tubeGeo =  new THREE.TubeGeometry(spline, 222, 0.65 , 16 , true)
const  tubeMat =  new THREE.MeshBasicMaterial({
  color: 0x000000,
 

})

const tube = new THREE.Mesh(tubeGeo, tubeMat)

function updateCamera(t) {
  const time = t * 0.1;  // Scale down the time
  const looptime = 10 * 1000;  // Time for one loop (10 seconds)
  
  const p = (time % looptime) / looptime;  // Calculate position on the path (normalized 0 to 1)
  
  // Get the position at the point 'p' along the tube path
  const pos = tubeGeo.parameters.path.getPointAt(p);
  // Get the tangent (direction of the path) at the point 'p'
  const tangent = tubeGeo.parameters.path.getTangentAt(p).normalize();
  // Set the camera's position to the current position on the path
  camera.position.copy(pos);
  // Add the tangent to the current position to calculate where the camera should "look at"
  const lookAt = new THREE.Vector3().copy(pos).add(tangent);
  // Make the camera look in the direction of the tube (along the tangent)
  camera.lookAt(lookAt);
}


scene.add(tube);

// 3 create  and add a cube  object


// 4  add lighting
const light  =  new THREE.HemisphereLight(0x9CDBA6, 0x444444);

light.position.set(1,3,5);
scene.add(light);


const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);

const numBoxes = 55;
const size = 0.075;
const boxGeo = new THREE.BoxGeometry(size, size, size);
for (let i = 0; i < numBoxes; i += 1) {
  const boxMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  });
  const box = new THREE.Mesh(boxGeo, boxMat);
  const p = (i / numBoxes + Math.random() * 0.1) % 1;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  pos.x += Math.random() - 0.4;
  pos.z += Math.random() - 0.4;
  box.position.copy(pos);
  const rote = new THREE.Vector3(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  // box.rotation.set(rote.x, rote.y,rote.z)
  // scene.add(box)

  box.rotation.set(rote.x, rote.y, rote.z);
  const edges = new THREE.EdgesGeometry(boxGeo, 0.2);
  const color = new THREE.Color().setHSL(0.7 - p, 1, 0.5);
  const lineMat = new THREE.LineBasicMaterial({ color });
  const boxLines = new THREE.LineSegments(edges, lineMat);
  boxLines.position.copy(pos);
  boxLines.rotation.set(rote.x, rote.y, rote.z);
  // scene.add(box);
  scene.add(boxLines);
}


// 5 set up  the renderer
const renderer =  new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilemicPoneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const renderScene =  new RenderPass( scene, camera)
const bloomPass =  new UnrealBloomPass( new THREE.Vector2(w,h), 1.5, 0.8, 100)
bloomPass.threshold = 0.002
bloomPass.strength = 3.5
bloomPass.radius = 0;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);



const controls = new OrbitControls(camera , renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// 6. Animate the scene

function animate(t = 0) {
    requestAnimationFrame(animate);
    updateCamera(t)

    controls.update()
    composer.render(scene, camera); 
}

animate();



// import * as THREE from "three"
// // import { OrbitControls } from '/jsm/controls/OrbitControls.js'
// // import { OrbitControls} from 'three/addons/jsm/controls/OrbitControls.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';





