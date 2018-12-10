let redis = require('redis')
let dbRedis = {}


dbRedis.connection = function () {
    let client = redis.createClient(6379, '172.16.140.123')
    client.auth('Soonyo123',function () {
    // console.log("pwd ok")
    })

    return client
}




dbRedis.hset = function(client,dir,key,value){
    client.hset(dir,key,value)
}

dbRedis.hget = function(client,dir,key){
    client.hget(dir,key, function(err, value){
        console.log("value:      ",value)
    })

    client.keys("*",function (value) {
        console.log("keys:      ",value)
    })
}



module.exports = dbRedis;