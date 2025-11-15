import * as THREE from 'three';

export class Lamp {
    constructor(positionX, positionZ, height = 5) {
        this.positionX = positionX;
        this.positionZ = positionZ;

        this.height = {
            top: 0.3,
            glass: 0.6,
            pole: height,
            base: 1.5
        };

        this.metalParameters = {
            color: 0x374149,
            metalness: 1
        };
        this.glassParameters = {
            color: 0xffd296,
        }
        this.lightColor = 0xffd296;

        this.topMesh = this.top();
        this.sLightMesh = this.sLight();
        this.pLightMesh = this.pLight();
        this.glassMesh = this.glass();
        this.poleMesh = this.pole();
        this.baseMesh = this.base();
    }

    addToScene(scene) {
        scene.add(this.topMesh);
        scene.add(this.sLightMesh);
        scene.add(this.pLightMesh);
        scene.add(this.glassMesh);
        scene.add(this.poleMesh);
        scene.add(this.baseMesh);

        // HELPERS FOR THE LIGHTS

        /*const spotLightHelper = new THREE.SpotLightHelper(this.sLightMesh);
        scene.add(spotLightHelper);*/

        const sphereSize = 0.2;
        const pointLightHelper = new THREE.PointLightHelper(this.pLightMesh, sphereSize);
        scene.add(pointLightHelper);
    }

    top() {
        const radialSegments = 4;
        const width = 0.8;
        const height = this.height.top;

        const topGeometry = new THREE.ConeGeometry( width, height, radialSegments );

        const heightFromGround = this.height.base + this.height.pole + this.height.glass;
        topGeometry.translate(
            this.positionX,
            (height / 2) + heightFromGround,
            this.positionZ
        );

        const topMaterial = new THREE.MeshStandardMaterial(this.metalParameters);
        const topMesh = new THREE.Mesh( topGeometry, topMaterial );

        topMesh.castShadow = true;

        return topMesh;
    }

    sLight() {
        const light = new THREE.SpotLight(this.lightColor, 300);

        const heightFromGround = this.height.base + this.height.pole + this.height.glass;
        light.position.set(
            this.positionX,
            heightFromGround,
            this.positionZ
        );

        light.angle = Math.PI / 3;
        light.castShadow = true;
        light.penumbra = 0.5;

        light.target.position.set(
            this.positionX,
            0,
            this.positionZ
        );

        return light;
    }

    pLight() {
        const light = new THREE.PointLight(this.lightColor, 100);

        const heightFromGround = this.height.base + this.height.pole + this.height.glass;
        light.position.set(
            this.positionX,
            heightFromGround - 0.2,
            this.positionZ
        );

        light.castShadow = true;

        return light
    }

    glass() {
        const radialSegments = 4;
        const widthTop = 0.4;
        const widthBottom = 0.3;
        const height = this.height.glass;

        const glassGeometry = new THREE.CylinderGeometry(widthTop, widthBottom, height, radialSegments);

        const heightFromGround = this.height.base + this.height.pole;
        glassGeometry.translate(
            this.positionX,
            (height / 2) + heightFromGround,
            this.positionZ
        );

        const glassMaterial = new THREE.MeshBasicMaterial(this.glassParameters);

        const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);

        return glassMesh;
    }

    pole() {
        const radialSegments = 6;
        const width = 0.2;
        const height = this.height.pole;

        const poleGeometry = new THREE.CylinderGeometry(width, width, height, radialSegments);

        const heightFromGround = this.height.base;
        poleGeometry.translate(
            this.positionX,
            (height / 2) + heightFromGround,
            this.positionZ
        );

        const poleMaterial = new THREE.MeshStandardMaterial(this.metalParameters);

        const poleMesh = new THREE.Mesh(poleGeometry, poleMaterial);

        return poleMesh;
    }

    base() {
        const radialSegments = 16;
        const widthTop = 0.3;
        const widthBottom = 0.5;
        const height = this.height.base;

        const baseGeometry = new THREE.CylinderGeometry(widthTop, widthBottom, height, radialSegments);

        baseGeometry.translate(
            this.positionX,
            height / 2,
            this.positionZ
        );

        const baseMaterial = new THREE.MeshStandardMaterial(this.metalParameters);

        const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);

        return baseMesh;
    }
}