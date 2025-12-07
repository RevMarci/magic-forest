import * as THREE from 'three';

export class Sun {
    constructor() {
        this.dLight = new THREE.DirectionalLight( 0xff8888, 5 );
        this.dLight.position.set( 100, 200, 100 );
        this.dLight.target.position.set( 0, 0, 0 );
        this.dLight.castShadow = true;

        const shadowSize = 100; 
        this.dLight.shadow.camera.left = -shadowSize;
        this.dLight.shadow.camera.right = shadowSize;
        this.dLight.shadow.camera.top = shadowSize;
        this.dLight.shadow.camera.bottom = -shadowSize;
        
        this.dLight.visible = false; 

        window.addEventListener('keydown', (event) => {
            if (event.code === 'KeyN') {
                this.dLight.visible = !this.dLight.visible;
            }
        });
    }

    addToScene(scene) {
        scene.add(this.dLight);

        let planeSize = 1.0;
        var directionLightHelper = new THREE.DirectionalLightHelper( this.dLight, planeSize );
        scene.add( directionLightHelper );
    }
}