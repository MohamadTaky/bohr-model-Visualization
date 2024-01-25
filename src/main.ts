import { camera, controls } from "@/components/MainCamera";
import { renderer, scene } from "@/components/MainScene";
import { deltaTime, tick } from "@/components/Time";
import { SPEED, UP } from "@/constants";
import "@/style.css";
import * as atoms from "./atoms.json";
import generateAtom from "@/utils/generateAtom";
import { degToRad } from "three/src/math/MathUtils";

let currentAtom = generateAtom("hydrogen");
let isTableVisible = true;

const elements = document.querySelectorAll("[data-element]");
const table = document.getElementById("table");
const tableToggle = document.getElementById("tableToggle");
tableToggle?.addEventListener("click", () => {
  isTableVisible = !isTableVisible;
  table?.setAttribute("data-visible", String(isTableVisible));
});

elements.forEach((element) => {
  element.addEventListener("click", () => {
    currentAtom.shells.forEach((shell) => shell.forEach((electron) => scene.remove(electron)));
    currentAtom.orbits.forEach((orbit) => scene.remove(orbit));
    currentAtom.nucleus.forEach((particle) => scene.remove(particle));

    currentAtom = generateAtom(element.getAttribute("data-element") as keyof typeof atoms);

    currentAtom.shells.forEach((shell) => shell.forEach((electron) => scene.add(electron)));
    currentAtom.orbits.forEach((orbit) => scene.add(orbit));
    currentAtom.nucleus.forEach((particle) => scene.add(particle));
    controls.minDistance = currentAtom.nucleusRadius + 2;
    controls.maxDistance = currentAtom.maxOrbitRadius * 3;
    camera.position.normalize().multiplyScalar(currentAtom.maxOrbitRadius * 2.5);
  });
});

controls.minDistance = currentAtom.nucleusRadius + 2;
controls.maxDistance = currentAtom.maxOrbitRadius * 3;
camera.position.setY(currentAtom.maxOrbitRadius * 2.5);

currentAtom.shells.forEach((shell) => shell.forEach((electron) => scene.add(electron)));
currentAtom.orbits.forEach((orbit) => scene.add(orbit));
currentAtom.nucleus.forEach((particle) => scene.add(particle));

function draw(): void {
  requestAnimationFrame(draw);
  tick();
  for (let i = 0; i < currentAtom.shells.length; i++)
    for (let j = 0; j < currentAtom.shells[i].length; j++) {
      currentAtom.shells[i][j].userData.dir.applyAxisAngle(UP, degToRad(-SPEED * deltaTime));
      currentAtom.shells[i][j].position.copy(currentAtom.shells[i][j].userData.dir);
    }
  renderer.render(scene, camera);
}
draw();
