const login = require('./login');
const signUp = require('./signUp');
const router = require('express').Router();
router.post('/signup',async(req,res)=>{
    const {email,password,name,userType} = req.body;
    try{
    const token = await signUp({email,password,name,userType});
    res.json({token});
    }
    catch(err){
        res.json({'error':'User already Exits'});
    }
});
router.post('/login',async(req,res)=>{
    const {email,password,userType} = req.body;
    try{
    let ans =  await login({email,password,userType});
    res.json(ans);
    }
    catch(err){
        res.json({'error':'Username or Password is Invalid'});
    }
   
});
module.exports = router;