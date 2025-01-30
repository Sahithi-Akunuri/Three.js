import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

const objects = [];

const scene = new THREE.Scene();

const boardGeometry = new THREE.BoxGeometry(20, 0.2, 20);
const boardMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
const board = new THREE.Mesh(boardGeometry, boardMaterial);
scene.add(board);

const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'red' })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1, 5);
scene.add(sphere);
objects.push(sphere);

const coneGeometry = new THREE.ConeGeometry(1, 1);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 'blue' })
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(5,0.6,1);
scene.add(cone);
objects.push(cone);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 500);
camera.position.set(0, 30, 25);

const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;

// const objects = { cone, sphere };
const dragControls = new DragControls( objects, camera, renderer.domElement );
dragControls.enabled = true;

dragControls.addEventListener( 'dragstart', () => {
    controls.enabled = false;
});

dragControls.addEventListener( 'dragend', () => {
    controls.enabled = true;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/window.innerHeight);
});

const renderloop = () => {
    controls.update();
    renderer.render( scene, camera );
    window.requestAnimationFrame(renderloop);
};
renderloop();