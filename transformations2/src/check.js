import * as THREE from 'three';
// // Initialize Scene, Camera, and Renderer
// const scene = new THREE.Scene();
// const camera = new THREE.OrthographicCamera(-256, 256, 256, -256, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Set camera position
// camera.position.set(0, 0, 500);
// camera.lookAt(0, 0, 0);

// // Create the 512x512 board
// const boardGeometry = new THREE.PlaneGeometry(512, 512);
// const boardMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
// const board = new THREE.Mesh(boardGeometry, boardMaterial);
// scene.add(board);

// // Draw grid lines for the board (optional for better visuals)
// // const gridHelper = new THREE.GridHelper(512, 32, 0x000000, 0x000000);
// // gridHelper.rotation.x = Math.PI / 2; // Rotate grid to align with the board
// // scene.add(gridHelper);

// // Create a rectangle
// const rectangleWidth = 100;
// const rectangleHeight = 50;
// const rectGeometry = new THREE.PlaneGeometry(rectangleWidth, rectangleHeight);
// const rectMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const rectangle = new THREE.Mesh(rectGeometry, rectMaterial);

// // Position the rectangle randomly within the board boundaries
// const halfBoardSize = 256; // Half of 512 (board size)
// const randomX = Math.random() * (512 - rectangleWidth) - halfBoardSize + rectangleWidth / 2;
// const randomY = Math.random() * (512 - rectangleHeight) - halfBoardSize + rectangleHeight / 2;
// rectangle.position.set(randomX, randomY, 0);

// // Add the rectangle to the scene
// scene.add(rectangle);

// // Render the scene
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();



// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(0, 512, 512, 0, -1, 1);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(512, 512);
document.body.appendChild(renderer.domElement);

// Function to create a rectangle from coordinates
function createRectangle(x1, y1, x2, y2, color) {
    const width = x2 - x1;
    const height = y2 - y1;
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x1 + width / 2, 512 - (y1 + height / 2), 0); // Adjust y-axis for Three.js coordinates
    return mesh;
}

// JSON data for the parts
const jsonData = [
    {
        Part_ID: "Background1",
        Part_Type: "Background",
        x1: 0,
        y1: 0,
        x2: 510,
        y2: 511,
        Shape: "Block"
    },
    {
        Part_ID: "Board2",
        Part_Type: "Board",
        x1: 10,
        y1: 375,
        x2: 301,
        y2: 509,
        Shape: "Block"
    },
    {
        Part_ID: "BGA3",
        Part_Type: "BGA",
        x1: 178,
        y1: 376,
        x2: 186,
        y2: 377,
        Shape: "Block"
    }
];

// Add parts to the scene
jsonData.forEach((part) => {
    let color;
    switch (part.Part_Type) {
        case "Background":
            color = 0x0000ff; // Blue for background
            break;
        case "Board":
            color = 0x00ff00; // Green for board
            break;
        case "BGA":
            color = 0xff0000; // Red for BGA
            break;
        default:
            color = 0xffffff; // Default white
    }
    const rect = createRectangle(part.x1, part.y1, part.x2, part.y2, color);
    scene.add(rect);
});

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
