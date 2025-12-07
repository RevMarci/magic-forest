import * as THREE from 'three';

export class Stone {
    constructor(positionX, positionZ) {
        this.positionX = positionX;
        this.positionZ = positionZ;

        this.boxMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.7,
            metalness: 0.5,
            flatShading: true
        });
        this.coneMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff88,
            emissive: 0x004422,
            emissiveIntensity: 0.8,
            roughness: 0.1,
            metalness: 0.1,
            flatShading: true,
            transparent: true,
            opacity: 0.85
        });

        this.coreLight = new THREE.PointLight(0x0055ff, 100);
        this.coreLight.castShadow = true; 
        this.coreLight.shadow.bias = -0.0001;

        this.boxMesh = this.box();
        this.upConeMesh = this.upCone();
        this.downConeMesh = this.downCone();

        this.group = new THREE.Group();
        this.group.add(this.boxMesh);
        this.group.add(this.upConeMesh);
        this.group.add(this.downConeMesh);
        this.group.add(this.coreLight);
        this.group.position.y = 8;

        this.holder = new THREE.Object3D();
        this.holder.add(this.group);

        this.isPressed = false;
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') this.isPressed = true;
        });
        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space') this.isPressed = false;
        });

        this.rotationSpeed = 1;
        this.leaning = 0;
        this.distance = 0;
    }

    addToScene(scene) {
        scene.add(this.holder);
    }

    animate() {
        const disctanceSpeed = 0.03;

        if (this.isPressed) {
            // Rotate
            if (this.rotationSpeed < 30) {
                this.rotationSpeed += 0.1;
            }

            // Lift off
            if (this.rotationSpeed > 10 && this.holder.position.y < 10) {
                this.holder.position.y += 0.05;
            }

            // Lean
            if (this.rotationSpeed > 15) {
                if (this.leaning <= 0) {
                    this.leaning = 0.01;
                }
                this.leaning *= 1.03;
            }

            if (this.leaning >= 10 && this.distance < 10) {
                this.upConeMesh.position.y += disctanceSpeed;
                this.downConeMesh.position.y -= disctanceSpeed;
                this.distance += disctanceSpeed;
            }

            // Light
            if (this.coreLight.intensity < 1000000) {
                this.coreLight.intensity *= 1.02;
            }
            
            
        } else {
            // Rotate
            if (this.rotationSpeed > 1) {
                this.rotationSpeed -= 0.1;
            }

            // Lift off
            if (this.holder.position.y > 0) {
                this.holder.position.y -= 0.05;
            }

            // Lean
            if (this.leaning > 0) {
                if (this.leaning > 10) {
                    this.leaning /= 1.2;
                } else {
                    this.leaning -= 1;
                }

                if (this.leaning < 0) {
                    this.leaning = 0;
                }
            }

            if (this.distance > 0) {
                this.upConeMesh.position.y -= disctanceSpeed * 2;
                this.downConeMesh.position.y += disctanceSpeed * 2;
                this.distance -= disctanceSpeed * 2;
            }

            // light
            if (this.coreLight.intensity > 1000) {
                this.coreLight.intensity /= 1.05;
            }
            if (this.coreLight.intensity > 100) {
                this.coreLight.intensity -= 2;
            }
        }

        this.group.rotation.x = THREE.MathUtils.degToRad(this.leaning);
        this.holder.rotation.y += THREE.MathUtils.degToRad(this.rotationSpeed);
    }

    box() {
        let boxGeometry = new THREE.BoxGeometry( 1.5, 6, 1.5 );
        let boxMaterial = this.boxMaterial;
        let boxMesh = new THREE.Mesh( boxGeometry, boxMaterial );
        return boxMesh;
    }

    upCone() {
        let coneGeometry = new THREE.ConeGeometry( 1.2, 8, 4 );
        let coneMaterial = this.coneMaterial;
        let coneMesh = new THREE.Mesh( coneGeometry, coneMaterial );
        coneMesh.position.y = 2;
        return coneMesh;
    }

    downCone() {
        let coneGeometry = new THREE.ConeGeometry( 1.2, 8, 4 );
        let coneMaterial = this.coneMaterial;
        let coneMesh = new THREE.Mesh( coneGeometry, coneMaterial );
        coneMesh.position.y = -2;
        coneMesh.rotation.x = Math.PI;
        return coneMesh;
    }
}