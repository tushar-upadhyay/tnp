import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { authAtom } from '../atoms/authAtom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 
  title: {
      justifyContent:'center',
      display:'flex',
    flexGrow: 1,
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const [_,updateUser] = useAtom(userAtom);
  const [__,updateToken] = useAtom(authAtom);
  const history = useHistory();
  function logout(){
    updateUser(e=>({
      email:null,
      name:null,
      userType:null
    }))
    updateToken(e=>null);
    localStorage.clear();
    history.replace('/login');
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           
          </IconButton>
          <div style={{height:50,display:'flex',alignItems:'center'}}>
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
                <h2 style={{ margin: 0, letterSpacing: 1.3, color: "white" }}>
                  Merchant 1
                </h2>
                <h4 style={{ padding: 0, margin: 0, color: "white" }}>
                    m1@test.com
                </h4>
              </div>
            </div>
          </div>
          <Typography variant="h6" className={classes.title}>
            Merchant Dashboard
          </Typography>
          <Button onClick={logout} color="inherit">logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}