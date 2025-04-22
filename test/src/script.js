import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Box } from "@mui/material";

const TwoCanvasRenderer = () => {
  const canvasWidth = 512, canvasHeight = 512;
  const mountRef1 = useRef(null);
  const mountRef2 = useRef(null);
  const sceneRef1 = useRef(new THREE.Scene());
  const sceneRef2 = useRef(new THREE.Scene());
  const cameraRef1 = useRef(new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000));
  const cameraRef2 = useRef(new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000));
  const rendererRef = useRef(new THREE.WebGLRenderer({ antialias: true }));
  const controlsRef1 = useRef(null);
  const controlsRef2 = useRef(null);

  const animate = useCallback(() => {
    controlsRef1.current.update();
    controlsRef2.current.update();
    rendererRef.current.render(sceneRef1.current, cameraRef1.current);
    rendererRef.current.render(sceneRef2.current, cameraRef2.current);
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const mount1 = mountRef1.current;
    const mount2 = mountRef2.current;
    const renderer = rendererRef.current;

    renderer.setSize(canvasWidth, canvasHeight);
    mount1.appendChild(renderer.domElement.cloneNode(true));
    mount2.appendChild(renderer.domElement.cloneNode(true));

    controlsRef1.current = new OrbitControls(cameraRef1.current, mount1.children[0]);
    controlsRef2.current = new OrbitControls(cameraRef2.current, mount2.children[0]);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube1 = new THREE.Mesh(geometry, material);
    const cube2 = new THREE.Mesh(geometry, material);

    sceneRef1.current.add(cube1);
    sceneRef2.current.add(cube2);

    cameraRef1.current.position.z = 5;
    cameraRef2.current.position.z = 5;

    animate();
  }, [animate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box ref={mountRef1} />
      <Box ref={mountRef2} />
    </Box>
  );
};

export default TwoCanvasRenderer;