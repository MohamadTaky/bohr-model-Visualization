import camera from "@/components/MainCamera";
import { renderer, scene } from "@/components/MainScene";
import { deltaTime, tick } from "@/components/Time";
import "@/style.css";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import generateAtom from "./utils/generateAtom";

const up = new THREE.Vector3(0, 1, 0);



const { nucleus, shells, orbits } = generateAtom("oganesson");

shells.forEach(shell => shell.forEach(electron => scene.add(electron)));
orbits.forEach(orbit => scene.add(orbit));
nucleus.forEach(particle => scene.add(particle));

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
