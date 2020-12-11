const userModel = require('../models/userModel');
module.exports = async function getBalance({email,amount}){
    let user = await userModel.findOne({email})
    if(!user) throw Error();
    let balance =  parseFloat(user.toJSON().balance);
    user.balance = balance +  parseFloat(amount);
    let transaction = {
        type:'credit',
        to:'Self',
        amount:amount
    }
    user.transactions.push(transaction);
    await user.save();
}