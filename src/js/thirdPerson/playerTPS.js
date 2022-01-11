import {ArcRotateCamera, Mesh, Quaternion, Scene, SceneLoader, Vector3} from "@babylonjs/core";
import {AnimBlender} from "@/js/animBlender";
import {TpsInput} from "@/js/thirdPerson/tpsInput";
import '@babylonjs/loaders/glTF'
import {Room} from "colyseus.js";


export class PlayerTPS extends Mesh {
    constructor(name: string, scene: Scene, isLocal = true, playerState, room: Room) {
        super(name, scene)
        this.room = room
        this.animState = 'idle'
        this.islocal = isLocal
        this.playerState = playerState

        this.targetPosition = Vector3.Zero()
        this.targetRotation = Quaternion.Zero()
        if (isLocal) {
            this.camera = new ArcRotateCamera('player camera', 0, 1.5, 4, Vector3.Up())
            this.camera.inputs.add(new TpsInput(this))
            this.camera.attachControl()
            this.camera.parent = this
            this.camera.checkCollisions = false
            this.camera.panningDistanceLimit = 0.01
            this.camera.radius = 4
            this.camera.lowerRadiusLimit = 3
            this.camera.upperRadiusLimit = 6
            this.camera.wheelPrecision = 25
            this._scene.activeCamera = this.camera
        }
        this.initMesh().then()

        if (!isLocal) {
            playerState.onChange = (change) => {
                this.setAnimState(playerState.animState)
            }
            playerState.transformState.onChange = (key, value) => {
                this.targetPosition = Vector3.FromArray(playerState.transformState.toArray())
                this.targetRotation = Vector3.FromArray(playerState.transformState.toArray(), 3).toQuaternion()

            }
            playerState.onRemove = () => {
                this.dispose()
            }
        }
    }

    netTick = () => {
        if (this.islocal) {
            let transformData = []
            transformData.push(...this.position.asArray())
            transformData.push(...this.mesh.rotationQuaternion.toEulerAngles().asArray())
            this.room.send('transform', transformData)
        }
    }
    tick = () => {
        if (!this.islocal) {
            this.position = Vector3.Lerp(this.position, this.targetPosition, 0.3)
            this.mesh.rotationQuaternion = Quaternion.Slerp(this.mesh.rotationQuaternion || Quaternion.Zero(), this.targetRotation, 0.3)
        }


    }

    async initMesh() {
        SceneLoader.ImportMesh('', '', 'uebot.glb', this._scene,
            (meshes, particle, askeleton, animtions, nodes) => {
                setInterval(this.netTick, 16)
                this._scene.onBeforeRenderObservable.add(this.tick)

                this.mesh = meshes[0]
                this.mesh.parent = this
                this.animBlender = new AnimBlender(animtions, this._scene, this.animState)
                this.ellipsoid = new Vector3(0.5, 1, 0.5)
                this.ellipsoidOffset = new Vector3(0, 1, 0)
            })
    }

    setAnimState(animState: string) {
        if (this.animBlender && animState && animState !== this.animState) {
            this.animState = animState
            this.animBlender.setTargetAnim(this.animState)
            if (this.islocal) {
                this.room.send('setAnimState', this.animState)
            }
        }
    }

}
