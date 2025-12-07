class Wolf {
                constructor(positionX, positionZ, radius = 10, speed = 0.05, startPoint = 0) {
                    this.speed = speed;

                    this.group = new THREE.Group();

                    this.wolfBody = this.body(positionX, positionZ);
                
                    this.legForward = true;

                    this.legFR = this.leg(2, 1);
                    this.legFL = this.leg(2, -1);
                    this.legBR = this.leg(-2, 1);
                    this.legBL = this.leg(-2, -1);

                    this.group.add(this.wolfBody);
                    this.group.add(this.legFL.top);
                    this.group.add(this.legFR.top);
                    this.group.add(this.legBL.top);
                    this.group.add(this.legBR.top);

                    this.group.position.x = radius;
                    this.group.rotation.y = THREE.MathUtils.degToRad(90);
                    //this.group.add(new THREE.AxesHelper(5));

                    this.holder = new THREE.Object3D();
                    this.holder.position.x = positionX;
                    this.holder.position.z = positionZ;
                    this.holder.rotation.y = THREE.MathUtils.degToRad(startPoint);
                    this.holder.add(this.group);
                    //this.holder.add(new THREE.AxesHelper(10));
                }
            
                addToScene(scene) {
                    scene.add(this.holder);
                }

                animate() {
                    let speed = this.speed;
                    let lenght = 0.7;

                    this.holder.rotation.y += speed / 3;

                    if (this.legForward) {
                        this.legFR.top.rotation.z -= speed;
                        this.legFL.top.rotation.z -= speed;
                        this.legBR.top.rotation.z += speed;
                        this.legBL.top.rotation.z += speed;

                        this.legFR.bot.rotation.z -= speed;
                        this.legFL.bot.rotation.z -= speed;
                        this.legBR.bot.rotation.z += speed;
                        this.legBL.bot.rotation.z += speed;

                        if (this.legFR.top.rotation.z <= -lenght) {
                            this.legForward = false;
                        }
                    } else {
                        this.legFR.top.rotation.z += speed;
                        this.legFL.top.rotation.z += speed;
                        this.legBR.top.rotation.z -= speed;
                        this.legBL.top.rotation.z -= speed;

                        this.legFR.bot.rotation.z += speed;
                        this.legFL.bot.rotation.z += speed;
                        this.legBR.bot.rotation.z -= speed;
                        this.legBL.bot.rotation.z -= speed;

                        if (this.legFR.top.rotation.z >= lenght) {
                            this.legForward = true;
                        }
                    }
                }

                body(x,z) {
                    let cyl = this.getCyl(1, 1, 4.5, 16);
                    cyl.rotation.x = THREE.MathUtils.degToRad(90);
                    cyl.rotation.z = THREE.MathUtils.degToRad(90);
                    cyl.position.y = 2.2;
                    return cyl;
                }
            
                leg(x,z) {
                    let cyl = this.getCyl(0.2, 0.2, 1, 8);
                    cyl.position.y = -0.4;

                    let legHolder = new THREE.Group();
                    legHolder.add(cyl);
                    legHolder.position.y = 2;
                    legHolder.position.x = x;
                    legHolder.position.z = z;
                    //legHolder.add(new THREE.AxesHelper(5));

                    let legLow = this.getCyl(0.2, 0.2, 1, 8);
                    legLow.position.y = -0.4;
                    let legLowHolder = new THREE.Object3D();
                    legLowHolder.add(legLow);
                    legLowHolder.position.y = -1;
                    legLowHolder.rotation.z = THREE.MathUtils.degToRad(30);
                    //legLowHolder.add(new THREE.AxesHelper(3));

                    legHolder.add(legLowHolder);

                    //return legHolder;
                    return {top: legHolder, bot: legLowHolder};
                }
            
                getCyl(top, bot, height, segments) {
                    let cylGeometry = new THREE.CylinderGeometry(top, bot, height, segments);

                    const loader = new THREE.TextureLoader();

                    let cylMaterial = new THREE.MeshPhongMaterial({
                        map: wolfTexture,
                        shininess: 10,
                        specular: 0x111111,
                    });
                    let cylMesh = new THREE.Mesh(cylGeometry, cylMaterial);
                    cylMesh.castShadow = true;
                    cylMesh.receiveShadow = true;
                    return cylMesh;
                }
            }