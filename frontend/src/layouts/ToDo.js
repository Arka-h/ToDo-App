import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { ToDoNavbar } from "../components/Navbar";
import loading from "../assets/img/icons/common/loading.gif";
const Todo = (props) => {
  const [User, setUser] = useState({ err: "No information" });

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

  return User ? (
    <>
      <ToDoNavbar {...User} />
      <Container fluid></Container>
    </>
  ) : (
    <>
      <img src={loading} alt="Loading..." />
    </>
  );
};
export default Todo;
