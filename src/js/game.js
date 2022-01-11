import {Engine, Mesh, PBRMaterial, Scene} from "@babylonjs/core";
import {NftScene} from "@/js/scene/nftScene";
import {GameMode} from "@/js/gameMode";


export class Game {
    constructor(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas)
        this.scene = new Scene(this.engine)
        NftScene.init(this.scene)
        this.gameMode = new GameMode(this.scene)


        window.addEventListener("resize", () => {
            this.engine.resize()
        })
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }
}

