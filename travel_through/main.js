import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import spline from './spline.js';
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
  const time = t * 0.1;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

scene.add(tube);

// 3 create  and add a cube  object


// 4  add lighting
const light  =  new THREE.HemisphereLight(0x9CDBA6, 0x444444);

light.position.set(1,3,5);
scene.add(light);


const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);


// 5 set up  the renderer
const renderer =  new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilemicPoneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera , renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// 6. Animate the scene

function animate(t = 0) {
    requestAnimationFrame(animate);
    updateCamera(t)

    controls.update()
    renderer.render(scene, camera); 
}

animate();



// import * as THREE from "three"
// // import { OrbitControls } from '/jsm/controls/OrbitControls.js'
// // import { OrbitControls} from 'three/addons/jsm/controls/OrbitControls.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';





