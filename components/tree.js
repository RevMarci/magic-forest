import * as THREE from 'three';
import mergeGeometries from 'BufferGeometryUtils';

export class Tree {
    constructor(texture, positionX, positionZ, height = 8) {
        this.texture = texture;
        this.positionX = positionX;
        this.positionZ = positionZ;
        this.height = height;

        this.trunkMesh = this.trunk();
        this.leafsMesh = this.leafs();
    }

    addToScene(scene) {
        scene.add(this.trunkMesh);
        scene.add(this.leafsMesh);
    }

    trunk() {
        const radialSegments = 16;
        const widthTop = 1;
        const widthBottom = 1.5;

        const trunkGeometry = new THREE.CylinderGeometry(widthTop, widthBottom, this.height, radialSegments);

        trunkGeometry.rotateY(Math.random() * Math.PI * 2);
        trunkGeometry.rotateX(Math.random() * 0.3);

        trunkGeometry.translate(
            this.positionX,
            (this.height / 2) - 1,
            this.positionZ
        );

        const trunkMaterial = new THREE.MeshPhongMaterial( {
            color: 0x7d4002,
            shininess: 20,
            specular: 0x111111,
            side: THREE.FrontSide,
            wireframe: false
        } );

        const trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial);

        trunkMesh.castShadow = true;
        trunkMesh.receiveShadow = true;

        return trunkMesh;
    }

    leafs() {
        const leafsAmount = 100;
        const segments = 4;
        const radius = 1.5;

        const leafGroup = [];

        for (let i = 0; i < leafsAmount; i++) {
            const leafGeometry = new THREE.SphereGeometry(radius, segments, segments);
            
            leafGeometry.translate(
                getDistance(i),
                getDistance(i),
                getDistance(i)
            );

            leafGeometry.rotateX(getDistance(i));
            leafGeometry.rotateY(getDistance(i));

            leafGroup.push(leafGeometry);
        }

        function getDistance(i) {
            const minDist = 1;
            const maxDist = 7;
            const t = i / leafsAmount;

            const scale = minDist + (maxDist - minDist) * Math.sqrt(t);

            return (Math.random() - 0.5) * scale;
        }

        const mergedLeafsGeometry = mergeGeometries(leafGroup);

        const leafMaterial = new THREE.MeshPhongMaterial( {
            map: this.texture,
            shininess: 20,
            specular: 0x111111,
            side: THREE.FrontSide,
            wireframe: false
        } );

        const leafsMesh = new THREE.Mesh(mergedLeafsGeometry, leafMaterial);
        leafsMesh.position.set(this.positionX, this.height, this.positionZ);

        leafsMesh.castShadow = true;
        leafsMesh.receiveShadow = true;

        return leafsMesh;
    }
}

export class TreeFactory {
    constructor(texture, groundSize, amount) {
        this.texture = texture;
        this.groundSize = groundSize;
        this.amount = amount;
    }

    addToScene(scene) {
        for (let i = 0; i < this.amount; i++) {
            const tree = new Tree(
                this.texture,
                this.getPosition(),
                this.getPosition()
            );

            tree.addToScene(scene);
        }
    }

    getPosition() {
        return (Math.random() * this.groundSize) - (this.groundSize / 2);
    }
}
