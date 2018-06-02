

function response_json (success,data, message) {
    let str_json = {};
    str_json["code"] = 777;     // 失败
    if(success){
        str_json["code"] = 20000;   //成功
    }
    str_json["data"] = data;
    str_json["message"] = message;

    return str_json;
}


module.exports = response_json;