const UserController = require('../controllers/user.controllers')
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.post('/api/user/register', UserController.register)
    app.post('/api/user/login', UserController.login)
    app.get('/api/user/details', authenticate, UserController.findOneUser)
    app.get('/api/user/orders', authenticate, UserController.findOneUser)
    app.post('/api/user/update', authenticate, UserController.updateUser)
    app.post('/api/user/logout', UserController.logout)
}