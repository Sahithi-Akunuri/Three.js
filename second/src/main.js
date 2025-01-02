import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// transforming position
// cubeMesh.position.z = -1;
// cubeMesh.position.y = 1; // we can actually move the cubeMesh using just the x,y,z properties of position property.
// But we can also manipulate using vector and copy properties.

// To use vector3 to set the position of the cubeMesh
// const tempVector = new THREE.Vector3(0, 1, 0);
// cubeMesh.position.copy(tempVector);

// console.log(cubeMesh); //to see the properties of cubeMesh
// cubeMesh.scale.x = 2;
// cubeMesh.scale.set(2,2,1); //this set() method can also be used to set the positions of x,y,z simultaneously.

// Adding axes to understand transformation
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Cameras - Perspective Camera(how we see the real world, if we take a look at the things around us they have depth and we can judge their distance, imagine looking a long road, it will appear to get narrower as it goes furthur into the distance due to perspective). 
// and Orthographic Camera(removes the sense of perspective)
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 200);
// const aspectRatio = window.innerWidth/window.innerHeight;
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,200)
camera.position.z = 5;
// To find the distance between cubeMesh and the camera
// console.log(cubeMesh.position.distanceTo(camera.position));

const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // Antialiasing - software solution
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);

// Antialiasing - hardware solution
// console.log(window.devicePixelRatio); //1.5
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

const renderloop = () => {
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // camera.aspectRatio = window.innerWidth/window.innerHeight;
  // // console.log(camera.aspectRatio); 
  // camera.updateProjectionMatrix();

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};
renderloop();



// Problem 1: When you resize the window size from half to full -> the entire area is not being used for rendering, 
// when resize from half to quarter -> not able to see the object.
// Cause: setting the size of the renderer only once at the time of opening the application, when the resize happens the renderer might not know.
// possible solution 1: refresh.
// possible solution 2: If you again set the size 2 times, the last size gets overwritten.
// best solution: call the set size method inside renderloop -> it sets the size every single frame.

// Problem 2: It is caused after we solve problem 1 using best solution -> size of the renderer gets changed/updated for every single frame but the size of the object gets shrinked/expanded.
// Cause: provided the aspect for the camera at the start of the application never updated it. start: 16:9 aspect ratio, when the window is resized(shrinked) 1:1, the camera stills thinks that we are trying to cover the same aspect ratio resulting in the squeezing in of the object.
// When the window size is stretched, the object size gets also stretched.
// possible solution 1: refresh.
// possible solution 2: update the aspect of the camera in the render loop.
// even after you update the aspect of camera which can be seen through logging, not able to see the expected result.
// solution: after change of parameters there is a mandatory function to be called "UpdateProjectionMatrix()". => gives always a full screen experience.

// Problem 3: Actually the size of the renderer and the aspect of the camera needs to be updated for every resize -> no need to update them for every change in frame -> redundant.
// possible solution 1: make use of event listeners.

// Problem 4: Staircase like edges on the side of the cube.