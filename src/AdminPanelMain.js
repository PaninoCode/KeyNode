const http = require('http');
const fs = require('fs');
const path = require('path');

const OpenAndServe = require("./OpenAndServe.js");

exports.StartServer = (ADMIN_PORT) => {
    const requestListener = function (req, res) {
        if(req.url.startsWith("/api")){
            let apiRes = ServeApi(req);
            res.writeHead(200, {'Content-Type': apiRes[0]});
            res.end(apiRes[1]);
        }
        if(req.url.startsWith("/")){
            let staticRes = ServeStatic(req);
            res.writeHead(200, { 'content-type': staticRes[0] });
            res.end(staticRes[1]);
        }
    }
    
    const server = http.createServer(requestListener);
    
    server.listen(ADMIN_PORT);

    return true;
}

function ServeApi(req){
    return ["application/json", JSON.stringify({})]
}

function ServeStatic(req){
    let fileString = ["text/html", "<h1>Not found.</h1>"];

    if(req.url.endsWith(".js")){
        fileString[0] = "text/javascript";
    }else if(req.url.endsWith(".css")){
        fileString[0] = "text/css";
    }else if(req.url.endsWith(".html")){
        fileString[0] = "text/html";
    }else if(req.url.endsWith(".png") || req.url.endsWith(".jpg") || req.url.endsWith(".jpeg") || req.url.endsWith(".gif")){
        fileString[0] = "image/png";
    }else{
        fileString[0] = "text/html";
        return getFile(fileString, path.join('./app', req.url, "index.html"));
    }

    return getFile(fileString, path.join('./app', req.url));
}

function getFile(fileString, filePath){
    try{
        if(filePath.endsWith(".html")){
            fileString[1] = getFullPage(filePath);
        }else{
            fileString[1] = fs.readFileSync(filePath).toString();
        }
    }catch{
        fileString[0] = "text/html";
        fileString[1] = fs.readFileSync(path.join("./app", "errorPages", "404.html")).toString();
    } 
    return fileString;
}

function getFullPage(filePath){
    let content = fs.readFileSync(path.join("./app", "masterPages", "no-user.html")).toString().replace("<!--content-->", fs.readFileSync(filePath).toString());
    return content;
}