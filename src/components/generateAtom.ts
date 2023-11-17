import * as atoms from "@/atoms.json";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import generateParticle from "./generateParticle";

const up = new THREE.Vector3(0, 1, 0);
const shellDistance = [3, 6, 9];

export default function generateAtom(atom: keyof typeof atoms) {
	const orbits = [];
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
		//#region electrons generation
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
		//#endregion

		const orbit = generateOrbit(shellDistance[i]);
		orbits.push(orbit);
	}

	return { orbits, shells };
}

function generateOrbit(distance: number, resloution = 100) {
	const points = [];
	for (let j = 0; j < resloution; j++)
		points.push(
			new THREE.Vector3(1, 0, 0)
				.applyAxisAngle(up, degToRad((360 / resloution) * j))
				.multiplyScalar(distance)
		);
	const geomentry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineBasicMaterial();
	return new THREE.LineLoop(geomentry, material);
}



function getSegmentConfig(segment: string) {
	return {
		shell: +segment[0],
		subShell: segment[1],
		electrons: +segment[2],
	};
}

export function generateNucleus(atom: keyof typeof atoms) {
	const atomConfig = atoms[atom];
	let t = 1;
	let k = 100;

	const zeroVector = new THREE.Vector3();
	const particles: THREE.Mesh[] = [];
	const l = 0.3;
	const repulsiveConstant = 1;
	const springConstant = 30;
	const coolDownFactor = 0.01;

	for (let i = 0; i < atomConfig.atomic_number; i++)
		particles.push(generateParticle("proton", new THREE.Vector3().randomDirection().multiplyScalar(5)));
	for (let i = 0; i < Math.floor(atomConfig.atomic_mass - atomConfig.atomic_number); i++)
		particles.push(generateParticle("neutorn", new THREE.Vector3().randomDirection().multiplyScalar(5)));

	while (t < k) {
		const forces = [];
		for (let i = 0; i < particles.length; i++) {
			const attractiveForce = new THREE.Vector3()
				.copy(particles[i].position)
				.negate()
				.multiplyScalar(springConstant * Math.log(particles[i].position.distanceTo(zeroVector) / l));

			for (let j = 0; j < particles.length; j++) {
				if (i === j) continue;
				const repulsiveForce = new THREE.Vector3()
					.subVectors(particles[i].position, particles[j].position)
					.multiplyScalar(repulsiveConstant / particles[i].position.distanceToSquared(particles[j].position));
				attractiveForce.add(repulsiveForce);
			}
			forces.push(attractiveForce);
		}
		console.log(forces);

		for (let i = 0; i < particles.length; i++)
			particles[i].position.add(forces[i].multiplyScalar(coolDownFactor));
		t++;
	}
	return particles;
}
