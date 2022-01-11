import {AnimationGroup, Scalar} from "@babylonjs/core";

class blenderParam {
    anim: AnimationGroup
    weight: number
}

export class AnimBlender {
    animInfo: Array<blenderParam>

    constructor(AnimGroupList: Array<AnimationGroup>, scene, defaultAnim) {
        this.scene = scene
        this.targetAnim = AnimGroupList[0].name
        this.animGroupList = AnimGroupList
        this.animInfo = []
        this.animGroupList.forEach((group) => {
            group.play(true)
            group.setWeightForAllAnimatables(0)
            this.animInfo.push(
                {
                    anim: group,
                    weight: 0
                })
        })
        if (defaultAnim) {
            let temp = this.animInfo.find(g => g.anim.name.indexOf(defaultAnim) !== -1)
            if (temp) {
                this.targetAnim = defaultAnim
                temp.weight = 1
            }
        }

        this.scene.onBeforeAnimationsObservable.add(e => {
            this.animInfo.forEach((param) => {
                if (this.targetAnim === param.anim.name) {
                    param.weight = Scalar.Clamp(param.weight + 0.08, 0, 1)
                } else {
                    param.weight = Scalar.Clamp(param.weight - 0.06, 0, 1)
                }
                param.anim.setWeightForAllAnimatables(param.weight)

            })
        })
    }

    setTargetAnim = (name: string) => {
        this.targetAnim = name
    }
}
