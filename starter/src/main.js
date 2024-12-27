import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 200); //fov, aspect ratio, near point, far point
// now both mesh and camera are in (0,0,0) position, it is very hard to see the mesh which is inside camera using camera, so we move the camera outwards to see the object.
camera.position.z = 5;
// scene.add(camera);
// Not only the objects that are added to the scene but also camera can be added to scene for ex: put camera to a car so that you can only be able to see the car's pov, providing a different user experience.

// Initialize the renderer
const canvas = document.querySelector('canvas.threejs');
// const renderer = new THREE.WebGLRenderer({ canvas: canvas }); 
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true}); //both are same, antialias: true -> smoother rotation, no lines at the edges while rotation.
// Without setSize() the renderer don't know the size of the canvas to be rendered.
renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.render(scene, camera); //commented here to render in the renderloop.


// Initialize the orbit controls // allow camera to orbit around a target.
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; //if set to true then do controls.update() in renderloop
// Damping: when you rotate the cube, to make it rotate for sometime rather than stop rotation when the cursor movement is stopped.
controls.autoRotate = true; //if set to true then do controls.update() in renderloop

const renderloop = () => {
    controls.update(); // done only when enableDampling and autoRotate are set to true.
    // any changes to be made to the scene, should be made before rendering, ex: change pose -> then click a photo.
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
    // Diff between actual loop and requestAnimationFrame() is that instead of automatically calling the loop as soon as your computer has the ability to do so, 
    // it tells to wait until the computer is able to produce the frame and then call renderloop again.
}
renderloop()

// Fov: It is the angle covered by the camera
// less fov -> lessangle -> less area covered -> can only see a part of the object.
// more fov -> moreangle -> more area covered -> can see the entire object.

// aspect-ratio: It is generally set to window width and height -> standard
// near: the part of the obj which is less distant than near point cannot be seen.
// far: the part of the obj which is more distant than far point cannot be seen.

// suppose the distance between obj and camera is '5' as you set the position of camera in z direction as '5' in above code.
// That means that the center of the camera is placed at 5 distance, but the camera is also a cube(1,1,1). so The camera will occupy from 4.5 to 5.5.
// So the near point should be set to 4.5 or less than 4.5 to see the object.

// Difference between Perspective camera and Orthographic camer is "PERSPECTIVE".
// Orthographic camera will not have perspective.
// What is Perspective? -> understand orbit controls

// Render loop is called once every frame.
// We can actually use loop, but it runs many times, your device will have a frame rate count(refresh rate).
// In order to have a smoother experience, try to match the call of render with the system's refresh rate.
// We can also use settime ans setinterval where you set count of call of render manually, but what if the system's refresh rate is 120 but you only render it 60 times, using only half of it.
// If your system can support 120fps then why not run it at the smoothest possible refresh rate -> to achive that we use RequestAnimationFrame() from window object from the browser.
// Window object is the global state for your web application holds many methods ex: SetInterval() and RequestAnimationFrame().

// RequestAnimationFrame() is a function which takes another function, tells the computer that right before you generate the next image, call this function.