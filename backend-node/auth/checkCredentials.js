const User = require('../models/userModel');
module.exports = async function checkCredentials({email,password,userType}){
    let user = await User.findOne({email});
    if(!user){
         throw Error();
        }
    user = user.toJSON();
    if((user.password!=password) || (user.userType!=userType)) throw Error();
    return user.name;
}