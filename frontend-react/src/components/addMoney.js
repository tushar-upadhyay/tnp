import { TextField, Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
export default function AddMoney(props) {
  const [amount, setAmount] = useState();
  const [isLoading, setLoading] = useState(false);
  const [msg,setMsg] = useState(null);
  async function add(e){
    e.preventDefault();
    setMsg();
    setLoading(true);
  
    let res =  await fetch(`http://localhost:3001/wallet/addMoney?token=${props.token}`,{method:'POST',body:JSON.stringify({amount}), headers: {
      'Content-Type': 'application/json'
    },});
    res = await res.json()
    if(res['error']){
      setLoading(false);
      return;
    }
    setMsg(res['msg'])
    setLoading(false);
    props.updateBalance();

  }
  return (
    <center>
      <div style={{ width: "60%" }}>
        <form onSubmit={add} noValidate={false}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            required
            label="Enter Amount"
            autoComplete="email"
            onChange={(e) => setAmount(e.target.value)}

          />
           <TextField
          variant="outlined"
          margin="normal"
     
          fullWidth
          type="text"
          label="Card Number"
          autoComplete="email"
          onChange={(e) => setAmount(e.target.value)}
        />
        <div style={{display:'flex'}}>
        <TextField
          variant="outlined"
          margin="normal"
         
          fullWidth
          type="text"
          label="Cvv"
          autoComplete="email"
          onChange={(e) => setAmount(e.target.value)}
          />
          <div style={{width:10}}/>
           <TextField
          variant="outlined"
          margin="normal"
          
          fullWidth
          type="text"
          label="Expiry(MMYY)"
          autoComplete="email"
          onChange={(e) => setAmount(e.target.value)}
          />
        </div>
          {" "}
          {!isLoading ? (
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add
            </Button>
          ) : (
            <center>
              <CircularProgress style={{ justifyContent: "center" }} />
            </center>
          )}
        </form>
      </div>
          <h2>{msg}</h2>
    </center>
  );
}
