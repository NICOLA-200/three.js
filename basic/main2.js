// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const w = innerWidth;
// const h = innerHeight;

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(w, h);
// document.body.appendChild(renderer.domElement);

// // Orbit controls with damping enabled
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;

// // New Torus geometry
// const geometry = new THREE.TorusGeometry(1, 0.6, 16, 100);

// // MeshPhysicalMaterial for more advanced rendering
// // const material = new THREE.MeshPhysicalMaterial({
// //     color: 0xff5733,
// //     roughness: 0.5,
// //     clearcoat: 0.5,
// //     reflectivity: 0.8
// // });
// // const material = new THREE.MeshBasicMaterial({ color: 0xff5733 });

// // const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

// const material = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.5, metalness: 0.9 });



// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// // Hemisphere light
// const hemiLight = new THREE.HemisphereLight(0x000000, 0xffffff);
// scene.add(hemiLight);

// // Directional light for better lighting
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// // Handle window resize for responsive camera
// window.addEventListener('resize', () => {
//     const w = window.innerWidth;
//     const h = window.innerHeight;
//     renderer.setSize(w, h);
//     camera.aspect = w / h;
//     camera.updateProjectionMatrix();
// });

// // Animate the scene
// function animate() {
//     requestAnimationFrame(animate);
    
//     // Rotate the torus
//     torus.rotation.x += 0.01;
//     torus.rotation.y += 0.02;

//     // Update the controls
//     controls.update();

//     // Render the scene
//     renderer.render(scene, camera);
// }

// animate();



import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = innerWidth;
const h = innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Adding HemisphereLight for basic ambient lighting
const hemiLight = new THREE.HemisphereLight(0x000000, 0xffffff, 0.6);
scene.add(hemiLight);

// Directional light for additional lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 1. Torus Geometry
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = -3;
scene.add(torus);

// 2. Icosahedron Geometry
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 2);
const icosahedronMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
icosahedron.position.x = 3;
scene.add(icosahedron);

// 3. Sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0000ff,
    roughness: 0.7,
    metalness: 0.3,
    reflectivity: 0.6
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.z = -3;
scene.add(sphere);

// 4. Box Geometry
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.z = 3;
scene.add(box);

// 5. Cone Geometry
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.y = -3;
scene.add(cone);

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate all objects slightly for visual interest
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;

    icosahedron.rotation.x += 0.01;
    icosahedron.rotation.y += 0.02;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.02;

    box.rotation.x += 0.01;
    box.rotation.y += 0.02;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.02;

    controls.update();  // Update orbit controls for smooth interaction

    renderer.render(scene, camera);
}

animate();
