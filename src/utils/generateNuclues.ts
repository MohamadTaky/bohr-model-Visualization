import * as atoms from "@/atoms.json";
import { ZERO } from "@/constants";
import generateParticle, { Particle } from "@/utils/generateParticle";
import * as THREE from "three";
import calculateSpringForce from "./calculateSpringForce";
import calculateRepulsiveForce from "./calculateRepulsiveForce";

export default function generateNucleus(atom: keyof typeof atoms, iterations = 100, l = 0.5, repulsiveConstant = 0.02, springConstant = 0.5) {
  const atomConfig = atoms[atom];
  const nucleus: Particle[] = [];

  for (let i = 0; i < atomConfig.atomic_number; i++) {
    const randomPosition = new THREE.Vector3().randomDirection().multiplyScalar(10);
    const proton = generateParticle("proton", randomPosition);
    nucleus.push(proton);
  }

  for (let i = 0; i < Math.floor(atomConfig.atomic_mass - atomConfig.atomic_number); i++) {
    const randomPosition = new THREE.Vector3().randomDirection().multiplyScalar(10);
    const neutorn = generateParticle("neutorn", randomPosition);
    nucleus.push(neutorn);
  }

  for (let i = 0; i < iterations; i++) {
    const forces = [];
    for (let j = 0; j < nucleus.length; j++) {
      const attractiveForce = calculateSpringForce(springConstant, l, nucleus[j].position, ZERO);

      for (let k = 0; k < nucleus.length; k++) {
        if (j === k) continue;
        const repulsiveForce = calculateRepulsiveForce(repulsiveConstant, nucleus[k].position, nucleus[j].position);
        attractiveForce.add(repulsiveForce);
      }
      forces.push(attractiveForce);
    }

    for (let j = 0; j < nucleus.length; j++) nucleus[j].position.add(forces[j]);
  }

  return nucleus;
}