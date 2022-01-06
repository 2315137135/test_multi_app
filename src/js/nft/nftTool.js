import Web3 from "web3";

export class NftTool {
    static async login() {
        var web3 = new Web3(Web3.givenProvider );

        let accounts = await web3.eth.requestAccounts()
        console.log(accounts)
    }
}
