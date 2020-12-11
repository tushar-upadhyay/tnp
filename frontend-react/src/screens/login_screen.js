import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { useHistory } from "react-router-dom";
import Image from "../bg.png";
import { Checkbox, CircularProgress, Paper } from "@material-ui/core";
import { userAtom } from "../atoms/userAtom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  div: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundImage: `url(${Image})`,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginScreen() {
  let history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = useAtom(authAtom);
  const [type, setType] = useState("login");
  const [userType,setUserType] = useState('user');
  const [name, setName] = useState();
  const [isLoading,setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error,setError] = useState(false);
  const [user,setUser] = useAtom(userAtom);
  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    let res =  await fetch('http://localhost:3001/auth/login',{method:'POST',body:JSON.stringify({email,password,userType}), headers: {
      'Content-Type': 'application/json'
    },});
    res = await res.json()

    if(res['error']){
      setError(res['error']);
      setLoading(false);
      return;
    }
    let token = res['token'];
    let name =  res['name'];
    setAuth((e) => res['token']);
    localStorage.setItem("token", token);
    localStorage.setItem("name",name);
    localStorage.setItem('email',email);
    localStorage.setItem('userType',userType);
    setUser(e=>({name,email}));
    history.replace("/wallet");
    if(userType=='user'){
      return history.replace("/wallet");
      }
      history.replace('/merchant/dashboard');
  }
  useEffect(()=>{
    if(auth) history.replace('/redirector');
  },[]);
  async function signup(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    let res =  await fetch('http://localhost:3001/auth/signup',{method:'POST',body:JSON.stringify({email,password,name,userType}), headers: {
      'Content-Type': 'application/json'
    },});
    res = await res.json()
    if(res['error']){
      setError(res['error']);
      setLoading(false);
      return;
    }
    let token = res['token'];
    setAuth((e) => res['token']);
    localStorage.setItem("token", token);
    localStorage.setItem("name",name);
    localStorage.setItem("userType",userType);
    localStorage.setItem('email',email);
    setUser(e=>({name,email,userType}));
    if(userType=='user'){
    return history.replace("/wallet");
    }
    history.replace('/merchant/dashboard');
  }
  return (
    <div
      style={{
        height: "100vh",
        backgroundSize: "cover",
        alignItems: "center",
        display: "flex",
        justifyContent:'center',
        backgroundImage: `url(${Image})`,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          style={{
            padding: 15,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {type === "login" ? "in" : "up"}
          </Typography>
          <form onSubmit={type=='login'?login:signup} className={classes.form} noValidate={false}>
            {type === "login" ? null : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={error}
                id="Name"
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={error?true:false}
              fullWidth
              id="email"
              type="email"
              required
              helperText={error?error:null}
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={error?true:false}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <center>
            <Typography component="h1" variant="h6">
              I am a Merchant <Checkbox
        checked={userType=='user'?false:true}
        onChange={(e)=>setUserType(e.target.checked?'merchant':'user')}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
            </Typography>
             </center>
            {!isLoading?<Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign {type === "login" ? "in" : "up"}
            </Button>:<center><CircularProgress style={{justifyContent:"center"}}/></center>}
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    setType(type == "login" ? "signup" : "login");
                  }}
                  variant="body2"
                >
                  {type !== "login"
                    ? "Sign In Instead"
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
