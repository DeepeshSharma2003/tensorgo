const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
    user_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    org_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: 'org',
            key: 'org_id'
        }
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    role: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, { 
    tableName: 'user', 
    timestamps: false 
});

module.exports = User;