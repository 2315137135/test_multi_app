import {Client, Room} from "@colyseus/core";
import {NftRoomState} from "./nftRoomState";
import {ArraySchema} from "@colyseus/schema";

export class NftRoom extends Room<NftRoomState> {
    maxClients: 32;


    onCreate(options) {
        console.log('server is create')
        this.setState(new NftRoomState())

        this.onMessage('setAnimState', (client, data) => {
            let player = this.state.playerMap.get(client.sessionId)
            player.animState = data
        })
        this.onMessage('transform', ((client, message) => {
            let player = this.state.playerMap.get(client.sessionId)

            for (let i = 0; i < 6; i++) {
                player.transformState.setAt(i, message[i])
            }
        }))

    }

    onJoin(client: Client) {
        console.log(client.sessionId, 'is join')
        this.state.createPlayer(client.sessionId)
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        console.log(client.sessionId, 'is leave')
        this.state.removePlayer(client.sessionId)
    }
}
