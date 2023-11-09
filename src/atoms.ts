import getParticle from "./components/ParticleFactory";
import * as THREE from "three";

const atoms = [
	{
		nucleus: [
			getParticle("proton", new THREE.Vector3(0, 0, 0)),
			getParticle("proton", new THREE.Vector3(0.5, 0, 0)),
			getParticle("proton", new THREE.Vector3(-0.5, 0, 0)),
			getParticle("neutorn", new THREE.Vector3(-0.25, 0, 0.5)),
			getParticle("neutorn", new THREE.Vector3(0.25, 0, 0.5)),
			getParticle("proton", new THREE.Vector3(-0.25, 0, -0.5)),
			getParticle("neutorn", new THREE.Vector3(0.25, 0, -0.5)),
			getParticle("neutorn", new THREE.Vector3(-0.25, 0.4, 0.25)),
			getParticle("neutorn", new THREE.Vector3(0, 0.4, -0.25)),
			getParticle("proton", new THREE.Vector3(0.25, 0.4, 0.25)),
			getParticle("proton", new THREE.Vector3(0.25, -0.4, -0.25)),
			getParticle("neutorn", new THREE.Vector3(-0.25, -0.5, -0.25)),
		],
		shells: [
			Array(2)
				.fill(0)
				.map(() => getParticle("electron")),
			Array(4)
				.fill(0)
				.map(() => getParticle("electron")),
		],
	},
];

export default atoms;

export const hydrogen = {
	name: "Hydrogen",
	atomic_mass: 1.008,
	atomic_number: 1,
	symbol: "H",
	electron_configuration: "1s1",
};


