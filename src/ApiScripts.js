var bodyParser = require('body-parser')

exports.hadleRequest = (req, res, CLIENT, callback) => {
    switch (req.url){
        case "/api/login":
            ApiLogin();
    }
}