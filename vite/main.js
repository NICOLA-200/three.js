import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

console.log("something happened")
const canvas = document.getElementById('canvas')
// scene
const  scene  =  new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0')


//  camera

const camera = new THREE.PerspectiveCamera(75, window.innerHeight /  window.innerWidth , 0.1 , 1000)
camera.position.z= 5;

// object

const geometry =  new THREE.RingGeometry();
const material  =  new  THREE.MeshBasicMaterial({color: '#339977'})
const item =  new THREE.Mesh(geometry, material);

const boxGeo =   new THREE.BoxGeometry(2, 0.1 , 3);
const boxMateria = new THREE.MeshBasicMaterial({color: "#aafdcd"})
const  box =  new THREE.Mesh(boxGeo, boxMateria)
box.position.y = -1.5;



scene.add(item)
scene.add(box)

const light =  new THREE.SpotLight(0x006769,100)
light.position.set(1,1,1);
scene.add(light)


//renderer

const renderer  =  new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


// add OrbitControl

const  controls = new  OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor  =  0.05
controls.enableZoom = true;
controls.enablePan = true;



// add animation

function animate() {
  requestAnimationFrame(animate);

   
  box.rotateY += 0.005
  
  item.rotateX += 0.01
  item.rotateY += 0.01 
  


  controls.update()
  renderer.render(scene, camera);


}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  
})

animate()