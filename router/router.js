var express = require('express')
var router = express.Router()

var userController = require('../controller/UserController')

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.addUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
module.exports = router;