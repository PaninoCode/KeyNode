const fs = require('fs');
const path = require('path');
const request = require('request');
const progress = require('request-progress');
const AdmZip = require("adm-zip");
const cliProgress = require('cli-progress');

const KeyLogger = require("./KeyLogger.js"); // * Logging component. KeyNode + Logger.
const { MongoServerError } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

exports.CreateClient = (MongoDBUrl, func) => {
    var url = "mongodb://localhost:27017/";

    KeyLogger.InfoLog("Connecting to MongoDB...");
    MongoClient.connect(url, function(err, db) {
        if (err) {
            KeyLogger.ErrorLog("Error connecting to MongoDB! Please start the mongoDB server if you haven't already done so. \nFull error log:\n" + err);
            func(false, null);
            return;
        }
        var dbo = db.db("KeyNode");
        KeyLogger.SuccessLog("MongoDB client was created successfully!");

        KeyLogger.InfoLog("Creating collections...")
        const collections = ["users", "vaults"];
        let created_collections = 0;
        collections.forEach(collection_name => {
            dbo.createCollection(collection_name, function(err, res) {
                if (err.code == "48" && err.name == "MongoServerError") {
                    KeyLogger.WarningLog("Collection `" + collection_name + "` already exists, Ignoring"); 
                    created_collections++;
                } else if (err) {
                    KeyLogger.ErrorLog("Error while creating collections: " + err.code + err.name);
                    func(false, null);
                    return;
                } else {
                    KeyLogger.SuccessLog("Collection `" + collection_name + "` was created successfully!");
                    created_collections++;
                }
                //db.close();
            });
        });
        func(true, db);
        return;
    });
}


// exports.DownloadAndExtract = (downloadLink, name, func) => {

//     if(fs.existsSync(path.join("./data/mongodb_data", name))){
//         func(true, "");
//         return;
//     };

//     const downloadProgress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
//     console.log("\n");
//     downloadProgress.start(100, 0);
//     progress(request(downloadLink), {
//     })
//     .on('progress', function (state) {
//         downloadProgress.update(Math.round(state.percent * 100));
//     })
//     .on('error', function (err) {
//         func(false, err);
//     })
//     .on('end', function () {
//         var zip = new AdmZip(path.join("./data/mongodb_data", name));
//         zip.extractAllTo(path.join("./data/mongodb_data"), true);
//         downloadProgress.update(100);

//         downloadProgress.stop();
//         console.log("\n");
//         func(true, "");
//     })
//     .pipe(fs.createWriteStream(path.join("./data/mongodb_data", name)))

// }

// exports.Start = (folderName, func) => {
//     // fs.readdir("./data/mongodb_data", { withFileTypes: true }, (err, dir) => {
//     //     if (dir) {
//     //         dir.filter(dirent => dirent.isDirectory()).forEach(dirent => {
//     //             console.log(dirent);
//     //         })
//     //     }
//     // });

//     const { exec } = require('child_process');

//     exec(path.join("./data/mongodb_data", folderName, "bin/mongod.exe"), (error, stdout, stderr) => {
//       if (error) {
//         console.error(`error: ${error.message}`);
//         return;
//       }
    
//       if (stderr) {
//         console.error(`stderr: ${stderr}`);
//         return;
//       }
    
//       console.log(`stdout:\n${stdout}`);
//     });
    
    
// }