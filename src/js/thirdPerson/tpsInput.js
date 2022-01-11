import {ICameraInput} from "@babylonjs/core/Cameras/cameraInputsManager";
import {ArcRotateCamera, KeyboardEventTypes, Matrix, Quaternion, Vector3} from "@babylonjs/core";
import {PlayerTPS} from "@/js/thirdPerson/playerTPS";
import * as GUI from "@babylonjs/gui";

export class TpsInput implements ICameraInput<ArcRotateCamera> {

    w = false
    s = false
    a = false
    d = false

    x = 0
    y = 0
    ox = 0
    oy = 0

    constructor(tpsPlayer: PlayerTPS) {
        this.player = tpsPlayer
    }

    getClassName(): string {
        return 'tpsInput'
    }

    getSimpleName(): string {
        return "tpsInput"
    }

    attachControl(noPreventDefault: boolean) {
        console.log('input attach')
        // keyboard
        this.obs = this.camera._scene.onKeyboardObservable.add(e => {
            if (e.event.key.toLowerCase() === 'w') {
                this.w = e.type === KeyboardEventTypes.KEYDOWN
            }
            if (e.event.key.toLowerCase() === 's') {
                this.s = e.type === KeyboardEventTypes.KEYDOWN
            }
            if (e.event.key.toLowerCase() === 'a') {
                this.a = e.type === KeyboardEventTypes.KEYDOWN
            }
            if (e.event.key.toLowerCase() === 'd') {
                this.d = e.type === KeyboardEventTypes.KEYDOWN
            }
        })

        //touch
        this.joyPanel = GUI.AdvancedDynamicTexture.CreateFullscreenUI('joy')
        this.joyOut = new GUI.Ellipse('joyOut')
        this.joyOut.isPointerBlocker = true
        this.joyOut.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.joyOut.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.joyOut.height = '175px'
        this.joyOut.width = '175px'
        this.joyOut.left = '50px'
        this.joyOut.top = '-25px'
        this.joyOut.thickness = 0
        this.joyPanel.addControl(this.joyOut)

        let imag1 = new GUI.Image('image1', 'out.png')
        this.joyOut.addControl(imag1)

        this.joyInner = new GUI.Ellipse('joyInner')
        this.joyInner.height = '71px'
        this.joyInner.width = '71px'
        this.joyOut.addControl(this.joyInner)

        let imag2 = new GUI.Image('image2', 'inline.png')
        this.joyInner.addControl(imag2)

        this.joyOut.onPointerDownObservable.add(e => {
            this.isdown = true
        })

        this.joyOut.onPointerUpObservable.add(e => {
            this.isdown = false

            this.ox = 0
            this.oy = 0
            this.joyInner.top = this.oy
            this.joyInner.left = this.ox
        })

        this.joyOut.onPointerMoveObservable.add(e => {
            if (this.isdown) {
                this.ox = e.x - this.joyOut.centerX
                this.oy = e.y - this.joyOut.centerY
                this.joyInner.top = this.oy
                this.joyInner.left = this.ox
            }
        })

    }

    detachControl() {
        console.log('input detach')
        if (this.obs) {
            this.obs.unregisterOnNextCall = true
        }
    }

    checkInputs() {
        this.x = (this.a ? -1 : 0) + (this.d ? 1 : 0) + this.ox
        this.y = (this.w ? 1 : 0) + (this.s ? -1 : 0) - this.oy
        let translate = new Vector3(this.y / -1, 0, this.x).normalize()
        translate = Vector3.TransformNormal(translate, Matrix.RotationY(this.camera.alpha * -1))
        if (translate.length() > 0) {
            let targetRotation = Quaternion.RotationQuaternionFromAxis(translate.clone(), Vector3.Up(), translate.cross(Vector3.Up())).multiply(Quaternion.RotationYawPitchRoll(Math.PI * 1.5, 0, 0))
            this.player.mesh.rotationQuaternion = Quaternion.Slerp(this.player.mesh.rotationQuaternion, targetRotation, 0.2)
            translate.scaleInPlace(0.15)
            translate.addInPlace(new Vector3(0, -0.1, 0))
            this.player.moveWithCollisions(translate)
            this.player.setAnimState('run')
        } else {
            this.player.setAnimState('idle')
        }
    }

}
