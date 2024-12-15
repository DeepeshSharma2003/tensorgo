const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Organisation = sequelize.define('Organisation', {
    org_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    org_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    domain: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
}, { 
    tableName: 'org', 
    timestamps: false 
});

module.exports = Organisation;
