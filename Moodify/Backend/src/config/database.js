const mongoose = require('mongoose');

async function ConnectToDB(params) {
   await mongoose.connect(process.env.MONGO_URI)
   console.log('connected to DB')
}

module.exports = ConnectToDB