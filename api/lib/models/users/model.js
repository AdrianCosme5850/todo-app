'use strict';

const { DataTypes } = require("sequelize");

const userSchema = (sequelize, DataTypes) => sequelize.define( 'User', {
    name:{ type: DataTypes.STRING, required: true },
    password: {type: DataTypes.STRING, required: true},
    capabilities: {type: DataTypes.STRING, required: true},
    token: { type: DataTypes.STRING, required: true}
});

module.exports = userSchema;