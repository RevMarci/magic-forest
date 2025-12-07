import * as THREE from 'three';

export class Fire {
    constructor(positionX, positionZ) {
        this.positionX = positionX;
        this.positionZ = positionZ;

        this.stonesMesh = this.stones();
        //this.fire = this.leafs();
    }

    
}