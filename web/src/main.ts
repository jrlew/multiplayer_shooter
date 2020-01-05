import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Player } from "./player";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const player = new Player();

function buildConnection(): HubConnection {
    return new HubConnectionBuilder()
        .withUrl("http://localhost:9001/game")
        .build();
}

function attachConnectionListeners(connection: HubConnection) {
    connection.on("ReceiveMessage", (user, message) => {
        console.log(user, " - ", message);
    });

    connection.on("RegistrationComplete", (localPlayerGuid) => {
        player.id = localPlayerGuid;
        console.log(`RegistrationComplete - playerGuid: ${player.id}`);
    });

    connection.on("PlayerLocation", (playerId, playerLocation) => {
        console.log(`Player: ${playerId} Location: ${playerLocation}`);
        console.log(playerLocation);
    });
}

async function connect(connection: HubConnection) {
    try {
        await connection.start();
    } catch (error) {
        console.log(error);
    }
    console.log("connected");
}

async function register(connection: HubConnection) {
    try {
        await connection.invoke("Register");
    } catch (error) {
        console.log("RegistrationError: ", error);
    }
}

async function getPlayerLocation(connection: HubConnection, playerGuid: string) {
    try {
        await connection.invoke("GetPlayerLocation", playerGuid);
    } catch (error) {
        console.log("GetPlayerLocationError: ", error);
    }
}

async function updatePlayerLocation(connection: HubConnection, playerGuid: string) {
    try {
        await connection.invoke("UpdatePlayerLocation", playerGuid, JSON.stringify(player.location));
    } catch (error) {
        console.log("UpdatePlayerLocationError: ", error);
    }
}

async function sleep(sleepInMilliseconds: number) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("whatever");
        }, sleepInMilliseconds);
    });
}

async function main() {
    const connection: HubConnection = buildConnection();
    attachConnectionListeners(connection);
    await connect(connection);
    await register(connection);
    await getPlayerLocation(connection, player.id);
    player.location.x = 2;
    player.location.y = 3;
    await updatePlayerLocation(connection, player.id);
    await sleep(500);
    await getPlayerLocation(connection, player.id);
    // await connection.stop();
    while (true) {
        //
    }
}

main();
