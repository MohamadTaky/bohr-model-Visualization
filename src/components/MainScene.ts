import * as THREE from "three";

export const canvas = <HTMLCanvasElement>document.getElementById("canvas");

export const scene = new THREE.Scene();
const primaryLight = new THREE.HemisphereLight(0xfafafa, 0x737373, 4);
scene.add(primaryLight);

export const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
});
