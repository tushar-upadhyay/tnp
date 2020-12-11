const authCheck = require('../middleWares/authCheck');
const addMoney = require('./addMoney');
const addTransaction = require('./addTransaction');
const getBalance = require('./getBalance');
const getTotalRecieved = require('./getTotalRecieved');
const getTransactions = require('./getTransactions');

const router = require('express').Router();
router.get('/transactions',authCheck,async(req,res)=>{
    const email = req.email;
    const transactions = await getTransactions({email});
    res.json(transactions);
});
router.get('/getBalance',authCheck,async(req,res)=>{
    const email = req.email;
    const balance = await getBalance({email});
    res.json({'balance':parseFloat(balance)});
});
router.get('/getTotalRecieved',authCheck,async(req,res)=>{
    const email = req.email;
    const recieved = await getTotalRecieved({email});
    res.json({'recieved':parseFloat(recieved)});
});
router.post('/addMoney',authCheck,async(req,res)=>{
    const email = req.email;
    const {amount} = req.body;
   
    try{
        const balance = await addMoney({email,amount});
        res.json({'msg':'Money Added Successfully!'});
    
    }
    catch(err){
        res.json({'err':'some error occurred!'});
    }
    res.json({'balance':parseFloat(balance)});
});
router.post('/addTransaction',authCheck,async(req,res)=>{
    const email = req.email;
    const transaction = req.body;
    try{
    await addTransaction({email,transaction});
    res.json({'msg':'Transaction Successfull!'});
    }
    catch(err){
        res.json({'error':'Transaction not valid!'});
    }

});
module.exports = router;