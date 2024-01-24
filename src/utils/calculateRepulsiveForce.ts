//calculateRepulsiveForce.ts
import * as THREE from "three";

export default function calculateRepulsiveForce(repulsiveConstant: number, from: THREE.Vector3, to: THREE.Vector3) {
  const displacement = new THREE.Vector3().subVectors(to, from);
  const squaredDistance = displacement.lengthSq();
  return displacement.normalize().multiplyScalar(repulsiveConstant / squaredDistance);
}
