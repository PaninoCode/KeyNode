const fs = require('fs');
const path = require('path');
const request = require('request');
const progress = require('request-progress');
const AdmZip = require("adm-zip");
const cliProgress = require('cli-progress');


exports.DownloadAndExtract = (downloadLink, name, func) => {

    

    const downloadProgress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    console.log("\n");
    downloadProgress.start(100, 0);
    progress(request(downloadLink), {
    })
    .on('progress', function (state) {
        downloadProgress.update(Math.round(state.percent * 100));
    })
    .on('error', function (err) {
        func(false, err);
    })
    .on('end', function () {
        var zip = new AdmZip(path.join("./data/mongodb", name));
        zip.extractAllTo(path.join("./data/mongodb"), true);
        downloadProgress.update(100);

        downloadProgress.stop();
        console.log("\n");
        func(true, "");
    })
    .pipe(fs.createWriteStream(path.join("./data/mongodb", name)))

}