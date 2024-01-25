import { canvas } from "@/components/MainScene";
import { UP, ZERO } from "@/constants";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
export const controls = new OrbitControls(camera, canvas);
// controls.touches.ONE = THREE.TOUCH.PAN;
// controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
camera.position.copy(UP);
camera.lookAt(ZERO);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
