
import React, { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
export default function TransactionList(props){
    const [transactions,setTransactions] = useState([]);
    useEffect(fetchTransactions,[]);

    async function fetchTransactions(){
      if(!props.transactions){
        let res = await fetch(`http://localhost:3001/wallet/transactions?token=${props.token}`);
        res = await res.json();
        setTransactions(res.reverse());
      }
    }
    return (
        <div style={{maxHeight:350,overflowY:'scroll',paddingLeft:20,paddingRight:20}}>
                   
            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>To/From</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Type&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.transactions?props.transactions:transactions).map((t) => (
            <TableRow key={t.amount}>
              <TableCell component="th" scope="row">
              {t.to.toUpperCase()}
              </TableCell>
              <TableCell align="right">₹{t.amount}</TableCell>
              <TableCell align="right">{t.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
}


