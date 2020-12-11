const userModel = require('../models/userModel');
module.exports = async function getTransactions({email,transaction}){
    let user = await userModel.findOne({email})
    if(!user) throw Error();
    const {amount,to} = transaction;
    if(!amount || !to) throw Error();
    if(parseFloat(transaction['amount'])>parseFloat(user.toJSON().balance)) throw Error();
    let toUser = await userModel.findOne({email:to})
    if(!toUser) throw Error();
    try{
        let userTransaction = {
            amount:transaction['amount'],
            to:toUser.name,
            type:'debit'
        }
        user.transactions.push(userTransaction);
        user.balance = String(parseFloat(user.balance) - amount);
        toUser.balance = parseFloat(toUser.balance) + parseFloat(amount);
        let toUserTransaction = {
            to:user.name,
            type:'credit',
            amount
        }
        toUser.transactions.push(toUserTransaction);
        await user.save();
        await toUser.save();
    }
    catch(err){ throw Error()};
}