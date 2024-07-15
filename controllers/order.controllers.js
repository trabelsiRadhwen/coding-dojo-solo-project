const {Order} = require('../models/order.model')
const User = require('../models/user.models')
const jwt = require('jsonwebtoken')

module.exports.CreateNewOrder = (req, res) => {
    const orders = req.body.orders;

    Order.insertMany(orders)
        .then(createdOrders => {
        res.json({ createdOrders });
    })
        .catch(err => {
        res.status(400).json(err);
    });
};



// module.exports.CreateNewOrder = (req, res) => {
//     const orders = req.body
//     Order.create(req.body)
//         .then(createOrder => {
//             res.json({createOrder})
//         })
//         .catch(err => {
//             res.status(400).json(err)
//         })
// }


module.exports.FindOneOrder = (req, res) => {
    Order.findOne({_id: req.params.id})
        .then(order => {
            res.json({order})
        })
        .catch(err => {
            res.json(err)
        })
}