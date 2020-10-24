import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "../src/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/assets/scss/argon-dashboard-react.scss";

// import UserLayout from "../src/layouts/User.js";
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
  // <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/todo" render={(props) => <ToDoLayout {...props} />} /> */}
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/logout" render={logout} />
        <Redirect from="/*" to="/auth" />
      </Switch>
    </BrowserRouter>
  // </Provider>,
  ,document.getElementById("root")
);
