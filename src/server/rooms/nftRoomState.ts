import {ArraySchema, MapSchema, Schema, type} from "@colyseus/schema";
import {Vector3State} from "../stateType/vector3State";


export class PlayerState extends Schema {
    @type(['number']) transformState = new ArraySchema(0, 0, 0, 0, 0, 0);//position + rotation
    @type("string") animState;
    @type("string") playerName;
}

export class NftRoomState extends Schema {
    @type({map: PlayerState}) playerMap = new MapSchema<PlayerState>();

    createPlayer(sessionID) {
        this.playerMap.set(sessionID, new PlayerState())
    }

    removePlayer(sessionID) {
        this.playerMap.delete(sessionID)
    }


}
