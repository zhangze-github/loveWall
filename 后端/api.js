
const mysql = require('./sql.js');

function api (ctx) {
    const req = ctx.request;
    const res = ctx.response;
    updataData();
    switch(req.path){
        case '/api/add':
            add(req, res);
            break;
        case '/api/get':
            get(req, res);
            break;
        default:
            help(req, res);
    }
}

var mysql1   = require('mysql');
var conn = mysql1.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'test'
});

let arr = []; 
let returnData = [];
function updataData() {
    conn.query("SELECT * FROM `data1` ORDER BY `id` desc limit 0,100", function(err, rows) {
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            arr[i] = rows[i];
        }
        for(i = 0; i < 10; i++){
            returnData[i] = arr.slice(i*10 , (i+1)*10)
        }
        console.log(returnData);
    });
}
function get(req, res){
    res.body = returnData[req.query.index];
}

function add(req, res) {
    (async ()=>{
        let sql = "INSERT INTO `data1` SET ?";
        let params =  {message: req.query.message, title:req.query.title};
        let s = await mysql.row(sql,params);
        updataData();
    })();
    res.body = 'success';
}
function help (req, res){
    res.body = '接口使用说明';
}

module.exports = api;


// function get(req, res){
//     // res.status = 200;
//     // res.message = 'kk';
//     console.log('----------')
//     let index = req.query.index * 10
//     console.log(index)
//     let sql = "SELECT * FROM `data1` ORDER BY `id` desc limit 1,4";
//     mysql.row(sql).then((s = '') => { res.body = JSON.stringify(s); console.log(s);console.log(res)});
    // conn.query(spl, function(err,))


    // res.body = 'fdasf'

// }