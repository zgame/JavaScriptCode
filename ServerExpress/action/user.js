let db = require('../model/db');
let res_json = require('./utils/response_json');
let tokens = require('./utils/token');
let user = {};

//-------------------------用户登录----------------------------
 user.login = function(req, res, next) {
    // let user_name = req.query.username;
    // let pwd = req.query.password;
    let user_name = req.body.username;
    let pwd = req.body.password;

    console.log("user:",user_name);
    console.log("pwd:",pwd);

    let connection = db.connection();
    let  sql = "SELECT pwd FROM user where name = '" + user_name + "'";
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            return;
        }
        // let str_json = JSON.stringify(result, null, 4);
        let success = false;
        let message = "";
        let data = {};
        if(result.length>0){
           // 有这个用户
            if(result[0]["pwd"] === pwd) {
                success = true;
                message = "登录成功!";
                data["token"] = tokens.createToken(user_name, 3600*24*10)
            }else{
                message = "密码错误!";
            }
        }else{
            message = "没有这个用户!";
        }
        //{"code":20000,"data":{"token":"admin"}}
        res.send(res_json(success,data,message));
    });
};
//-------------------------用户信息----------------------------
user.info =  function(req, res, next) {
    let token = req.query.token;
    let data = {};
    // console.debug("tokens.checkToken(token)"+tokens.checkToken(token));

    if(tokens.checkToken(token)){
        let resDecode = tokens.decodeToken(token);
        let user_name = resDecode["payload"]["data"];
        // console.debug("resDecode",user_name);
        // if token == tokens.checkToken(token)

        let connection = db.connection();
        let  sql = "SELECT is_admin FROM user where name = '" + user_name + "'";
        connection.query(sql,function (err, result) {
            if (err) {
                console.log('[SELECT  ERROR] - ', err.message);
                return;
            }
            // console.debug("result[0][\"is_admin\"]",result[0]["is_admin"]);
            if(result[0]["is_admin"] === 1){
                data["roles"] = ["admin","view"];
            }else{
                data["roles"] = ["view"];
            }
            data["name"] = user_name;
            data["avatar"] = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
            //{"code":20000,"data":{"roles":["admin"],"name":"admin","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"}}
            res.send(res_json(true,data,"获取用户信息"));
        });

    }else{
        // token err
        let str_json = {};
        str_json["code"] = 50008;     // token失败
        str_json["data"] = data;
        str_json["message"] = "用户token验证错误";
        res.send(str_json);
    }


};

//-------------------------用户登出----------------------------
user.logout =  function(req, res, next) {
    //{"code":20000,"data":"success"}
    res.send(res_json(true,"success","用户登出"));
};

module.exports = user;