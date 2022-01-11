import {Schema, type} from "@colyseus/schema";

export class Vector3State extends Schema {
    @type('float32') x = 0;
    @type('float32') y = 0;
    @type('float32') z = 0;
}
