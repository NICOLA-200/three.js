import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
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

// Create geometries and materials
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = -3;
scene.add(torus);

const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 2);
const icosahedronMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
icosahedron.position.x = 3;
scene.add(icosahedron);

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

const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.z = 3;
scene.add(box);

const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.y = -3;
scene.add(cone);

// Set up raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;
let offset = new THREE.Vector3();
let intersectPoint = new THREE.Vector3();

// Handle mouse down event to select object
window.addEventListener('mousedown', (event) => {
    // Convert mouse coordinates to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update raycaster with camera and mouse position
    raycaster.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        // Calculate offset between mouse position and object position
        intersectPoint.copy(intersects[0].point);
        offset.copy(intersectPoint).sub(selectedObject.position);
    }
});

// Handle mouse move event to drag object
window.addEventListener('mousemove', (event) => {
    if (selectedObject) {
        // Convert mouse coordinates to normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update raycaster with camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Check for intersection with the plane at the same height as the selected object
        const intersects = raycaster.intersectObject(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersectPoint);
        if (intersects.length > 0) {
            const newIntersectPoint = intersects[0].point;
            selectedObject.position.copy(newIntersectPoint.sub(offset));
        }
    }
});

// Handle mouse up event to release object
window.addEventListener('mouseup', () => {
    selectedObject = null;
});

// Handle window resize
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
