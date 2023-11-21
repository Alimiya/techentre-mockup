const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/ranking', userController.getUsers)
router.get('/profile/:id', userController.getUserById)

module.exports = router
