import React, { useState } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultProfile from "../assets/img/brand/profile.jpg";
import Axios from "axios";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

export function ToDoNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    Axios({
      method: "GET",
      url: "/auth/logout",
    })
  };
  return (
    <>
      <Navbar dark color="dark" light expand="md">
        <NavbarBrand href="/">TODO App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/Arka-h/ToDo-App">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </NavLink>
            </NavItem>
          </Nav>
          <Nav pullRight navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img
                  className="rounded-circle responsive-img mr-3"
                  src={props.thumbnail || defaultProfile}
                  width="40px"
                  alt="DP"
                />
                {props.err === "" ? props.username : "User"}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  onClick={() => {
                    logout();
                  }}
                >
                  LogOut
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}
