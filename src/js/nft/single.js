import Web3 from "web3";
import {web3Provider} from "./const";

// export const web3 = new Web3(Web3.providers.HttpProvider(web3Provider));
export const web3 = new Web3(Web3.givenProvider);

