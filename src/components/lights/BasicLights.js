import { Group, DirectionalLight, SpotLight, AmbientLight, HemisphereLight } from 'three';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        // jelly
        // const dir = new SpotLight(0xffffff, 3.6, 7, 0.8, 1, 1);
        // const ambi = new AmbientLight(0x777777, 1.32);
        // const hemi = new HemisphereLight(0xffc2c2, 0xbad2ff, 2.3);

        // dir.position.set(0, 500, 0);
        // dir.target.position.set(0, 300, 0);

        // gold
        const dir = new SpotLight(0xffffff, 1.6, 7, 0.8, 1, 1);
        const ambi = new AmbientLight(0xffffff, 1.32);
        const hemi = new HemisphereLight(0x064f13, 0x064f13, 1.3);

        // const dir = new DirectionalLight(0xffffff, 1);

        // // lava
        // // const dir = new SpotLight(0xffffff, 1.6, 7, 0.8, 1, 1);
        // // const ambi = new AmbientLight(0x00ffff, 1.32);
        // // const hemi = new HemisphereLight(0x064f13, 0x064f13, 1.3);

        dir.position.set(0, 300, 0);
        dir.target.position.set(0, 0, 0);

        this.add(ambi, hemi, dir);

        // const ambi = new AmbientLight(0x000000, 1.0);
        // var light = new DirectionalLight(0xffffff, 1);
        // light.position.set(500, 0, -500);
        // this.add(light)
        // this.add(ambi);
    }
}

export default BasicLights;