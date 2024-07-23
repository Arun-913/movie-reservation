"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const redis_1 = require("redis");
class RedisManager {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: "redis://localhost:6379",
        });
        this.client.connect();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
        }
        return this.instance;
    }
    sendToApi(clientId, message) {
        this.client.publish(clientId, JSON.stringify(message));
    }
}
exports.RedisManager = RedisManager;
