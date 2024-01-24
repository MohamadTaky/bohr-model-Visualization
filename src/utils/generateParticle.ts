import * as THREE from "three";

export type Particle<T = "electron" | "proton" | "neutorn"> = THREE.Mesh & {
  userData: { type: T };
};

export type Electron = Particle<"electron"> & {
  userData: {
    distance: number;
    dir: THREE.Vector3;
  };
};

const particles = {
  proton: {
    radius: 0.4,
    color: 0xdc2626,
  },
  neutorn: {
    radius: 0.4,
    color: 0x16a34a,
  },
  electron: {
    radius: 0.2,
    color: 0x2563eb,
  },
};

export default function generateParticle<T extends keyof typeof particles, R = T extends "electron" ? Electron : Particle<T>>(
  type: T,
  position = new THREE.Vector3(),
) {
  const geomentry = new THREE.SphereGeometry(particles[type].radius);
  const material = new THREE.MeshStandardMaterial({ color: particles[type].color });
  const mesh = new THREE.Mesh(geomentry, material);
  if (type === "electron") {
    mesh.userData = { distance: 0, dir: new THREE.Vector3() };
    return mesh as R;
  }

  mesh.position.copy(position);
  mesh.userData.type = type;
  return mesh as R;
}
