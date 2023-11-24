import * as atoms from "@/atoms.json";
import * as THREE from "three";
import generateParticle, { Particle } from "@/utils/generateParticle";

export default function generateNucleus(atom: keyof typeof atoms) {
	const atomConfig = atoms[atom];
	let t = 1;
	let k = 100;

	const zeroVector = new THREE.Vector3();
	const nucleus: Particle[] = [];
	const l = 0.3;
	const repulsiveConstant = 1;
	const springConstant = 15;
	const coolDownFactor = 0.01;

	for (let i = 0; i < atomConfig.atomic_number; i++)
		nucleus.push(
			generateParticle("proton", new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 5))
		);
	for (let i = 0; i < Math.floor(atomConfig.atomic_mass - atomConfig.atomic_number); i++)
		nucleus.push(
			generateParticle("neutorn", new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 5))
		);

	while (t < k) {
		const forces = [];
		for (let i = 0; i < nucleus.length; i++) {
			const attractiveForce = new THREE.Vector3()
				.copy(nucleus[i].position)
				.negate()
				.multiplyScalar(springConstant * Math.log(nucleus[i].position.distanceTo(zeroVector) / l));

			for (let j = 0; j < nucleus.length; j++) {
				if (i === j) continue;
				const repulsiveForce = new THREE.Vector3()
					.subVectors(nucleus[i].position, nucleus[j].position)
					.multiplyScalar(repulsiveConstant / nucleus[i].position.distanceToSquared(nucleus[j].position));
				attractiveForce.add(repulsiveForce);
			}
			forces.push(attractiveForce);
		}

		for (let i = 0; i < nucleus.length; i++)
			nucleus[i].position.add(forces[i].multiplyScalar(coolDownFactor));
		t++;
	}
	return nucleus;
}
