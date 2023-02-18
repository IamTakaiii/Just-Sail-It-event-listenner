import { ethers } from "ethers"
import { redis_publisher } from "../RedisPubSub/PubSub.js"

export function create (from, id, name, event ) {
    console.log("Create Funding hook !!!")
    let createEvent = { from, id, name, event }
    const message = JSON.stringify(createEvent, null, 4)
    console.log(message)
    redis_publisher.publish('project:create_done', message)
}

export function donate (from, to, value, event) {
    console.log("Donate Funding hook !!!")
    let donateEvent = {  from, to, value: ethers.utils.formatEther(value._hex), event  }
    const message = JSON.stringify(donateEvent, null, 4)
    console.log(message)
    redis_publisher.publish('project:donate_done', message)
}

export function withdraw(from, _to, value, event) {
    console.log("Withdraw Funding hook !!!")
    let withdrawEvent = { from, value: ethers.utils.formatEther(value._hex), event }
    const message = JSON.stringify(withdrawEvent, null, 4)
    console.log(message)
    redis_publisher.publish('project:withdraw_done', message)
}