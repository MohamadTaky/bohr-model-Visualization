import * as atoms from "@/atoms.json";
import generateNucleus from "@/utils/generateNuclues";
import generateOrbit from "@/utils/generateOrbit";
import generateShell from "@/utils/generateShell";
import getSegmentConfig from "@/utils/getSegmentConfig";
import getNucleusRadius from "./getNucluesRadius";

export default function generateAtom(atom: keyof typeof atoms) {
	const orbits = [];
	const shells = [];
	const electrons = [];
	const nucleus = generateNucleus(atom);
	let nucleusRadius = getNucleusRadius(nucleus);
	let maxOrbitRadius = 0;

	const atomConfig = atoms[atom];

	const electronConfiguration = atomConfig.electron_configuration.split(" ");
	for (let i = 0; i < electronConfiguration.length; i++) {
		const segment = getSegmentConfig(electronConfiguration[i]);
		const shellIdx = segment.shell - 1;

		if (electrons[shellIdx]) electrons[shellIdx] += segment.electrons;
		else electrons[shellIdx] = segment.electrons;
	}

	let orbitSpacing = 3;
	for (let i = 0; i < electrons.length; i++) {
		let distance = nucleusRadius + orbitSpacing * (i + 1);
		const shell = generateShell(electrons[i], distance);
		shells.push(shell);

		const orbit = generateOrbit(distance);
		orbits.push(orbit);
		if (i === electrons.length - 1) maxOrbitRadius = distance;
	}
	return { orbits, shells, nucleus, nucleusRadius, maxOrbitRadius };
}
