import * as THREE from 'three';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// console.log(cubeMesh);
// console.log(scene);

// Here the cubeMesh is not the child of scene as you did not explicitly specify that this is an obj(mesh) present in scene.
// Why do we need to explicitly specify as all the objects will ofcourse be a part of scene?
// Actually in three.js you might have multiple scenes, so you need to specify that obj1 is a part of scene1....

scene.add(cubeMesh);
console.log(scene);

// Now the scene will have children => cubeMesh
// Now to look at the scene we need a camera.

// Initialize the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 30); //fov, aspect ratio, near point, far point
// now both mesh and camera are in (0,0,0) position, it is very hard to see the mesh which is inside camera using camera, so we move the camera outwards to see the object.
camera.position.z = 5;
// scene.add(camera);
// Not only the objects that are added to the scene but also camera can be added to scene for ex: put camera to a car so that you can only be able to see the car's pov, providing a different user experience.

// Initialize the renderer
const canvas = document.querySelector('canvas.threejs');
// const renderer = new THREE.WebGLRenderer({ canvas: canvas }); 
const renderer = new THREE.WebGLRenderer({ canvas }); //both are same
// Without setSize() the renderer don't know the size of the canvas to be rendered.
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);