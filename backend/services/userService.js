const User = require('../models/user');


const createUser = async (userData) => {
    return await User.create(userData);
};


const getUsers = async () => {
    return await User.findAll();
};


const getUserById = async (id) => {
    try {
        const user = await User.findOne({ where: { user_id: id } });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw error;
    }
};


const updateUser = async (id, updateData) => {
    try {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            throw new Error('User not found');
        }
        await user.update(updateData);
        return user;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};


const deleteUser = async (id) => {
    try {
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
