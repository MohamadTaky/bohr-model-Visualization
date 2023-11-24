import * as atoms from "@/atoms.json";
import generateNucleus from "@/utils/generateNuclues";
import generateOrbit from "@/utils/generateOrbit";
import generateShell from "@/utils/generateShell";
import getSegmentConfig from "@/utils/getSegmentConfig";

console.log(Object.keys(atoms).forEach(key => console.log(key)));

export default function generateAtom(atom: keyof typeof atoms) {
	const orbits = [];
	const shells = [];
	const electrons = [];
	const nucleus = generateNucleus(atom);

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
		let distance = orbitSpacing * (i + 1);
		const shell = generateShell(electrons[i], distance);
		shells.push(shell);

		const orbit = generateOrbit(distance);
		orbits.push(orbit);
	}

	return { orbits, shells, nucleus };
}
