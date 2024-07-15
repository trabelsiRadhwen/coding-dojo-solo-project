const mongoose = require('mongoose')
const dbName = process.env.DB
const userName = process.env.ATLAS_USERNAME
const pw = process.env.ATLAS_PASSWORD

const secretKey = process.env.FIRST_SECRET_KEY;
console.log("This is my secret key: ",secretKey)

const uri = `mongodb+srv://${userName}:${pw}@orderscluster.jimjajp.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(uri)
    .then(() => console.log("Established connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err))