import React from "react";
import { Jumbotron, ButtonGroup, Button } from "reactstrap";
import Google from "../assets/img/icons/common/google.svg";
import axios from "axios";
export function Login(props) {
  const login = async () => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:4000/auth/google",
    //   withCredentials: true,
    });
    console.log(res);
  };
  return (
    <>
      <Jumbotron>
        <h1 className="display-3">ToDo app</h1>
        <p className="lead">
          This is a simple todo application, Keep all your todos in one place!
        </p>
        <hr className="my-2" />
        <p>Get Started !</p>
        <p className="lead">
          <ButtonGroup>
            <Button outline color="primary" disabled>
              <img src={Google} alt="Google Logo" />
            </Button>
            <Button
              color="primary"
              onClick={() => {
                login();
              }}
            >
              Login with Google
            </Button>
          </ButtonGroup>
        </p>
      </Jumbotron>
    </>
  );
}

