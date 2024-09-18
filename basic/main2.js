import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = innerWidth
const h =  innerHeight

const scene =  new THREE.Scene()

const camera =  new THREE.PerspectiveCamera(75,  w / h ,0.1, 1000)

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer()
renderer.setSize(w , h )




document.body.appendChild(renderer.domElement)

const geometry =  new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0xfff
})

const cube  = new THREE.Mesh(geometry, material)

scene.add(cube)

const hemiLight  =  new THREE.HemisphereLight(0x000, 0xfff)

scene.add(hemiLight)

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.02
    renderer.render(scene, camera )
}

animate()

