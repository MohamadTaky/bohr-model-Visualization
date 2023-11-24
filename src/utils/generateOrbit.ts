import { RIGHT, UP } from "@/constants";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";

export default function generateOrbit(distance: number, resloution = 600) {
	const points = [];
	for (let j = 0; j < resloution; j++)
		points.push(
			new THREE.Vector3()
				.copy(RIGHT)
				.applyAxisAngle(UP, degToRad((360 / resloution) * j))
				.multiplyScalar(distance)
		);
	const geomentry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineBasicMaterial({ color: 0x808080 });
	return new THREE.LineLoop(geomentry, material);
}
