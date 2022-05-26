/*

* To read the comments correctly: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

todo: Finish the Logging System.
todo: Finish AdminPanel Management.
todo: Create docs.

* 16/04/2022 by @alex65ferrari

*/

const open = require('open');

require('dotenv').config();

console.log("\n--------------------------------------------------\n");

const HttpServerMain = require("./HttpServerMain.js"); // * Main script for the admin panel management.
const KeyLogger = require("./KeyLogger.js"); // * Logging component. KeyNode + Logger.
const MongodManager = require("./MongodManager.js"); // * MongoDB component.

if(process.env.RANDOMIZE_USER_PORT == "true"){
    const port = Math.floor(Math.random() * (65535 - 1024)) + 1024;
    KeyLogger.InfoLog("User port randomization is set to True. \nRandomized user port is: " + port)
    process.env.USER_PORT = port;
}

MongodManager.CreateClient(process.env.MONGODB_URI, function (success, client) {
    if(success){

        if (HttpServerMain.StartServer(process.env.USER_PORT, process.env.MONGODB_DATABASE_NAME, client, process.env.LATENCY)) {
            KeyLogger.SuccessLog("Server successfully started, on port: " + process.env.USER_PORT);
        }else{
            KeyLogger.ErrorLog("Admin panel failed to start");
        }
    
        open('http://127.0.0.1:' + process.env.USER_PORT);
    }
});