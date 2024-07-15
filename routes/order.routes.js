const { authenticate } = require('../config/jwt.config')
const OrderController = require('../controllers/order.controllers')

module.exports = app => {
    app.get('/api/order/details/:id', OrderController.FindOneOrder)
    app.post('/api/order/new', authenticate, OrderController.CreateNewOrder)
}