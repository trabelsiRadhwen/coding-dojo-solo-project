const express = require('express')

const cookieParser = require('cookie-parser')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')

// const secretKey = process.env.FIRST_SECRET_KEY;
// console.log("This is my secret key: ",secretKey);

require('./config/mongoose.config')

app.use(cookieParser())
app.use(express.json(), express.urlencoded({extended: true}))

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

const OrdersRoutes = require('./routes/order.routes')
OrdersRoutes(app)

const UsersROutes = require('./routes/user.routes')
UsersROutes(app)

app.listen(PORT, () => console.log(`Listen on the port: ${PORT}`))