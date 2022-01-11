import Arena from "@colyseus/arena"
import {monitor} from "@colyseus/monitor";


import {NftRoom} from "./rooms/nftRoom";

export default Arena({
    getId: () => 'my colyseus app',
    initializeGameServer: (app) => {

        //room
        app.define('nft_room', NftRoom)
            .enableRealtimeListing()


        //events
        app.onShutdown(function () {
            console.log(`game server is going down.`);
        });
    },

    initializeExpress: (app) => {
        app.use('/colyseus', monitor());
    },
})
