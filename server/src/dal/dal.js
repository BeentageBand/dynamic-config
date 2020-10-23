const loki = require('lokijs');
const dal = new loki('example.db');
const confs = dal.addCollection('conf');

module.exports = confs;