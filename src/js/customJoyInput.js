import {UniversalCamera, Vector3} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui"

export class CustomJoyInput {
    camera: UniversalCamera

    getClassName(): string {
        return 'customJoyInput'
    }

    getSimpleName(): string {
        return "customJoyInput"
    }

    attachControl(noPreventDefault: boolean) {
        this.joyPanel = GUI.AdvancedDynamicTexture.CreateFullscreenUI('joy')
        this.joyOut = new GUI.Ellipse('joyOut')
        this.joyOut.height = '175px'
        this.joyOut.width = '175px'
        this.joyOut.isPointerBlocker = true
        this.joyOut.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.joyOut.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.joyOut.left = '50px'
        this.joyOut.top = '-25px'
        this.joyPanel.addControl(this.joyOut)

        this.joyInner = new GUI.Ellipse('joyInner')
        this.joyInner.height = '50px'
        this.joyInner.width = '50px'
        this.joyOut.addControl(this.joyInner)

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

    detachControl(element) {
        this.joyPanel.dispose()
    }


    checkInputs() {
        if (this.isdown) {
            let translateTransform = Vector3.TransformCoordinates(new Vector3(this.ox / 4000, 0, this.oy / -4000), this.camera._cameraRotationMatrix);
            if (isNaN(this.camera.cameraDirection.x)) this.camera.cameraDirection = Vector3.Zero()

            this.camera.cameraDirection.addInPlace(translateTransform);
        }
    }
}
