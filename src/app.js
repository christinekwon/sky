/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, AudioListener } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MainScene } from 'scenes';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as Dat from 'dat.gui';

import * as THREE from 'three';

// Initialize core ThreeJS components

const scene = new MainScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
renderer.toneMapping = THREE.ReinhardToneMapping;

// scene.add(new THREE.AmbientLight(0x404040));

// const pointLight = new THREE.PointLight(0xffffff, 1);
// camera.add(pointLight);



// Set up camera
// camera.position.set(10, 50, -100);
// camera.position.set(0, 150, 200);
// camera.position.set(0, 300, 0);
camera.position.set(0, 0, 300);
camera.lookAt(new Vector3(0, 100, 0));

const params = {
    exposure: 0.5,
    bloomStrength: 1.0,
    bloomThreshold: 0,
    bloomRadius: 0.5
};
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
var composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Set up renderer, canvas, and minor CSS adjustments

const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// const gui = new Dat.GUI();

// gui.add(params, 'exposure', 0.1, 2).onChange(function(value) {

//     renderer.toneMappingExposure = Number(value);

// });

renderer.toneMappingExposure = 0.5;
bloomPass.threshold = 0;
bloomPass.strength = 0.8;
bloomPass.radius = 0.7;
// gui.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function(value) {

//     bloomPass.threshold = Number(value);

// });

// gui.add(params, 'bloomStrength', 0.0, 3.0).onChange(function(value) {

//     bloomPass.strength = Number(value);

// });

// gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function(value) {

//     bloomPass.radius = Number(value);

// });

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 1000;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {

    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);

    composer.render();
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);