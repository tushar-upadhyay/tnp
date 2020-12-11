import React from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import LoginScreen from "./screens/login_screen";
import MerchantDashboard from "./screens/merchant_dashboard";
import Redirector from "./screens/redirector";
import Wallet from "./screens/wallet_screen";
import "./styles.css";

export default function App() {
  return (
    <Switch>
      <PrivateRoute path="/wallet">
        <Wallet />
      </PrivateRoute>
      <Route path="/login">
        <LoginScreen />
      </Route>
      <Route path="/merchant/dashboard" >
        <MerchantDashboard />
      </Route>
      <Route path="/*"><Redirector/></Route>
    </Switch>
    
  );
}
