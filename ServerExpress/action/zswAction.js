let db = require('../model/db');

function zswAction(req, res, next) {
    let user = req.query.user;
    let idx = req.query.id;

    console.log("user:",user);
    console.log("id:",idx);

    let re = [];
    re.push(user);
    re.push(idx);


    let connection = db.connection();
    let  sql = 'SELECT * FROM student';
    connection.query(sql,function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            return;
        }
        let str_json = JSON.stringify(result, null, 4);     //使用四个空格缩进
        res.send(str_json);
    });


}

module.exports = zswAction;