// const {Order} = require('../models/order.model')
const jwt = require('jsonwebtoken')

const User = require('../models/user.models');
const Order = require('../models/order.model').Order;


module.exports.CreateNewOrder = async (req, res) => {
    try {
        const token = req.cookies.usertoken;
        const decoded = jwt.verify(token, process.env.FIRST_SECRET_KEY);
        const userId = decoded.id;

        console.log("User ID = ", userId);

        // const orders = req.body;

        const orders = new Order({
            method: req.body.method,
            size: req.body.size,
            crust: req.body.crust,
            quantity: req.body.quantity,
            toppings: req.body.toppings,
            totalAmount: req.body.totalAmount
        })
        console.log(orders);

        const createdOrders = await Order.insertMany(orders);

        const orderIds = createdOrders.map(order => order.id);

        await User.findByIdAndUpdate(userId, { $push: { orders: { $each: orderIds } } });

        res.status(201).json({ createdOrders });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ error: 'Failed to create order.' });
    }
}

// module.exports.CreateNewOrder = async (req, res) => {
//     try {
//         const userId = req.user.id; // Assuming user ID is available from authentication middleware
//         console.log("logged user ID = ",userId);
//         console.log(req.body);

//         const {method, size, crust, quantity, toppings, totalAmount} = req.body

//         // Create a new order
//         const newOrder = new Order({
//             method,
//             size,
//             crust,
//             quantity,
//             toppings,
//             totalAmount
//         });

//         // Save the order
//         const savedOrder = await newOrder.save();

//         // Update the user's orders array with the new order's ObjectId
//         await User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } });

//         res.status(201).json({ Order: savedOrder });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(400).json({ error: 'Failed to create order.' });
//     }
// }


// module.exports.CreateNewOrder = (req, res) => {
//     const orders = req.body.orders;

//     Order.insertMany(orders)
//         .then(createdOrders => {
//         res.json({ createdOrders });
//     })
//         .catch(err => {
//         res.status(400).json(err);
//     });
// };



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