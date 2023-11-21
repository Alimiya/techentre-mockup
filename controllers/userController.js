const User = require('../models/userModel')
exports.getUsers = async (req, res) => {
    const users = await User.find()
    res.render('ranking', {users})
}

exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('profile', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};