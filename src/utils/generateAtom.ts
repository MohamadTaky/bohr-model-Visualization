import * as atoms from "@/atoms.json";
import generateNucleus from "@/utils/generateNuclues";
import generateOrbit from "@/utils/generateOrbit";
import generateShell from "@/utils/generateShell";
import getNucleusRadius from "@/utils/getNucluesRadius";

export default function generateAtom(atom: keyof typeof atoms) {
  const orbits = [];
  const shells = [];
  const nucleus = generateNucleus(atom);
  let nucleusRadius = getNucleusRadius(nucleus);
  let maxOrbitRadius = 0;

  const atomConfig = atoms[atom];

  let orbitSpacing = 3;
  for (let i = 0; i < atomConfig.shells.length; i++) {
    let distance = nucleusRadius + orbitSpacing * (i + 1);
    const shell = generateShell(atomConfig.shells[i], distance);
    shells.push(shell);

    const orbit = generateOrbit(distance);
    orbits.push(orbit);
    if (i === atomConfig.shells.length - 1) maxOrbitRadius = distance;
  }
  return { orbits, shells, nucleus, nucleusRadius, maxOrbitRadius };
}
