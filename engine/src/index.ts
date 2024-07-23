import 'dotenv/config'
import { createClient, } from "redis";
import { Engine } from "./services/Engine";


async function main() {
    const engine = new Engine(); 
    const redisClient = createClient({
        url: "redis://localhost:6379",
    });
    await redisClient.connect();
    console.log("connected to redis");

    while (true) {
        const response = await redisClient.rPop("messages" as string)
        if (!response) {

        }  else {
            console.log("inside engine sub: ", response);
            engine.process(JSON.parse(response));
        }        
    }

}

main();