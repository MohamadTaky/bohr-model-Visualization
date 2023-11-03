import camera from "@/components/MainCamera";
import { renderer, scene } from "@/components/MainScene";
import getParticle from "@/components/ParticleFactory";
import { deltaTime, tick } from "@/components/Time";
import "@/style.css";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";

const up = new THREE.Vector3(0, 1, 0);
const shellDistance = [3, 6];
const spacing = [180, 60];
const offsets = [30, 0];
const shellResloution = 100;
const nucleus = [
	getParticle("proton", new THREE.Vector3(0, 0, 0)),
	getParticle("proton", new THREE.Vector3(0.5, 0, 0)),
	getParticle("proton", new THREE.Vector3(-0.5, 0, 0)),
	getParticle("proton", new THREE.Vector3(-0.25, 0, 0.5)),
	getParticle("proton", new THREE.Vector3(-0.5, 0.4, -0.25)),
	getParticle("proton", new THREE.Vector3(0.25, 0.4, 0.25)),
	getParticle("neutorn", new THREE.Vector3(0.25, 0, 0.5)),
	getParticle("neutorn", new THREE.Vector3(0.25, 0, -0.5)),
	getParticle("neutorn", new THREE.Vector3(-0.25, 0.4, 0.25)),
	getParticle("neutorn", new THREE.Vector3(0, 0.4, -0.25)),
	getParticle("neutorn", new THREE.Vector3(0.5, 0.4, -0.25)),
	getParticle("neutorn", new THREE.Vector3(-0.25, 0, -0.5)),
];
const shells = [
	[getParticle("electron"), getParticle("electron")],
	[
		getParticle("electron"),
		getParticle("electron"),
		getParticle("electron"),
		getParticle("electron"),
		getParticle("electron"),
		getParticle("electron"),
	],
];

for (let i = 0; i < shells.length; i++) {
	const points = [];
	const step = (2 * Math.PI) / shellResloution;
	for (let j = 0; j < shellResloution; j++)
		points.push(new THREE.Vector3(1, 0, 0).applyAxisAngle(up, step * j).multiplyScalar(shellDistance[i]));

	const shellGeomentry = new THREE.BufferGeometry().setFromPoints(points);
	const shellMaterial = new THREE.LineBasicMaterial({ color: 0xdddddd });
	const line = new THREE.LineLoop(shellGeomentry, shellMaterial);
	scene.add(line);

	for (let j = 0; j < shells[i].length; j++) {
		shells[i][j].userData.distance = shellDistance[i];
		shells[i][j].position.copy(
			shells[i][j].userData.dir
				.set(1, 0, 0)
				.applyAxisAngle(up, degToRad(offsets[i] + spacing[i] * j))
				.multiplyScalar(shells[i][j].userData.distance)
		);
		scene.add(shells[i][j]);
	}
}

for (let i = 0; i < nucleus.length; i++) scene.add(nucleus[i]);

function draw() {
	requestAnimationFrame(draw);
	tick();

	for (let i = 0; i < shells.length; i++)
		for (let j = 0; j < shells[i].length; j++) {
			shells[i][j].userData.dir.applyAxisAngle(up, degToRad(-10 * deltaTime));
			shells[i][j].position.copy(shells[i][j].userData.dir);
		}
	renderer.render(scene, camera);
}
draw();
