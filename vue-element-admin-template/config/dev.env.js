'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const BASE_HOST = "http://" + process.env.HOST + ":5000"
console.log(BASE_HOST)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // 下面是后台
  // BASE_API: '"http://172.16.140.131:5000"',      // express
  // BASE_API: '"http://localhost:5000"',      // express
  BASE_API: '"http://localhost:8097"',       // gin
})
