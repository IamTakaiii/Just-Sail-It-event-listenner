import { ethers } from "ethers"
import { redis_publisher } from "../RedisPubSub/PubSub.js"

export function create (from, id, name, event ) {
    console.log("Create Funding hook !!!")
    let createEvent = { from, id, name, event }
    console.log(JSON.stringify(createEvent, null, 4))
    redis_publisher.publish('project:create_done', name)
}

export function donate (from, to, value, event) {
    console.log("Donate Funding hook !!!")
    let donateEvent = {  from, to, value: ethers.utils.formatEther(value._hex), event  }
    console.log(JSON.stringify(donateEvent, null, 4))
    redis_publisher.publish('project:donate_done', `${from} to ${to} - ${ethers.utils.formatEther(value._hex)}`)
}

export function withdraw(from, _to, value, event) {
    console.log("Withdraw Funding hook !!!")
    let withdrawEvent = { from, value: ethers.utils.formatEther(value._hex), event }
    console.log(JSON.stringify(withdrawEvent, null, 4));
    redis_publisher.publish('project:withdraw_done', 'withdraw done')
}