const fs = require('fs');
const path = require('path');

function GetCurrentDateTime(fileNameFormat) {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    switch(fileNameFormat) {
        case true:
            return year + "-" + month + "-" + day;
            break;
        case false:
            return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
            break;
    }
}

/*
function SaveToFile (data) {
    fs.appendFile(path.join("./KeyLogger/", GetCurrentDateTime(true) + ".log"), data + "\n", (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
*/

function InsertType (type, message) {
    if(message.includes("\n")){
        let array = message.split("\n");
        let result;
        for (let i = 0; i < array.length; i++) {
            let n = i + 1;
            if(i == 0){
            result = "[ " + GetCurrentDateTime(false) + " ] " + "[ " + type + " ] " + "(" + n + "/" + array.length + ") " + array[i];
            }else{
                result += "\n[ " + GetCurrentDateTime(false) + " ] " + "[ " + type + " ] " + "(" + n + "/" + array.length + ") " + array[i];
            }
        }
        return result;
    }else{
        return "[ " + GetCurrentDateTime(false) + " ] " + "[ " + type + " ] " + message;
    }
}

/*
? FgBlack = "\x1b[30m"    BgBlack = "\x1b[40m"    Reset = "\x1b[0m"
? FgRed = "\x1b[31m"      BgRed = "\x1b[41m"      Bright = "\x1b[1m"
? FgGreen = "\x1b[32m"    BgGreen = "\x1b[42m"    Dim = "\x1b[2m"
? FgYellow = "\x1b[33m"   BgYellow = "\x1b[43m"   Underscore = "\x1b[4m"
? FgBlue = "\x1b[34m"     BgBlue = "\x1b[44m"     Blink = "\x1b[5m"
? FgMagenta = "\x1b[35m"  BgMagenta = "\x1b[45m"  Reverse = "\x1b[7m"
? FgCyan = "\x1b[36m"     BgCyan = "\x1b[46m"     Hidden = "\x1b[8m"
? FgWhite = "\x1b[37m"    BgWhite = "\x1b[47m"
*/

exports.CustomLog = (message, type, colorId) => {
    if( colorId == undefined )
        colorId = 0;
    console.log('\x1b[' + colorId + 'm%s\x1b[0m', InsertType(type, message));
}

exports.InfoLog = (message) => {
    console.log('\x1b[' + 34 + 'm%s\x1b[0m', InsertType("INFO" , message));
}

exports.SuccessLog = (message) => {
    console.log('\x1b[' + 32 + 'm%s\x1b[0m', InsertType("SUCCESS" , message));
}

exports.WarningLog = (message) => {
    console.log('\x1b[' + 33 + 'm%s\x1b[0m', InsertType("WARNING" , message));
}

exports.ErrorLog = (message) => {
    console.log('\x1b[' + 31 + 'm%s\x1b[0m', InsertType("ERROR" , message));
}