import atoms from "@/atoms";
import camera from "@/components/MainCamera";
import { renderer, scene } from "@/components/MainScene";
import { deltaTime, tick } from "@/components/Time";
import "@/style.css";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import generateAtom from "./components/generateAtom";

const up = new THREE.Vector3(0, 1, 0);
const currentAtom = generateAtom("carbon");

currentAtom.shells.forEach(shell => shell.forEach(electron => scene.add(electron)));
currentAtom.lines.forEach(line => scene.add(line));

atoms[0].nucleus.forEach(particle => scene.add(particle));

function draw() {
	requestAnimationFrame(draw);
	tick();
	for (let i = 0; i < currentAtom.shells.length; i++)
		for (let j = 0; j < currentAtom.shells[i].length; j++) {
			currentAtom.shells[i][j].userData.dir.applyAxisAngle(up, degToRad(-10 * deltaTime));
			currentAtom.shells[i][j].position.copy(currentAtom.shells[i][j].userData.dir);
		}
	renderer.render(scene, camera);
}

draw();
