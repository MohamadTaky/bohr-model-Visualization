import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Body from "./classes/Body";

let time = 0;
let deltaTime = 0;

//#region initialization
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
//#endregion

//#region camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const controls = new OrbitControls(camera, canvas);
camera.position.set(0, 10, 3);
camera.lookAt(0, 0, 0);
//#endregion

//#region placeholder scene setup
const grid = new THREE.GridHelper();
const primaryLight = new THREE.HemisphereLight(0xffffff, 0xaaaaaa);
primaryLight.position.set(0, 2, 1);

const b1 = new Body(new THREE.Vector3(0, 0, 0), 0.5, 10000, new THREE.Vector3(0, 0, 0), new THREE.Vector3());
const b2 = new Body(new THREE.Vector3(3, 0, 0), 0.1, 1, new THREE.Vector3(0, 0, 50), new THREE.Vector3());
const b3 = new Body(new THREE.Vector3(-3, 0, 0), 0.1, 1, new THREE.Vector3(0, 0, -50), new THREE.Vector3());

Body.bodies.forEach(body => scene.add(body));
scene.add(grid);
scene.add(primaryLight);
//#endregion

//#region render loop
function draw() {
	requestAnimationFrame(draw);
	deltaTime = performance.now() * 0.001 - time;
	time = performance.now() * 0.001;

	Body.bodies.forEach(body => body.updateVelocity());
	Body.bodies.forEach(body => body.updatePosition());
	renderer.render(scene, camera);
}
draw();
//#endregion render loop
