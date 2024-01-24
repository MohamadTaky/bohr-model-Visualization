import * as THREE from "three";

export default function calculateSpringForce(springConstant: number, l: number, from: THREE.Vector3, to: THREE.Vector3) {
  const displacement = new THREE.Vector3().subVectors(to, from);
  const distance = displacement.length();
  return displacement.normalize().multiplyScalar(springConstant * Math.log(distance / l));
}
