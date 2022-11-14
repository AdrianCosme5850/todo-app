'use strict';

const { DataTypes } = require("sequelize");

const tasksSchema = (sequelize, DataTypes) => sequelize.define( 'Tasks', {
    difficulty: {type: DataTypes.STRING, required: true},
    text: { type: DataTypes.STRING, required: true },
    assignee: { type: DataTypes.STRING, required: true},
    complete: { type: DataTypes.BOOLEAN, required: true},
});

module.exports = tasksSchema;