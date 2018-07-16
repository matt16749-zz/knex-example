var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
// console.log(config);
var knex = require('knex');
module.exports = knex(config);
