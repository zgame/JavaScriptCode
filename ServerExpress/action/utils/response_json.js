

function response_json (success,data, message) {
    let str_json = {};
    str_json["code"] = 777;     // 失败
    if(success){
        str_json["code"] = 20000;   //成功
    }
    str_json["data"] = data;
    str_json["message"] = message;

    let json1 = JSON.stringify(str_json, null, 4);     //使用四个空格缩进
    console.debug("str_json-----------"+json1);
    return str_json;
}


module.exports = response_json;