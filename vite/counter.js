import * as THREE from 'three'


const canvas = document.getElementById('canvas')
// scene
const  scene  =  new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0')


//  camera

const camera = new THREE.PerspectiveCamera(75, window.innerHeight /  window.innerWidth , 0.1 , 1000)
camera.getWorldPosition.z = 5;

// object

const geometry =  new THREE.RingGeometry();
const material  =  new  THREE.MeshDepthMaterial({color: '#339977',emissive: '#22ff44'})
const item =  new THREE.Mesh(geometry, material);

const boxGeo =   new THREE.BoxGeometry(2, 0.1 , 3);
const boxMateria = new THREE.MeshBasicMaterial({color: "#aafdcd", emissive: '#aafdcd'})
const  box =  new THREE.Mesh(boxGeo, boxMateria)
box.position.y = -1.5;



scene.add(item)
scene.add(box)

const light =  new THREE.SpotLight(0x006769,100)
light.position.set(1,1,1);
scene.add(light)


//renderer

const renderer  =  new THREE.WebGL3DRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);