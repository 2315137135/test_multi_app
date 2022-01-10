import {Engine, MeshBuilder, Scene} from "@babylonjs/core";
import {GridMaterial} from "@babylonjs/materials";


export class NftScene {
    static init(scene: Scene) {
        scene.createDefaultCameraOrLight(1, 1, 1)
        let ground = MeshBuilder.CreateGround('ground', {width: 1000, height: 1000})
        ground.material = new GridMaterial('grid', scene)
        ground.checkCollisions

    }

    constructor() {

    }
}
