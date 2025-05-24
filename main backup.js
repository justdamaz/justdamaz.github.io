import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set (-7,-1.5,7); // Initial camera position

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff ); // Set background color to white
renderer.shadowMap.enabled = true; // Enable shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Choose shadow map type
document.body.appendChild( renderer.domElement );

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-5, 15, 15);
directionalLight.castShadow = true; // Make the light cast shadows
directionalLight.shadow.mapSize.width = 64; // Increase shadow map resolution
directionalLight.shadow.mapSize.height = 64; 

// Adjust shadow camera properties
directionalLight.shadow.camera.near = 10; 
directionalLight.shadow.camera.far = 150; 
const lightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 ); // Size of the helper object
scene.add( lightHelper );
scene.add(directionalLight);



const loader = new GLTFLoader();
loader.load(
    '/3DObject/Rumah Tongkonan.glb',
    (gltf) => {
        // Move the loaded object
        gltf.scene.position.set(0, -3, 0); // Adjust these values as needed
        gltf.scene.castShadow = true; // Make the loaded object cast shadows
        gltf.scene.receiveShadow = true; // Make the loaded object receive shadows
 
        scene.add(gltf.scene); 
    },
    // ... (progress and error handlers)
);

// Add OrbitControls
const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    
    requestAnimationFrame( animate );
    controls.update(); 
    renderer.render( scene, camera );
}

animate();