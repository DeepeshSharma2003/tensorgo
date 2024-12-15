const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Billing = sequelize.define('Billing', {
    bil_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    org_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    plan_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    payment_status: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    date: { 
        type: DataTypes.DATE, 
        allowNull: false 
    }
}, { 
    tableName: 'billing', 
    timestamps: false 
});

module.exports = Billing;
