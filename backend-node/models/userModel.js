const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    email:String,
    name:String,
    password:String,
    balance:String,
    transactions:Array,
    userType:String
});
module.exports = mongoose.model('wallets',User);