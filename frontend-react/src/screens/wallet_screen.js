import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";

import { authAtom } from "../atoms/authAtom";
import { Button, CircularProgress, Paper } from "@material-ui/core";
import Image from "../bg.png";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";
import TransactionList from "../components/transactionList";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Send from "../components/send";
import AddMoney from "../components/addMoney";

const styles = {
  div: {
    height: "100vh",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${Image})`,
  },
  indiv1: {
    display: "flex",
    flex: 3,
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "azure",
  },
  indiv2: {
    display: "flex",
    flex: 3,
    justifyContent: "flex-start",
    padding: 10,
  },
};
export default function Wallet() {
  const [token, setAuth] = useAtom(authAtom);
  const history = useHistory();
  const [user, _] = useAtom(userAtom);
  const [balance, updateBalance] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  function signout() {
    localStorage.clear();
    setAuth((e) => null);
    history.replace("/login");
  }
  useEffect(fetchBalance, []);
  async function fetchBalance() {
    if(user['userType']==='merchant'){
       return history.replace('/merchant/dashboard')
      };
    let res = await fetch(
      `http://localhost:3001/wallet/getBalance?token=${token}`
    );
    res = await res.json();
    updateBalance(res["balance"].toString());
  }
  function view() {
    if (!viewMode) return tools();
      return (
        <div>
          <Button onClick={()=>setViewMode(null)}>
          <div style={{display:'flex',alignItems:'center'}}>
            <ArrowBackIcon/>
            <p>Back</p>
            </div>
          </Button>
          {viewFunction()}
        </div>
      );
    
  }
  function viewFunction(){
    if (viewMode == "transactions") return <TransactionList updateBalance={fetchBalance} token={token}/>
    if(viewMode=="add") return <AddMoney token={token} updateBalance={fetchBalance}/>
    if(viewMode=="send") return <Send currentBalance={balance} token={token} updateBalance={fetchBalance}/>
  }
  function tools() {
    return (
      <div style={styles.indiv2}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Button onClick={() => setViewMode("send")}>
              
          <div>
            <SendIcon style={{ color: "0F4FF5" }} />
            <p style={{ margin: 0 }}>Send</p>
          </div>
          </Button>
          <div>
            <Button onClick={() => setViewMode("transactions")}>
              <div>
                <ReceiptIcon style={{ color: "0F4FF5" }} />
                <p style={{ margin: 0 }}>Transactions</p>
              </div>
            </Button>
          </div>
          <Button onClick={() => setViewMode("add")}>
          <div>
            <AddCircleOutlineIcon style={{ color: "0F4FF5" }} />
            <p style={{ margin: 0 }}>Add Money</p>

          </div>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div style={styles.div}>
      <Paper style={{ padding: 10 }}>
        <div
          style={{
            display: "flex",
            width: 500,
            flexDirection: "column",
          }}
        >
          <div style={styles.indiv1}>
            <div
              style={{width: 50, marginRight: 10 }}

            ><img width="50" src={('https://i.ibb.co/jbKdqjL/user.png')}/></div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <h2 style={{ margin: 0, letterSpacing: 1.3, color: "#2D2D33" }}>
                  {user.name}
                </h2>
                <h4 style={{ padding: 0, margin: 0, color: "#0F4FF5" }}>
                  {user.email}
                </h4>
              </div>
            </div>
          </div>
          <div style={styles.indiv1}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  letterSpacing: 1.3,
                  color: "#9D968C",
                  textAlign: "center",
                }}
              >
                Balance
              </h2>
              {balance!=null ? (
                <h2 style={{ color: "#0F4FF5", textAlign: "center" }}>
                  ₹{balance}
                </h2>
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
          {view()}
        </div>
      </Paper>
      <Button onClick={signout} style={{ marginTop: 20 }} variant="contained">
        Sign Out
      </Button>
    </div>
  );
}
