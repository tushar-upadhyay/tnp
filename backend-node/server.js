const express = require('express');
var cors = require('cors');
// const fs = require('fs');
// const key = fs.readFileSync('./key.pem');
// const https = require('https');
// const cert = fs.readFileSync('./cert.pem');
const authCheck = require('./middleWares/authCheck');
const mongoose = require('mongoose');
const authRouter  = require('./auth/authApi');
const walletRouter  = require('./wallet/walletApi');
const getMerchantName = require('./getMerchantName');
mongoose.connect('mongodb+srv://tushar:9993929488@cluster0.qsrsl.mongodb.net/wallet?retryWrites=true&w=majority',{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
)
const app = express();
// const server = https.createServer({key: key, cert: cert }, app);
app.use(cors());
app.use(express.json());
app.use('/auth',authRouter);
app.use('/wallet',walletRouter);
app.post('/getMerchantName',async(req,res)=>{
  const {email} = req.body;
  try{
    let name = await getMerchantName({email});
    res.json({name})
  }
  catch(err){
    res.json({'error':'Merchant Not Found'})
  }
});
app.listen(3001);
