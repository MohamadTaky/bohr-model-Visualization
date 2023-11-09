import * as THREE from "three";

export type Electron = THREE.Mesh & {
	userData: {
		distance: number;
		dir: THREE.Vector3;
	};
};

const particles = {
	proton: {
		radius: 0.3,
		color: 0xdc2626,
	},
	neutorn: {
		radius: 0.3,
		color: 0x16a34a,
	},
	electron: {
		radius: 0.1,
		color: 0x2563eb,
	},
};

export default function getParticle<
	T extends keyof typeof particles,
	R = T extends "electron" ? Electron : THREE.Mesh,
>(type: T, position = new THREE.Vector3()) {
	const geomentry = new THREE.SphereGeometry(particles[type].radius);
	const material = new THREE.MeshStandardMaterial({ color: particles[type].color });
	const mesh = new THREE.Mesh(geomentry, material);
	if (type === "electron") {
		mesh.userData = { distance: 0, dir: new THREE.Vector3() };
		return mesh as R;
	}

	mesh.position.copy(position);

	return mesh as R;
}
