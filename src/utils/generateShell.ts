import { UP } from "@/constants";
import generateParticle from "@/utils/generateParticle";
import { degToRad } from "three/src/math/MathUtils";

export default function generateShell(electrons: number, distance: number) {
	const shell = [];
	for (let i = 0; i < electrons; i++) {
		const electron = generateParticle("electron");
		electron.userData.dir
			.set(1, 0, 0)
			.applyAxisAngle(UP, degToRad(360 / electrons) * i)
			.multiplyScalar(distance);
		electron.position.copy(electron.userData.dir);
		shell.push(electron);
	}
	return shell;
}
