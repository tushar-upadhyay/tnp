import { Button, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AppBar from "../components/appBar";
import Tile from "../components/tile";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RefreshIcon from "@material-ui/icons/Refresh";
import MyChart from "../components/charts";
import TransactionList from "../components/transactionList";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { authAtom } from "../atoms/authAtom";
import QRCode from "qrcode.react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function MerchantDashboard() {
  const [token, _] = useAtom(authAtom);
  const [user] = useAtom(userAtom);
  const [balance, updateBalance] = useState(0);
  const [recieved, setRecieved] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [refreshTransaction, urefreshTransactions] = useState();
  const history = useHistory();
  useEffect(getAllData, []);
  function getAllData() {
    if (user["userType"] === "user") {
      return history.replace("/redirector");
    }
    fetchBalance();
    getRecieved();
    getTransactions();
  }
  async function fetchBalance() {
    
    let res = await fetch(
      `http://localhost:3001/wallet/getBalance?token=${token}`
    );
    res = await res.json();
    let balance = res["balance"].toString();
    updateBalance(balance);
  }
  async function getRecieved() {
    let res = await fetch(
      `http://localhost:3001/wallet/getTotalRecieved?token=${token}`
    );
    res = await res.json();
    setRecieved(res["recieved"].toString());
  }
  const downloadQR = () => {
    const canvas = document.getElementById("qr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  async function getTransactions() {
    let res = await fetch(
      `http://localhost:3001/wallet/transactions?token=${token}`
    );
    res = await res.json();
    setTransactions(res.reverse());
  }
  async function refreshData() {
    getAllData();
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "azure",
        height: "100vh",
      }}
    >
      <div style={{ width: "100%" }}>
        <AppBar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
              marginTop: 30,
              flexWrap: "wrap",
            }}
          >
            <Tile
              icon={AccountBalanceWalletIcon}
              color="#32cd32"
              title="Balance"
              value={`₹${balance}`}
            />
            <Tile
              icon={ArrowDownwardIcon}
              color="blue"
              title="Total Recieved"
              value={`₹${recieved}`}
            />
            <Tile
              icon={AccountBalanceIcon}
              color="#ff2400"
              title="Total Withdrawn"
              value={`₹${parseFloat(recieved) - parseFloat(balance)}`}
            />
          </div>
          <center>
            <div
              style={{
                width: "100%",
                marginTop: 10,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Paper style={{ width: "60%", margin: 20 }}>
                <Typography style={{ padding: 20 }} variant="h6" component="h1">
                  Transactions
                </Typography>
                <TransactionList transactions={transactions} token={token} />
              </Paper>
              <Paper>
                {transactions.length > 0 ? (
                  <MyChart data={transactions} />
                ) : null}
              </Paper>
            </div>
          </center>
        </div>
        <div>
          <center>
            <Button onClick={refreshData} color="secondary" variant="contained">
              Refresh Data
            </Button>
          </center>
          <Typography style={{ padding: 20 }} variant="h6" component="h1">
            Use this QR code to accept payments
          </Typography>
          <Paper style={{ padding: 30, height: 200, width: 200 }}>
            <QRCode id="qr" value={user.email} size={200} />
          </Paper>
          <center>
            <Button
              style={{ marginTop: 10 }}
              color="primary"
              variant="contained"
              onClick={downloadQR}
            >
              Download QR
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
  
}
