import * as atoms from "@/atoms.json";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import generateParticle from "./generateParticle";

const up = new THREE.Vector3(0, 1, 0);
const shellDistance = [3, 6, 9];
const shellResloution = 100;

export default function generateAtom(atom: keyof typeof atoms) {
	const lines = [];
	const shells = [];
	const electrons = [];

	const atomConfig = atoms[atom];
	const electronConfiguration = atomConfig.electron_configuration.split(" ");
	for (let i = 0; i < electronConfiguration.length; i++) {
		const segment = getSegmentConfig(electronConfiguration[i]);
		const shellIdx = segment.shell - 1;

		if (electrons[shellIdx]) electrons[shellIdx] += segment.electrons;
		else electrons[shellIdx] = segment.electrons;
	}

	for (let i = 0; i < electrons.length; i++) {
		for (let j = 0; j < electrons[i]; j++) {
			const electron = generateParticle("electron");
			electron.userData.dir
				.set(1, 0, 0)
				.applyAxisAngle(up, degToRad((360 / electrons[i]) * j))
				.multiplyScalar(shellDistance[i]);
			electron.position.copy(electron.userData.dir);
			if (shells[i]) shells[i].push(electron);
			else shells[i] = [electron];
		}

		const points = [];
		for (let j = 0; j < shellResloution; j++)
			points.push(
				new THREE.Vector3(1, 0, 0)
					.applyAxisAngle(up, degToRad((360 / shellResloution) * j))
					.multiplyScalar(shellDistance[i])
			);
		const geomentry = new THREE.BufferGeometry().setFromPoints(points);
		const material = new THREE.LineBasicMaterial();
		const mesh = new THREE.LineLoop(geomentry, material);
		lines.push(mesh);
	}

	return { lines, shells };
}

function getSegmentConfig(segment: string) {
	return {
		shell: +segment[0],
		subShell: segment[1],
		electrons: +segment[2],
	};
}
