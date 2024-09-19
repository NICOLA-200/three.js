import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = innerWidth;
const h = innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Orbit controls with damping enabled
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// New Torus geometry
const geometry = new THREE.TorusGeometry(1, 0.6, 16, 100);

// MeshPhysicalMaterial for more advanced rendering
// const material = new THREE.MeshPhysicalMaterial({
//     color: 0xff5733,
//     roughness: 0.5,
//     clearcoat: 0.5,
//     reflectivity: 0.8
// });
// const material = new THREE.MeshBasicMaterial({ color: 0xff5733 });

// const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

const material = new THREE.MeshStandardMaterial({ color: 0x00   0000, roughness: 0.5, metalness: 0.5 });



const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Hemisphere light
const hemiLight = new THREE.HemisphereLight(0x000000, 0xffffff);
scene.add(hemiLight);

// Directional light for better lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Handle window resize for responsive camera
window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;

    // Update the controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

animate();
