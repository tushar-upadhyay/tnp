import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField,Button ,CircularProgress} from "@material-ui/core";
import React, { useState } from "react";
import QrReader from "react-qr-reader"
export default function Send(props) {
  const [type, setType]  = useState();
  const [error,setError] = useState(false);
  const [email, setEmail] = useState();
  const [amount, setAmount] = useState();
  const [isLoading, setLoading] = useState();
  const [qrValue,setQrValue] = useState();
  const [amountError,setAmountError] = useState(false);
  const [merchantName,setMerchantName] = useState();
  const [isGettingMerchantName,setIsGettingMerchantName] = useState(false);
  const [msg,setMsg] = useState();
  async function getMerchantName(em){
    setIsGettingMerchantName(true);
    let res =  await fetch(`http://localhost:3001/getMerchantName`,{method:'POST',body:JSON.stringify({email:em}), headers: {
      'Content-Type': 'application/json'
    },});
    res = await res.json()
    setIsGettingMerchantName(false);
    if(res['error']){
      
      return;
    }
    setMerchantName(res['name']);
    setQrValue(em);
  }
  async function send(e,type){
    e.preventDefault();
    let to = email;
    if(type=='qr'){
      to = qrValue;
    }
    if(!amountError){
    setMsg();
    setLoading(true);
    setError(false);
    let res =  await fetch(`http://localhost:3001/wallet/addTransaction?token=${props.token}`,{method:'POST',body:JSON.stringify({to,amount}), headers: {
      'Content-Type': 'application/json'
    },});
    res = await res.json()
    if(res['error']){
      setError(res['error']);
      setLoading(false);
      return;
    }
    setMsg(res['msg'])
    setLoading(false);
    props.updateBalance();
}
  }
  function userForm(){
      return (
          <div style={{width:'60%',display:'flex'}}>
        <form onSubmit={send} noValidate={false}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          error={error?true:false}
          fullWidth
          id="email"
          type="email"
          required
          helperText={error?"User with this Email not found":null}
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          error={amountError}
          fullWidth
          type="number"
          helperText={amountError?'Your Balance is low!':null}
          label="Amount"
          onChange={(e) => {
              if(parseFloat(props.currentBalance)<parseFloat(e.target.value)    ){
                  setAmountError(true);
              }
              else{
                  setAmountError(false);
                  setAmount(e.target.value)
              }
             
            }}
        />
      {!isLoading?<Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={send}
            >
              Send
            </Button>:<center><CircularProgress style={{justifyContent:"center"}}/></center>}

      </form>
      </div>
   
      );
  }
  return (
        <center>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select the user type</FormLabel>
        <RadioGroup row
        onChange={(e)=>setType(e.target.value)}
        // value={type}
        >
          <FormControlLabel value="merchant" control={<Radio />} label="Merchant" />
          <FormControlLabel value="user" control={<Radio />} label="User" />
        </RadioGroup>
</FormControl>
        {type?(type=='user'?userForm():(
          <div style={{width:'100%'}}>
            {qrValue!=null?(
              <div style={{width:'60%'}}>
                <h3>Paying to {merchantName}</h3>
            <TextField
          variant="outlined"
          margin="normal"
          required
          error={amountError}
          fullWidth
          type="number"
          helperText={amountError?'Your Balance is low!':null}
          label="Amount"
          onChange={(e) => {
              if(parseFloat(props.currentBalance)<parseFloat(e.target.value)    ){
                  setAmountError(true);
              }
              else{
                  setAmountError(false);
                  setAmount(e.target.value)
              }
             
            }}
        />
            {!isLoading?<Button
              type="submit"
              fullWidth
              style={{marginTop:10}}
              variant="contained"
              color="primary"
              onClick = {e=>send(e,'qr')}
            >
              Send
            </Button>:<center><CircularProgress style={{justifyContent:"center"}}/></center>
           
            }</div>
            ):isGettingMerchantName?<CircularProgress />:(<QrReader
          onError={(e=>console.log(e))}
          onScan={(e)=>{
            if(e) getMerchantName(e);

          }}
          style={{width:'60%',display:'flex',flex:1}}
           />)}
            
           </div>
        )):null}
        <center>
        <h3>{msg}</h3>
        </center>
    
      </center>
  
 
  );
}
