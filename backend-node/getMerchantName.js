const userModel = require('./models/userModel');
module.exports = async function getMerchantName({email}){
    let user = await userModel.findOne({email})
    if(!user) throw Error();
    let name =  user.toJSON().name;
    return name;
}