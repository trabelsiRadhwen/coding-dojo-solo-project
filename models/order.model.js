const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema ({
    method: {
        type: String,
        require: [true, "{PATH} is required"]
    },

    size: {
        type: String,
        require: [true, "{PATH} is required"]
    }, 

    crust: {
        type: String,
        require: [true, "{PATH} is required"]
    },

    quantity: {
        type: Number,
        require: [true, "{PATH} is required"],
        default: 1
    },

    toppings: [{
        name: {
            type: String
        },

        unitPrice: {
            type: Number
        }
    }],

    totalAmount: {
        type: Number
    }
}, {timestamps: true})

// module.exports.OrderSchema = OrderSchema;

const Order = mongoose.model('Order', OrderSchema)
module.exports = { Order, OrderSchema }
// module.exports = Order
