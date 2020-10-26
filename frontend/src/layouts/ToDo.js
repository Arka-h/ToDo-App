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
  Table,
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
  faMinusCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
const Todo = (props) => {
  const [User, setUser] = useState({ err: "No information" });
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [pendingTodoTable, setPendingTodoTable] = useState([]);
  const [completedTodoTable, setCompletedTodoTable] = useState([]);
  const [addTodo, setAddTodo] = useState("");

  // function to get the current user todos
  const getUser = async (setUser) => {
    //get the user details
    const res = await Axios({
      method: "GET",
      url: "/fetch/user",
    });
    setUser({ ...res.data, err: "" });
    // setPendingTodos();
  };

  // Hook it to componentDidMount
  useEffect(() => {
    getUser(setUser);
  }, []);

  const saveTodos = () => {
    //update todos to database here..
  };

  const generatePendingTable = () =>
    pendingTodos.map((todo) => generateListComponent(todo, 0));

  const deleteItem = (text, strike) => {
    if (strike) {
      setCompletedTodos((prevState) => {
        return prevState.splice(prevState.indexOf(text), 1)
    });
      generatePendingTable();
    } else {
      setPendingTodos((prevState) => {
        console.log(prevState)
        prevState.splice(prevState.indexOf(text), 1);
      });
      generatePendingTable();
    }
  };
  // to generate a list component for a particular text
  const generateListComponent = (text, strike) =>
    text ? (
      strike ? (
        <tr>
          <td
            className="col-lg"
            onClick={() => {
              console.log("markCompleted(text,)");
            }}
          >
            <strike>{text}</strike>
          </td>
          <td>
            <a href="#" className="text-success" pull="right">
              <FontAwesomeIcon icon={faEdit} size="1x" />
            </a>
          </td>
          <td>
            <a
              href="#"
              className="text-danger"
              onClick={() => {
                deleteItem(text, 0);
              }}
            >
              <FontAwesomeIcon icon={faMinusCircle} size="1x" />
            </a>
          </td>
        </tr>
      ) : (
        <tr>
          <td
            className="col-lg"
            onClick={() => {
              console.log("markCompleted(text,)");
            }}
          >
            {text}
          </td>
          <td>
            <a href="#" className="text-success" pull="right">
              <FontAwesomeIcon icon={faEdit} size="1x" />
            </a>
          </td>
          <td>
            <a
              href="#"
              className="text-danger"
              onClick={() => {
                deleteItem(text, 0);
              }}
            >
              <FontAwesomeIcon icon={faMinusCircle} size="1x" />
            </a>
          </td>
        </tr>
      )
    ) : null;

  // add the new todo to the pending list
  const addNewTodo = (text) => {
    //entry in the database
    pendingTodos
      ? setPendingTodos([text, ...pendingTodos])
      : setPendingTodos([text]);

    setPendingTodoTable((prevState) => [
      generateListComponent(text, 0),
      ...prevState,
    ]); //update the userTodos
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
              <li>Tap to complete a todo</li>
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
                    setAddTodo(e.target.value);
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="success"
                    onClick={(e) => {
                      addNewTodo(addTodo);
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
        <Label className="mb-0 display-6 text-uppercase font-weight-light">
          Pending
        </Label>
        <hr className="mt-0 mb-1" />
        <ListGroup>
          {/* {Pending TODOs} */}

          <Table className="align-items-center table-flush" responsive hover>
            <tbody>{pendingTodoTable}</tbody>
          </Table>
        </ListGroup>
        <Label className="mb-0 display-6 text-uppercase font-weight-light">
          Completed
        </Label>
        <hr className="mt-0 mb-1" />
        <ListGroup>
          {/* {Completed TODOs} */}
          <Table className="align-items-center table-flush" responsive hover>
            <tbody>{completedTodoTable}</tbody>
          </Table>
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
