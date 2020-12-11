import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { Redirect, Route } from "react-router-dom";
export default function PrivateRoute({ children, ...rest }) {
  let [auth, _] = useAtom(authAtom);

  // useEffect(() => console.log(auth), [auth]);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
