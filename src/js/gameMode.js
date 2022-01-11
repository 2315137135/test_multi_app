import {PlayerTPS} from "@/js/thirdPerson/playerTPS";
import {Client} from "colyseus.js";

const serverAddress = 'ws://192.168.0.207:2567'

export class GameMode {
    constructor(scene) {
        this.scene = scene
        this.BeginPlay().then()
    }

    BeginPlay = async () => {
        this.client = new Client(serverAddress)
        this.room = await this.client.joinOrCreate('nft_room')
        this.room.state.playerMap.onAdd = (state, sessionID) => {
            if (sessionID === this.room.sessionId) {
                new PlayerTPS('player', this.scene, true, state, this.room)
            } else {
                new PlayerTPS(sessionID, this.scene, false, state, this.room)
            }
        }

    }
}
