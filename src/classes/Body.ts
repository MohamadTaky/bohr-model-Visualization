import * as THREE from "three";
const universalGravitation = 1;
let timestep = 0.001;

export default class Body extends THREE.Mesh {
	static bodies: Body[] = [];
	mass;
	initialVelocity;
	currentVelocity;
	constructor(
		position: THREE.Vector3,
		radius: number,
		mass: number,
		initialVelocity: THREE.Vector3,
		currentVelocity: THREE.Vector3,
	) {
		const geomentry = new THREE.SphereGeometry(radius);
		const material = new THREE.MeshPhysicalMaterial();
		super(geomentry, material);
		this.mass = mass;
		this.initialVelocity = initialVelocity;
		this.currentVelocity = currentVelocity;
		this.currentVelocity.set(initialVelocity.x, initialVelocity.y, initialVelocity.z);
		this.position.set(position.x, position.y, position.z);
    Body.bodies.push(this);
	}

	updateVelocity = () => {
		for (const body of Body.bodies) {
			if (body === this) continue;
			const sqrDistance = body.position.distanceToSquared(this.position);
			const forceDir = new THREE.Vector3()
				.subVectors(body.position, this.position)
				.normalize()
				.multiplyScalar((universalGravitation * body.mass * this.mass) / sqrDistance)
				.divideScalar(this.mass);
			this.currentVelocity.addScaledVector(forceDir, timestep);
		}
	};
	updatePosition() {
		this.position.addScaledVector(this.currentVelocity, timestep);
	}
}
