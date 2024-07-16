const User = require('../models/user.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Order} = require('../models/order.model')
const { default: mongoose } = require('mongoose')

module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY);

        console.log("this is user token after registration = ",userToken);

        res.cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
}

module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user === null) {
        return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);

    console.log("This is the user token for login funct = ", userToken);

    res.cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}


module.exports.findOneUser = async (req, res) => {
    try {
        const token = req.cookies.usertoken;
        const decoded = jwt.verify(token, process.env.FIRST_SECRET_KEY);
        const userId = decoded.id;

        console.log("User ID = ", userId);

        const user = await User.findOne({ _id: userId});

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Failed to find user.' });
    }
}


module.exports.updateUser = async (req, res) => {
    try {
        const token = req.cookies.usertoken;
        const decoded = jwt.verify(token, process.env.FIRST_SECRET_KEY);
        const userId = decoded.id;

        // Extract updated user data from request body
        const { firstName, lastName, address, city, state } = req.body;

        // Construct update object with provided fields
        const updateFields = { firstName, lastName, address, city, state };
        console.log(updateFields);

        // Find and update user by userId
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user.' });
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
    console.log("user logout");
}