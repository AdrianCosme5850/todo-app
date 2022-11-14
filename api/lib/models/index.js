'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./data-collection.js');
const userSchema = require('./users/model')
const tasksSchema = require('./tasks/model');
// TODO: Import your Models here and configure your Collections.

const DATABASE_URL = process.env.API_DATABASE_URL || 'sqlite:api:';

const sequelize = new Sequelize(DATABASE_URL);
let userModel = userSchema(sequelize, DataTypes);
let tasksModel = tasksSchema(sequelize, DataTypes);

module.exports = {
  api_db: sequelize,
  users: new Collection(userModel),
  tasks: new Collection(tasksModel),
  // export our collection
};