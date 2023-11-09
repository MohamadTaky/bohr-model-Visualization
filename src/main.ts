import camera from "@/components/MainCamera";
import { renderer, scene } from "@/components/MainScene";
import { deltaTime, tick } from "@/components/Time";
import "@/style.css";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import atoms from "@/atoms";
import getParticle, { Electron } from "./components/ParticleFactory";

const up = new THREE.Vector3(0, 1, 0);
const shellDistance = [3, 6, 9];
const shellResloution = 100;
const currentAtom = atoms[0];

const hydrogen = {
	name: "Hydrogen",
	atomic_mass: 1.008,
	atomic_number: 1,
	symbol: "H",
	electron_configuration: "1s1",
};

const carbon = {
	name: "Carbon",
	atomic_mass: 12.011,
	atomic_number: 6,
	symbol: "C",
	electron_configuration: "1s2 2s2 2p2",
};

const nitrogen = {
	name: "Nitrogen",
	atomic_mass: 14.007,
	atomic_number: 7,
	electron_configuration: "1s2 2s2 2p3",
};

const current = hydrogen;

const shells: Electron[][] = [];
const electrons: number[] = [];

const configurationSegments = current.electron_configuration.split(" ");
for (let i = 0; i < configurationSegments.length; i++) {
	const shellIdx = +configurationSegments[i][0] - 1;
	const electronsCount = +configurationSegments[i][2];
	if (electrons[shellIdx]) electrons[shellIdx] += electronsCount;
	else electrons[shellIdx] = electronsCount;
}

for (let i = 0; i < electrons.length; i++) {
	for (let j = 0; j < electrons[i]; j++) {
		const electron = getParticle("electron");
		electron.userData.dir
			.set(1, 0, 0)
			.applyAxisAngle(up, degToRad((360 / electrons[i]) * j))
			.multiplyScalar(shellDistance[i]);
		electron.position.copy(electron.userData.dir);
		if (shells[i]) shells[i].push(electron);
		else shells[i] = [electron];
		scene.add(electron);
	}

	const points = [];
	for (let j = 0; j < shellResloution; j++) {
		points.push(
			new THREE.Vector3(1, 0, 0)
				.applyAxisAngle(up, degToRad((360 / shellResloution) * j))
				.multiplyScalar(shellDistance[i])
		);
	}
	const geomentry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineBasicMaterial();
	const mesh = new THREE.LineLoop(geomentry, material);
	scene.add(mesh);
}

for (let i = 0; i < currentAtom.nucleus.length; i++) scene.add(currentAtom.nucleus[i]);

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
