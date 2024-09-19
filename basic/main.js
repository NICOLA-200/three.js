import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import getStarfield from "./getStarField.js"


// const h = window.innerHeight;
// const w  = window.innerWidth

// // 1. create  a scene

// const scene =  new THREE.Scene();


// // 2. Add the camera
// const  camera =  new THREE.PerspectiveCamera(130, window.innerWidth  / window.innerHeight, 0.1, 500);
// camera.position.z = 2;


// //3. create and adda cube object 
// // const  geometry = new THREE.BoxGeometry();
// // const material =  new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' })

// const   geometry = new THREE.IcosahedronGeometry(1,12)
// const material = new THREE.MeshStandardMaterial({
//     color: 0xffff00,
//     flatShading: true
// })

 

// // 3 create  and add a cube  object
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube);


// // 4  add lighting
// const light  =  new THREE.DirectionalLight(0x9CDBA6, 10);

// light.position.set(1,3,5);
// scene.add(light);



// // 5 set up  the renderer
// const renderer =  new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // 6. Animate the scene

// function animate() {
//     requestAnimationFrame(animate);
//     cube.rotation.x += 0.03;
//     cube.rotation.y += 0.02;


//     renderer.render(scene, camera); 
// }

// animate();



// import * as THREE from "three"
// // import { OrbitControls } from '/jsm/controls/OrbitControls.js'
// // import { OrbitControls} from 'three/addons/jsm/controls/OrbitControls.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = innerWidth
const h =  innerHeight



// rendering
const renderer = new THREE.WebGLRenderer({intialias: true});

renderer.setSize(w,h)

document.body.appendChild(renderer.domElement) 








//camera
const  camera =  new THREE.PerspectiveCamera(75, w / h, 1, 100)
camera.position.z =  3;





const controls = new OrbitControls(camera , renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// scene 
const scene =  new THREE.Scene()


// loader
const loader =  new THREE.TextureLoader();

//object

const goe = new THREE.IcosahedronGeometry(1, 12)
const mat = new THREE.MeshStandardMaterial({
    map: loader.load("./earthmap1k.jpg")

})  


const stars = getStarfield( {numStars: 2000})

scene.add(stars)
// const  material =  new THREE.MeshBasicMaterial({
//     color: 0x00ff00
// })

// const wireMat  =  new THREE.MeshBasicMaterial({
//     color: 0xfffddf,
//     wireframe:  true,
    
// })
// wireMat.scale.setScalar(1.001)

// const wireMesh =  new THREE.Mesh(goe, wireMat)

const earthMesh  =  new THREE.Mesh(goe, mat )
scene.add(earthMesh)



// light 

const light   =  new THREE.HemisphereLight(0x0099ff, 0xaa55ff)

scene.add(light)

// animate 

function animate() {
    requestAnimationFrame(animate)
    earthMesh.rotation.y +=0.001;
    
    renderer.render(scene, camera)

}

animate()
