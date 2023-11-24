import { camera, controls } from "@/components/MainCamera";
import { renderer, scene } from "@/components/MainScene";
import { deltaTime, tick } from "@/components/Time";
import "@/style.css";
import { degToRad } from "three/src/math/MathUtils";
import { UP } from "./constants";
import generateAtom from "./utils/generateAtom";

const { nucleus, shells, orbits, nucleusRadius, maxOrbitRadius } = generateAtom("carbon");
console.log(nucleusRadius);
controls.minDistance = nucleusRadius + 2;
controls.maxDistance = maxOrbitRadius * 2;
camera.position.multiplyScalar(maxOrbitRadius * 1.5);

shells.forEach(shell => shell.forEach(electron => scene.add(electron)));
orbits.forEach(orbit => scene.add(orbit));
nucleus.forEach(particle => scene.add(particle));

function draw() {
	requestAnimationFrame(draw);
	tick();
	for (let i = 0; i < shells.length; i++)
		for (let j = 0; j < shells[i].length; j++) {
			shells[i][j].userData.dir.applyAxisAngle(UP, degToRad(-10 * deltaTime));
			shells[i][j].position.copy(shells[i][j].userData.dir);
		}
	renderer.render(scene, camera);
}

draw();
