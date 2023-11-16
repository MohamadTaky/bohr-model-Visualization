import generateParticle from "./components/generateParticle";
import * as THREE from "three";

const atoms = [
	{
		nucleus: [
			generateParticle("proton", new THREE.Vector3(0, 0, 0)),
			generateParticle("proton", new THREE.Vector3(0.5, 0, 0)),
			generateParticle("proton", new THREE.Vector3(0.25, 0, -0.5)),
			generateParticle("neutorn", new THREE.Vector3(-0.25, 0, 0.5)),
			generateParticle("neutorn", new THREE.Vector3(0.25, 0, 0.5)),
			generateParticle("proton", new THREE.Vector3(-0.25, 0, -0.5)),
			generateParticle("neutorn", new THREE.Vector3(0.25, 0, -0.5)),
			generateParticle("neutorn", new THREE.Vector3(-0.25, 0.4, 0.25)),
			generateParticle("neutorn", new THREE.Vector3(0, 0.4, -0.25)),
			generateParticle("proton", new THREE.Vector3(0.25, 0.4, 0.25)),
			generateParticle("proton", new THREE.Vector3(0.25, -0.4, -0.25)),
			generateParticle("neutorn", new THREE.Vector3(-0.25, -0.5, -0.25)),
		],
		shells: [
			Array(2)
				.fill(0)
				.map(() => generateParticle("electron")),
			Array(4)
				.fill(0)
				.map(() => generateParticle("electron")),
		],
	},
];

export default atoms;
