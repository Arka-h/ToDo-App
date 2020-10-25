import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import ToDoLayout from "./layouts/ToDo.js";
import AuthLayout from "./layouts/Auth.js";
import Axios from "axios";


ReactDOM.render(
  <>
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/todo" render={(props) => <ToDoLayout {...props} />} />
      <Redirect from="/*" to="/auth" />
    </Switch>
  </BrowserRouter>
  </>,
  document.getElementById("root")
);
