import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import ToDoLayout from "./layouts/ToDo.js";
import AuthLayout from "./layouts/Auth.js";
import Axios from "axios";


ReactDOM.render(
  <>
  <div className='bg'/>
  <BrowserRouter>
    <Switch>
      <Route path="/todo" render={(props) => <ToDoLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/*" to="/auth" />
    </Switch>
  </BrowserRouter>
  </>,
  document.getElementById("root")
);
