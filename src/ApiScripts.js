var bodyParser = require('body-parser');
var crypto = require('crypto');


exports.handleRequest = (url, body, res, CLIENT, callback) => {
    switch (url) {
        case "/api/login":
            CLIENT.db("KeyNode").collection("users").findOne({username: body.username}, function(err, result){
                if(err) throw err;
                if(result != null && result != undefined && result.password == crypto.createHash('sha256').update(body.password).digest('hex')){
                    callback(true, "{\"success\": true, \"token\": \"" + "0" + "\"}");
                }else{
                    callback(true, "{\"success\": false, \"token\": \"" + "-1" + "\"}");
                }
            });
            break;
        case "/api/register":
            CLIENT.db("KeyNode").collection("users").findOne({username: body.username}, function(err, result){
                if(err) throw err;
                if(result != null && result != undefined){
                    callback(true, "{\"success\": \"username_already_exists\", \"token\": \"" + "-1" + "\"}");
                }else{
                    CLIENT.db("KeyNode").collection("users").insertOne({full_name: body.full_name, username: body.username, email_address: body.email_address, password: crypto.createHash('sha256').update(body.password).digest('hex')}, function(err, result){
                        if(err) throw err;
                        console.log(result);
                        if(result != null && result != undefined && result.acknowledged == true){
                            callback(true, "{\"success\": \"true\", \"token\": \"" + "0" + "\"}");
                        }else{
                            callback(true, "{\"success\": \"false\", \"token\": \"" + "-1" + "\"}");
                        }
                    }); 
                }
            });               
            break;
    }
}