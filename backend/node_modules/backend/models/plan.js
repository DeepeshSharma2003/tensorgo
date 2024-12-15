const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Plan = sequelize.define('Plan', {
    plan_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    plan_name: { type: DataTypes.STRING, allowNull: false },
    min_users: { type: DataTypes.INTEGER, allowNull: false },
    max_users: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    trial_days: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'plan', timestamps: false });

module.exports = Plan;
