import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Jumbotron,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  Label,
  InputGroupText,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { ToDoNavbar } from "../components/Navbar";
import loading from "../assets/img/icons/common/loading.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-svg-core";
import {
  faCloudUploadAlt,
  faPlusCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";
const Todo = (props) => {
  const [User, setUser] = useState({ err: "No information" });
  const [userTodos, setUserTodos] = useState("");
  const [New, setNew] = useState("");
  const getUser = async (setUser) => {
    //get the user details
    const res = await Axios({
      method: "GET",
      url: "/fetch/user",
    });
    setUser({ ...res.data, err: "" });
  };

  useEffect(() => {
    getUser(setUser);
  }, []);

  const addNewTodo = (text) => {
    const compt = <>{text}</>;
    // get the component ready and place the text
    setUserTodos([...userTodos]); //update the userTodos
  };
  // TODO : Complete the creation of component

  return User.err === "" ? (
    <>
      <ToDoNavbar {...User} />
      <Container fluid>
        <Jumbotron fluid className="pb-4">
          <Container fluid>
            <Button
              color="primary"
              onClick={() => {
                window.location.href = "/auth/google";
              }}
              className="float-right float-top mt-2"
            >
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className="mr-2"
                size="1x"
              />
              Save
            </Button>
            <h1 className="display-5">My Todos</h1>
            <hr className="my-1" />
            <p>
              <li>Tap to edit a todo</li>
              <li>Save todos in cloud, by hitting 'Save'</li>
            </p>
            <p className="lead">
              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>+ </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Todo Content"
                  onChange={(e) => {
                    setNew(e.currentTarget.textContent);
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="success"
                    onClick={(e) => {
                      addNewTodo();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="mr-2"
                      size="1x"
                    />
                    Add
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </p>
          </Container>
        </Jumbotron>
        {/* End of the upper part of the UI */}
        <ListGroup>
          {/* {userTodos} */}
          <ListGroupItem>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <Input addon type="checkbox" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="text" />
              <InputGroupAddon addonType="append">
                <Button color="danger">
                <FontAwesomeIcon
                      icon={faMinusCircle}
                      size="1x"
                    />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ListGroupItem>
          </ListGroup>
          <hr className='mt-2 mb-2'/>
          <Label className='mb-3'>Completed</Label>
          <ListGroup>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
      </Container>
    </>
  ) : (
    <>
      <img src={loading} alt="Loading..." />
    </>
  );
};
export default Todo;
