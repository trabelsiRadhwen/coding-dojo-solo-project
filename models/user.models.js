const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const OrderSchema = require('../models/order.model').OrderSchema

const UserSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, "{PATH} is required"]
    },

    lastName: {
        type: String,
        required: [true, "{PATH} is required"]
    },

    email: {
        type: String,
        required: [true, "{PATH} is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: [true, "{PATH} is required"]
    },

    address: {
        type: String,
        required: [true, "{PATH} is required"]
    },

    city: {
        type: String,
        required: [true, "{PATH} is required"]
    },

    state: {
        type: String,
        required: [true, "{PATH} is required"]
    }, 
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]

}, {timestamps: true})

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema)
module.exports = User