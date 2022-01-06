import Web3 from "web3";
import MoebiusFactoryAbi from "./abi/MoebiusFactory.json";
import MoebiusRepositoryAbi from './abi/MoebiusRepository.json';
import MoebiusNFTAbi from "./abi/MoebiusNFT.json";
import NFTStakingPoolAbi from "./abi/NFTStakingPool.json";
import {getContractRes} from './base'

const { MoebiusRepositoryAddr, MoebiusFactoryAddr, MoebiusNFTAddr,MoebiusPool1Addr,MoebiusPool1001Addr,MoebiusPool2001Addr, web3Provider: infura,  } = require("./const");

const web3 = new Web3(new Web3.providers.HttpProvider(infura));
const MoebiusFactoryContract = new web3.eth.Contract(MoebiusFactoryAbi, MoebiusFactoryAddr);
const MoebiusRepositoryContract = new web3.eth.Contract(MoebiusRepositoryAbi, MoebiusRepositoryAddr)
const MoebiusNFTContract = new web3.eth.Contract(MoebiusNFTAbi, MoebiusNFTAddr)
const MoebiusPool1AddrContract = new web3.eth.Contract(NFTStakingPoolAbi, MoebiusPool1Addr)


/**
 * 获取Pool1的已存入分数总数
 * @returns {String} Pool1的已存入分数总数
 */
export async function totalScore () {
  const totalScore = await getContractRes(
      MoebiusPool1AddrContract.methods.totalScore()
  )
  return totalScore
}

/**
 * 获取Pool1的总奖励数
 * @returns {String} Pool1的总奖励数
 */
export async function total_distributed_amount () {
  const total_distributed_amount = await getContractRes(
      MoebiusPool1AddrContract.methods.total_distributed_amount()
  )
  return total_distributed_amount
}

/**
 * 获取Pool1的总期数
 * @returns {String} Pool1的总期数
 */
export async function nr_of_epochs () {
  const nr_of_epochs = await getContractRes(
      MoebiusPool1AddrContract.methods.nr_of_epochs()
  )
  return nr_of_epochs
}

/**
 * 获取Pool1的分数门槛
 * @returns {String} Pool1的分数门槛
 */
export async function scoreLine () {
  const scoreLine = await getContractRes(
      MoebiusPool1AddrContract.methods.scoreLine()
  )
  return scoreLine
}

/**
 * 获取Pool1的某个用户地址的当前期的有效存入分数
 * @inputs address:用户钱包地址  nftContractAddress：nft合约的地址（固定） epoch：期数
 * @returns {String} Pool1的某个用户地址的当前期的有效存入分数
 */
export async function getEpochUserBalance (address,nftContractAddress, epoch) {
  return await getContractRes(
      MoebiusPool1AddrContract.methods.getEpochUserBalance(address, nftContractAddress, epoch)
  )
}

/**
 * 获取Pool1的某个用户地址的存入nft个数
 * @inputs address:用户钱包地址
 * @returns {String} Pool1的某个用户地址的存入nft个数
 */
export async function balanceOf (address) {
  const balanceOf = await getContractRes(
      MoebiusPool1AddrContract.methods.balanceOf(address)
  )
  return balanceOf
}

/**
 * 获取Pool1的当前期数
 * @returns {String} Pool1的当前期数
 */
export async function getCurrentEpoch () {
  const getCurrentEpoch = await getContractRes(
      MoebiusPool1AddrContract.methods.getCurrentEpoch()
  )
  return getCurrentEpoch
}

/**
 * 获取该地址名下有几个nft
 * @returns {String} 有效持币地址数
 */
export async function nftBalance (addr) {
  const balance = await getContractRes(
    MoebiusNFTContract.methods.balanceOf(addr)
  )
  return balance
}


/**
 * 根据序列号把每一个nft的id获取到该物品的属性
 * @param {*} addr
 * @returns
 */
export async function getTokens (addr) {
  const balance = await nftBalance(addr);
  const res = []

  for (let i = 0 ; i < +balance; i++) {
    try {
      // 根据序列号把每一个nft的id获取到
      const id = await getContractRes(
        MoebiusNFTContract.methods.tokenOfOwnerByIndex(addr, i)
      )
      // 根据id获取到该物品的属性。
      const item = await getContractRes(
        MoebiusRepositoryContract.methods.get(id)
      )
      item.id = id
      res.push({
        ...item
      })
    } catch (err) {
      console.error(err)
    }
  }

  return res
}

// demo
let userAddress = '0x59455a9556701Aa3b85b74D2D7E2928682804E6C'
let epoch = 1

getEpochUserBalance(userAddress,MoebiusNFTAddr,epoch).then(res => {
  console.log(res)
})

// getCurrentEpoch().then(res => {
//   console.log(res)
// })

// balanceOf(userAddress).then(res => {
//   console.log(res)
// })

// getTokens('0x59455a9556701Aa3b85b74D2D7E2928682804E6C').then(res => {
//   console.log(res)
// })

// clubCount('0x5f53AAe8d5Ab2Bd1169CEa102ffF62905427AF13').then(res => {
//   console.log(res)
// })
