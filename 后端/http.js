const http = require("http");
const fs = require("fs");
const path = require("path");
const  server = http.createServer(function(req, res){
    if(req.url == "/taobao"){
        render("/taobao.html", res)
    }else if(req.url == "/baidu"){
        render("/baidu.html", res)
    }else if(req.url == "/"){
        render("/index.html", res)
    }else{
        render("/404.html".res)
    }
});

server.listen(3000)
function render(fileName, res){
    fs.readFile(path.resolve(__dirname,'views',fileName),function(err, data){
        if(err){
            res.statusCode = 500;
            res.statusMessage = 'faild';
            return;
        }
        res.end(data)
    })
} 