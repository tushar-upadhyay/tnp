const userModel = require('../models/userModel');
module.exports = async function getTransactions({email}){
    let user = await userModel.findOne({email})
    if(!user) throw Error();
    
    let transactions =  user.toJSON().transactions;
    return transactions;
}