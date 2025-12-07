import * as THREE from 'three';
import { OBJLoader } from 'OBJLoader';

export class Mushroom {
    constructor(positionX, positionZ, scale = 1) {
        this.positionX = positionX;
        this.positionZ = positionZ;
        this.scale = scale;
    }

    addToScene(scene) {
        const loader = new OBJLoader();

        loader.load(
            './components/blender/gomba.obj',
            (object) => {
                object.position.set(this.positionX, 0, this.positionZ);
                
                object.scale.set(this.scale, this.scale, this.scale);

                const material = new THREE.MeshPhongMaterial({
                    color: 0xA52A2A, 
                    shininess: 10,
                    specular: 0x111111,
                    side: THREE.FrontSide
                });

                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = material;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(object);
            },

            (xhr) => {
                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Hiba a gomba betöltésekor:', error);
            }
        );
    }
}

export class MushroomFactory {
    constructor(groundSize, amount) {
        this.groundSize = groundSize;
        this.amount = amount;
    }

    addToScene(scene) {
        for (let i = 0; i < this.amount; i++) {
            const scale = Math.random() * 1 + 0.5; 
            
            const mushroom = new Mushroom(
                this.getPosition(),
                this.getPosition(),
                scale
            );

            mushroom.addToScene(scene);
        }
    }

    getPosition() {
        return (Math.random() * this.groundSize) - (this.groundSize / 2);
    }
}