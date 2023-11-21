const bcrypt = require('bcrypt')
const User = require('../models/userModel')

async function registerUser(req, res) {
    try {
        const { fname, lname, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).render('error',{message:"Такой пользователь существует"})
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ fname, lname, email, password: hashedPassword })
        await user.save()
        res.redirect('/login')
    } catch (error) {
        console.error('Error registering user:', error)
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).render('error', { message: 'Invalid email or password' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).render('error', { message: 'Invalid email or password' })
        }

        if (user.role === 'admin') {
            return res.redirect('/admin/users')
        } else {
            return res.redirect('/profile')
        }
    } catch (error) {
        console.error('Error logging in:', error)
    }
}

module.exports = {
    registerUser,
    loginUser
}