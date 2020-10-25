import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
// import ToDoLayout from "../src/layouts/ToDo.js";
import AuthLayout from "../src/layouts/Auth.js";
import Axios from "axios";
const logout = (props) => {
  Axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/logout",
  }).then((res) => {
    console.log(res);
    window.location = "/todo";
  });
};

ReactDOM.render(
  <>
  <div className='bg'/>
  <BrowserRouter>
    <Switch>
      {/* <Route path="/todo" render={(props) => <ToDoLayout {...props} />} /> */}
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/logout" render={logout} />
      <Redirect from="/*" to="/auth" />
    </Switch>
  </BrowserRouter>
  </>,
  document.getElementById("root")
);
