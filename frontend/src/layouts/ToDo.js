/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "components/Navbars/UserNavbar.js";
import UserFooter from "components/Footers/UserFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import UploadResume from "../views/examples/UploadResume"
import { connect } from 'react-redux';
import * as actions from '../actions';
import routes from "routes.js";
import Email from "../views/examples/Email";
import Applied from "../views/examples/Applied";
import CreateJob from "../views/examples/CreateJob"
class User extends React.Component {

  componentDidMount(){
    this.props.getUser()
  }
  
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user" & (prop.access==="all" || prop.access===this.props.auth.userType))
      {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Create Job";
  };
  renderCondition = () => {
    if (this.props.auth)
      return (<>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/user/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <UserNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Route
            path={'/user/:job/upload'}
            component={UploadResume}/>
            <Route
            path={'/user/:jobname/:id/email'}
            component={Email}/>
            <Route
            path={'/user/applied'}
            component={Applied}/>
            <Route
            path={'/user/create-job'}
            component={CreateJob}/>
            <Redirect from="*" to="/user/jobs" />
          </Switch>
          <Container fluid>
            <UserFooter />
          </Container>
        </div>
      </>)
    else if(this.props.auth === null)
      return <h1>Loading...</h1>
    else
      return (<Redirect to="/auth/login" />)
  }
  render = () => this.renderCondition()
}

const mapStateToProps = ({auth})=>({auth})

export default connect(mapStateToProps,actions)(User);
