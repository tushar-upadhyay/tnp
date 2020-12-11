const jwt = require('jsonwebtoken');
const checkCredentials = require('./checkCredentials');
module.exports = async function login({email,password,userType}){
    try{
    let name = await checkCredentials({email,password,userType});
    let token = jwt.sign(email,'9993929488@t');
    return {token,name};
    }
    catch(err){
        throw Error();
    }    
}
