/*

* To read the comments correctly: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

todo: Finish the Logging System.
todo: Finish AdminPanel Management.
todo: Create docs.

* 16/04/2022 by @alex65ferrari

*/

const open = require('open');

require('dotenv').config();

const AdminPanelMain = require("./AdminPanelMain.js"); // * Main script for the admin panel management.
const KeyLogger = require("./KeyLogger.js"); // * Logging component. KeyNode + Logger.

if(process.env.RANDOMIZE_USER_PORT){
    const port = Math.floor(Math.random() * (65535 - 1024)) + 1024;
    console.log("User port randomization is set to True. \nRandomized user port is: " + port);
    process.env.USER_PORT = port;
}

KeyLogger.CustomLog("Starting server...", "INFO", 32);

AdminPanelMain.StartServer(process.env.ADMIN_PORT);

open('http://localhost:' + process.env.ADMIN_PORT);