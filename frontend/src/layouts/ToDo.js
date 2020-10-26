import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
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
import TableListItem from "../components/TableListItem";
const Todo = (props) => {
  const [User, setUser] = useStateWithCallbackLazy({ err: "No information" });
  const [pendingTodos, setPendingTodos] = useStateWithCallbackLazy([]);
  const [completedTodos, setCompletedTodos] = useStateWithCallbackLazy([]);
  const [pendingTodoTable, setPendingTodoTable] = useStateWithCallbackLazy([]);
  const [completedTodoTable, setCompletedTodoTable] = useStateWithCallbackLazy(
    []
  );
  const [addTodo, setAddTodo] = useStateWithCallbackLazy("");

  // function to get the current user todos
  const getUser = async (setUser) => {
    //get the user details
    const res = await Axios({
      method: "GET",
      url: "/fetch/user",
    });

    // If it gets a valid response
    setUser({ ...res.data, err: "" }, (User) => {
      setPendingTodos(User.pendingTodos, (pendingTodos) => {
        setPendingTodoTable(
          pendingTodos.map((todo) => generateListComponent(todo, 0))
        );
      });
      setCompletedTodos(User.completedTodos, (completedTodos) => {
        setCompletedTodoTable(
          completedTodos.map((todo) => generateListComponent(todo, 1))
        );
      });
    });
  };

  // Hook it to componentDidMount
  useEffect(() => {
    getUser(setUser);
  }, []);

  const saveTodos = async () => {
    console.log(User._id);
    const res = await Axios({
      method: "post",
      data: {
        pendingTodos: [...pendingTodos],
        completedTodos: [...completedTodos],
        id: User._id,
      },
      url: `/fetch/update`,
    });
    console.log(res);
  };

  const deleteItem = (text, strike) => {
    if (strike) {
      //completed
      setCompletedTodos((prevState) => {
        prevState.splice(
          prevState.findIndex((item) => item === text),
          1
        );
        setCompletedTodoTable(
          prevState.map((item) => generateListComponent(item, 1))
        );
        return prevState;
      });
    } else {
      //pending
      setPendingTodos((prevState) => {
        prevState.splice(
          prevState.findIndex((item) => item === text),
          1
        );
        setPendingTodoTable(
          prevState.map((item) => generateListComponent(item, 0))
        );
        return prevState;
      });
    }
  };

  const toggleCompleted = (text, toggle, edit) => {
    if(!edit){
      deleteItem(text, toggle);
      addNewTodo(text, !toggle);
    }
  };

  const updateState = (search,replace,strike)=>{
    if (strike) {
      //completed
      setCompletedTodos((prevState) => {
        const index = prevState.findIndex((item) => item === search)
        prevState[index] = replace
        setCompletedTodoTable(
          prevState.map((item) => generateListComponent(item, 1))
        );
        return prevState;
      });
    } else {
      //pending
      setPendingTodos((prevState) => {
        const index = prevState.findIndex((item) => item === search)
        prevState[index] = replace
        setPendingTodoTable(
          prevState.map((item) => generateListComponent(item, 0))
        );
        return prevState;
      });
    }
  }
// make a test

  // to generate a list component for a particular text
  const generateListComponent = (text, strike) =>{
    // const pass = {generatedListComponent: this,setCompletedTodos,setCompletedTodoTable,setPendingTodos,setPendingTodoTable}
    return text ? (
        <TableListItem
          toggleCompleted={toggleCompleted}
          text={text}
          deleteItem={deleteItem}
          strike={strike}
          updateState={updateState}
          
        />
    ) : null;
  }

  // add the new todo to the pending list
  const addNewTodo = (text, strike) => {
    //entry in the database
    if (strike) {
      setCompletedTodos((prevState) => [text, ...prevState]);
      setCompletedTodoTable((prevState) => [
        generateListComponent(text, 1),
        ...prevState,
      ]);
    } else {
      setPendingTodos((prevState) => [text, ...prevState]);
      setPendingTodoTable((prevState) => [
        generateListComponent(text, 0),
        ...prevState,
      ]);
    }
    //update the userTodos
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
                saveTodos();
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
                      addNewTodo(addTodo, 0);
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
