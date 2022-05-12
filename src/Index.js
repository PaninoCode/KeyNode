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


KeyLogger.InfoLog("Searching for MongoDB...");

MongodManager.DownloadAndExtract(process.env.MONGODB_DOWNLOAD, "mongodb.zip", function (res, err) {
    if (res) {
        KeyLogger.SuccessLog("MongoDB is downloaded and extracted.");
        if (HttpServerMain.StartServer(process.env.USER_PORT)) {
            KeyLogger.SuccessLog("Server successfully started, on port: " + process.env.USER_PORT);
        }else{
            KeyLogger.ErrorLog("Admin panel failed to start");
        }
    
        open('http://localhost:' + process.env.USER_PORT);
    } else {
        KeyLogger.ErrorLog("MongoDB failed to download and extract.");
        KeuLogger.ErrorLog(err);
    }

});