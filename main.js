import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-7,2,8); // Initial camera position

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0 ); // Set background color to white
renderer.shadowMap.enabled = true; // Enable shadow map


renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild( renderer.domElement );

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var light = new THREE.PointLight(0xffffff, 5);
light.position.set(-3, 4, 4);
light.intensity = 250;
light.castShadow = true;
light.shadowDarkness = 5;
light.shadow.mapSize.width = 2048; // Default is 512
light.shadow.mapSize.height = 2048; // Default is 512
renderer.shadowMap.needsUpdate = true; // Important: Tell the renderer to update the shadow map

scene.add(light);

const loader = new GLTFLoader();
loader.load(
  '/3DObject/Rumah Tongkonan.glb',
  (gltf) => {
    
    // Move the loaded object
    gltf.scene.position.set(0, 0, 0); // Adjust these values as needed
    gltf.scene.castShadow = true; 
    gltf.scene.receiveShadow = true; 

    gltf.scene.traverse(function(node){
      if(node.isMesh)
          node.castShadow = true;
          node.receiveShadow = true;
    });

    scene.add(gltf.scene); 
  },
  // ... (progress and error handlers)
);

// Add OrbitControls
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(2,3,2);

function animate() {
  requestAnimationFrame( animate );
  controls.update(); 
  renderer.render( scene, camera );
}

animate();