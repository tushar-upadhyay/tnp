const userModel = require('../models/userModel');
module.exports = async function getBalance({email}){
    let user = await userModel.findOne({email})
    if(!user) throw Error();
    let balance =  user.toJSON().balance;
    return balance;
}