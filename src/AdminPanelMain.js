const http = require('http');
const fs = require('fs');
const path = require('path');

const OpenAndServe = require("./OpenAndServe.js");

exports.StartServer = (ADMIN_PORT) => {
    const requestListener = function (req, res) {
        if(req.url == "/"){
            res.writeHead(200, { 'content-type': 'text/html' })
            res.end(OpenAndServe.FetchAndReplace("./app/admin/index.html", ["[ADMIN-PORT]"], [ADMIN_PORT]));
        }else if(req.url == "/api/stopserver"){
            res.writeHead(200, { 'content-type': 'text/html' })
            res.end("Server is stopping");
            process.exit();
        }else if(req.url.startsWith("/static") && req.url.endsWith(".js")){
            res.writeHead(200, { 'content-type': 'text/javascript' })
            fs.createReadStream(path.join('./app', req.url)).pipe(res);
        }else if(req.url.startsWith("/static") && req.url.endsWith(".css")){
            res.writeHead(200, { 'content-type': 'text/css' })
            fs.createReadStream(path.join('./app', req.url)).pipe(res);
        }
    }
    
    const server = http.createServer(requestListener);
    
    server.listen(ADMIN_PORT);
}