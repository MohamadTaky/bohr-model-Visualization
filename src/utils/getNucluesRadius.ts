import { ZERO } from "@/constants";
import { Particle } from "./generateParticle";

export default function getNucleusRadius(nucleus: Particle[]) {
	let radius = 0;
	for (let i = 0; i < nucleus.length; i++) {
		radius = Math.max(radius, nucleus[i].position.distanceTo(ZERO));
	}
	return radius;
}
