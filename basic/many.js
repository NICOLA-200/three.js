import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Create geometries and materials for each shape

// Box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-10, 10, 0);
scene.add(box);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhysicalMaterial({ color: 0x0000ff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-5, 10, 0);
scene.add(sphere);

// Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(0, 10, 0);
scene.add(cylinder);

// Cone
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(5, 10, 0);
scene.add(cone);

// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(10, 10, 0);
scene.add(torus);

// Torus Knot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.4, 16, 100);
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500 });
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.set(-10, 5, 0);
scene.add(torusKnot);

// Icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 2);
const icosahedronMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
icosahedron.position.set(-5, 5, 0);
scene.add(icosahedron);

// Dodecahedron
const dodecahedronGeometry = new THREE.DodecahedronGeometry(1, 0);
const dodecahedronMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
dodecahedron.position.set(0, 5, 0);
scene.add(dodecahedron);

// Octahedron
const octahedronGeometry = new THREE.OctahedronGeometry(1, 0);
const octahedronMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
octahedron.position.set(5, 5, 0);
scene.add(octahedron);

// Polyhedron
const polyhedronVertices = [
    1, 1, 1,
    -1, 1, 1,
    -1, -1, 1,
    1, -1, 1,
    1, 1, -1,
    -1, 1, -1,
    -1, -1, -1,
    1, -1, -1
];
const polyhedronFaces = [
    0, 1, 2, 3,
    4, 5, 6, 7,
    0, 1, 5, 4,
    1, 2, 6, 5,
    2, 3, 7, 6,
    3, 0, 4, 7
];
const polyhedronGeometry = new THREE.PolyhedronGeometry(polyhedronVertices, polyhedronFaces, 1);
const polyhedronMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
const polyhedron = new THREE.Mesh(polyhedronGeometry, polyhedronMaterial);
polyhedron.position.set(-10, 0, 0);
scene.add(polyhedron);

// Plane
const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.set(0, 0, 0);
scene.add(plane);

// Circle
const circleGeometry = new THREE.CircleGeometry(1, 32);
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.set(5, 0, 0);
scene.add(circle);

// Ring
const ringGeometry = new THREE.RingGeometry(0.5, 1, 32);
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.position.set(10, 0, 0);
scene.add(ring);

// Lathe
const lathePoints = [
    new THREE.Vector2(0, 1),
    new THREE.Vector2(1, 0.5),
    new THREE.Vector2(0.5, 0),
    new THREE.Vector2(-0.5, 0),
    new THREE.Vector2(-1, 0.5),
    new THREE.Vector2(0, 1)
];
const latheGeometry = new THREE.LatheGeometry(lathePoints);
const latheMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const lathe = new THREE.Mesh(latheGeometry, latheMaterial);
lathe.position.set(-5, -5, 0);
scene.add(lathe);

// Extrude
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(1, 0);
shape.lineTo(1, 1);
shape.lineTo(0, 1);
shape.lineTo(0, 0);
const extrudeSettings = { depth: 1, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 1 };
const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const extrudeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const extrude = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrude.position.set(0, -5, 0);
scene.add(extrude);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate objects for visual interest
    box.rotation.y += 0.01;
    sphere.rotation.y += 0.01;
    cylinder.rotation.y += 0.01;
    cone.rotation.y += 0.01;
    torus.rotation.y += 0.01;
    torusKnot.rotation.y += 0.01;
    icosahedron.rotation.y += 0.01;
    dodecahedron.rotation.y += 0.01;
    octahedron.rotation.y += 0.01;
    polyhedron.rotation.y += 0.01;
    plane.rotation.y += 0.01;
    circle.rotation.y += 0.01;
    ring.rotation.y += 0.01;
    lathe.rotation.y += 0.01;
    extrude.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
}

animate();
