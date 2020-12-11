
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
module.exports =  async function signup({email,password,name,userType}){
    let user = await userModel.findOne({email})
    if(user) throw Error();
    user = new userModel({name,email,password,transactions:[],balance:'0',userType});
    await user.save()
    const token = jwt.sign(email,'9993929488@t');
    return token;
}