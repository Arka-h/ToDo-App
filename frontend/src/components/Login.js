import React from "react";
// reactstrap components
import {
  FormText,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

function Login() {

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img src={require("../assets/img/icons/common/google.svg")} />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          {/* <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Log in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </InputGroup>
                <FormText color="danger" className="text-center">
                  {alertMessage}
                </FormText>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={() => {
                    login(loginUsername, loginPassword, setMessage);
                  }}
                >
                  Log in
                </Button>
              </div>
            </Form>
          </CardBody> */}
        </Card>
      </Col>
    </>
  );
}
export default Login;
