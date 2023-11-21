const express = require('express')
const adminController = require('../controllers/adminController')

const router = express.Router()

router.get('/admin/users', adminController.getUsers)
router.post('/admin/users/delete/:id', adminController.deleteUser)

module.exports = router
