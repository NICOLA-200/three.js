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

// Create and add different types of lights
// 1. Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040);  // Soft white light that affects all objects
scene.add(ambientLight);

// 2. Point Light
const pointLight = new THREE.PointLight(0xff0000, 1, 100);  // Red light source at a single point
pointLight.position.set(-5, 5, 5);
scene.add(pointLight);

// 3. Spot Light
const spotLight = new THREE.SpotLight(0x00ff00, 1, 100, Math.PI / 4);  // Green spotlight with cone
spotLight.position.set(5, 5, 5);
spotLight.castShadow = true;  // Enables shadows
scene.add(spotLight);

// 4. Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);  // White sunlight-like light
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 5. Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);  // Blue sky and green ground
scene.add(hemisphereLight);

// Create various geometries and materials
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const box = new THREE.Mesh(geometry, material);
box.position.set(-3, 0, 0);
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0000ff,
    roughness: 0.7,
    metalness: 0.3
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(3, 0, 0);
scene.add(sphere);

const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 3, 0);
scene.add(torus);

const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(0, -3, 0);
scene.add(cone);

// Animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate all objects
    box.rotation.x += 0.01;
    box.rotation.y += 0.02;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.02;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.02;

    controls.update();  // Update orbit controls for smooth interaction

    renderer.render(scene, camera);
}

animate();
