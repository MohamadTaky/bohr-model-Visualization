import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { canvas } from "@/components/MainScene";

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const controls = new OrbitControls(camera, canvas);
controls.minDistance = 2;
controls.maxDistance = 12;
camera.position.set(0, 9, 4);
camera.lookAt(0, 0, 0);
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

export default camera;
