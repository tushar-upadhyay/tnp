const userModel = require('../models/userModel');
module.exports = async function getTotalRecieved({email}){
    let user = await userModel.findOne({email})
    if(!user) throw Error();

    let ans = 0;
    let transactions = user.toJSON().transactions;
    for (let transaction of transactions){
        if(transaction['type']=='credit'){
            ans+=parseFloat(transaction['amount']);
        }
    }
    return ans;
}