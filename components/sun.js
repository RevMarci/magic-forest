import * as THREE from 'three';

export class Sun {
    constructor() {
        this.sLight = new THREE.SpotLight( 0xff8888, 500 );
        this.sLight.position.set( 50, 200, 50 );
        this.sLight.target.position.set( 0, 0, 0 );
        this.sLight.castShadow = true;

        this.sLight.angle = Math.PI / 4; 

        this.sLight.distance = 300;
        this.sLight.decay = 0.5;

        this.sLight.shadow.mapSize.width = 1024;
        this.sLight.shadow.mapSize.height = 1024;

        this.sLight.visible = false; 
        window.addEventListener('keydown', (event) => {
            if (event.code === 'KeyN') {
                this.sLight.visible = !this.sLight.visible;
            }
        });
    }

    addToScene(scene) {
        scene.add(this.sLight);

        scene.add(this.sLight.target);

        // Helper
        const spotLightHelper = new THREE.SpotLightHelper( this.sLight );
        //scene.add( spotLightHelper );
    }
}