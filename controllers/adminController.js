const User = require('../models/userModel')
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const users = await User.findByIdAndDelete(userId)
        if (!users) {
            return res.status(404).render('error', { message: 'Пользователь не найден' })
        }
        res.redirect('/admin/users')
    } catch (error) {
        next(error)
    }
}

exports.getUsers = async (req, res) => {
        const users = await User.find()
        res.render('admin', {users})
}