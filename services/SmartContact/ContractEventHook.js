import dotenv from "dotenv"
import { ethers } from "ethers"
import ABI from "./abi.json" assert { type: "json" }
import { create, donate, withdraw } from "./callbackFn.js"

dotenv.config()

export async function ContractEventHook() {
    const contractAddress = process.env.CONTRACT_ADDRESS
    const api = process.env.API_PROVIDER
    const provider = new ethers.providers.WebSocketProvider(
        `wss://goerli.infura.io/ws/v3/${api}`
    )
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    console.log('now listenning event...')

    contract.on("CreateFunding", (from, id, name, event) => create(from, id, name, event));
    contract.on("DonateFunding", (from, value, event) => donate(from, value, event))
    contract.on("WithdrawFunding", (from, value, event) => withdraw(from, value, event))
}