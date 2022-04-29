import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Spiral, Flower, Land } from 'objects';
import { BasicLights } from 'lights';
import * as THREE from "three";

import POSX from "./textures/Skybox/posx.jpg";
import NEGX from "./textures/Skybox/negx.jpg";
import POSY from "./textures/Skybox/posy.jpg";
import NEGY from "./textures/Skybox/negy.jpg";
import POSZ from "./textures/Skybox/posz.jpg";
import NEGZ from "./textures/Skybox/negz.jpg";
import RAINBOW from "./textures/Rainbow/rainbow1.png";
import CLOUDS from "./textures/Clouds/clouds.jpg";

class MainScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new THREE.CubeTextureLoader()
            .load([
                CLOUDS, CLOUDS,
                CLOUDS, CLOUDS,
                CLOUDS, CLOUDS
            ]);

        // this.background = new Color(0xffffff);


        // Add spirals to scene

        // this.envMap = new THREE.CubeTextureLoader()
        //     .load([
        //         POSX, NEGX,
        //         POSY, NEGY,
        //         POSZ, NEGZ
        //     ]);
        this.envMap = new THREE.CubeTextureLoader()
            .load([
                RAINBOW, RAINBOW,
                RAINBOW, RAINBOW,
                RAINBOW, RAINBOW
            ]);


        // 16

        // this.background = this.envMap;

        const lights = new BasicLights();
        this.add(lights);

        this.create_new_spiral = this.create_new_spiral.bind(this);

        const count = 1;
        for (let i = 0; i < count; i++) {
            this.create_new_spiral();
        }
        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -15, 15);
    }

    create_new_spiral(listener) {
        const new_spiral = new Spiral(this, this.envMap, 1, 1);
        this.add(new_spiral);

    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default MainScene;