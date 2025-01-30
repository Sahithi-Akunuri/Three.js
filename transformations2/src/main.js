import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const rectangleGeometry = new THREE.BoxGeometry(512, 0, 512); 
const edges = new THREE.EdgesGeometry(rectangleGeometry); 
const lineMaterial = new THREE.LineBasicMaterial({ color: 'blue' }); 
const rectangleWireframe = new THREE.LineSegments(edges, lineMaterial);

rectangleWireframe.position.set(256, 0, 256);
scene.add(rectangleWireframe);

const boardHeight = 0.24242424242424246;
const boardGeometry = new THREE.BoxGeometry(180, boardHeight, 209);
const boardMaterial = new THREE.MeshBasicMaterial({ color: 'green', side: THREE.DoubleSide })
const board = new THREE.Mesh(boardGeometry, boardMaterial);
scene.add(board);

board.position.set(90+279, 0, 104.5+146);
board.userData.ground = true;

const pointLight1 = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight1.position.set(5, 10, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight2.position.set(-5, 10, -5);
scene.add(pointLight2);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const chip11_Height = 0.5242424242424242;
const chip11_Geometry = new THREE.BoxGeometry(38, chip11_Height, 29);
const chip11_Material = new THREE.MeshBasicMaterial({ color: 'red', side: THREE.DoubleSide })
const chip11 = new THREE.Mesh(chip11_Geometry, chip11_Material);
scene.add(chip11);

chip11.position.set(19+326, 0, 14.5+159);
chip11.position.y = (boardHeight+chip11_Height)/2;

chip11.userData.draggable = true;
chip11.userData.name = 'chip11';

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100000);
camera.position.set(256, 500, 500); // Adjust the camera position
// camera.lookAt(250, 0, 250); // Make the camera look at the center of the scene
// camera.lookAt(256,0,256);
// const distance = (0.24242424242424246 / 2) / Math.tan(THREE.MathUtils.degToRad(100 / 2));
// camera.position.set(0, distance, distance * 1.5);

const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(256, 0, 256); 

const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
const moveMouse = new THREE.Vector2();
let draggable = new THREE.Object3D(); //last selected obj to drag

window.addEventListener('click', event => {
  if (draggable) {
    console.log(`Dropping draggable ${draggable.userData.name}`);
    draggable = null;
    return;
  }

  clickMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	clickMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( clickMouse, camera );

	const found = raycaster.intersectObjects( scene.children );
  if (found.length > 0 && found[0].object.userData.draggable) {
    draggable = found[0].object;
    console.log(`Found Draggable ${draggable.userData.name}`);
  }
});

window.addEventListener('move', event => {
  moveMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	moveMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
})

function dragObject() {
  if (draggable != null) {
    raycaster.setFromCamera(moveMouse, camera);
    const found = raycaster.intersectObjects(scene.children);

    if (found.length > 0) {
      for (let o of found) {
        if (!o.object.userData.ground) {
          continue;
        }
        draggable.position.x = o.point.x;
        draggable.position.z = o.point.z;
      }
    }
  }
}


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
  dragObject();
};
renderloop();