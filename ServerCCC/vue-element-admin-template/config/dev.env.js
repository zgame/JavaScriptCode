'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://10.10.15.160:5000"',
  BASE_API: '"http://114.55.171.175:5000"',
  // BASE_API: '"http://172.16.140.131:5000"',
})
