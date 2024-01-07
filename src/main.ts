import { camera, controls } from "@/components/MainCamera";
import { renderer, scene } from "@/components/MainScene";
import { deltaTime, tick } from "@/components/Time";
import { UP } from "@/constants";
import "@/style.css";
import generateAtom from "@/utils/generateAtom";
import { degToRad } from "three/src/math/MathUtils";

const { nucleus, maxOrbitRadius, nucleusRadius, orbits, shells } = generateAtom("oganesson");
export const SPEED = 10;
controls.minDistance = nucleusRadius + 2;
controls.maxDistance = maxOrbitRadius * 2;
camera.position.multiplyScalar(maxOrbitRadius * 1.5);

shells.forEach((shell) => shell.forEach((electron) => scene.add(electron)));
orbits.forEach((orbit) => scene.add(orbit));
nucleus.forEach((particle) => scene.add(particle));

function draw() {
  requestAnimationFrame(draw);
  tick();
  for (let i = 0; i < shells.length; i++)
    for (let j = 0; j < shells[i].length; j++) {
      shells[i][j].userData.dir.applyAxisAngle(UP, degToRad(-SPEED * deltaTime));
      shells[i][j].position.copy(shells[i][j].userData.dir);
    }
  renderer.render(scene, camera);
}

draw();
