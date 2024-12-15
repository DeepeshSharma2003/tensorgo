const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Subscription = sequelize.define('Subscription', {
    sub_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    org_id: { type: DataTypes.INTEGER, allowNull: false },
    plan_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false },
    users_allowed: { type: DataTypes.INTEGER, allowNull: false },
    users_added: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'subscription',
    timestamps: false
});

module.exports = Subscription;
