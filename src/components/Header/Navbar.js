import React, { useState } from "react";
import "./styles.scss";

import ReactScrollDetect, { DetectSection } from "react-scroll-detect";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div>
        <Navbar fixed="top" light expand="lg" className="navbar-dark">
          <a className="navbar-brand hvr-grow" href="#homeSection">
            COOK<span className="navbar-brand-light">BOOK</span>
          </a>
          {/* <NavbarBrand href="#homeSection" className="hvr-grow">
            COOK<span className="navbar-brand-light">BOOK</span>
          </NavbarBrand> */}
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem
                onClick={() => props.handleSectionChange(0)}
                className={`nav-item px-3 px-lg-0 pr-lg-3 mb-3 mb-lg-0 ${
                  props.currentSection === 0 ? "active" : ""
                }`}
              >
                <NavLink href="#homeCarousel">Home</NavLink>
              </NavItem>
              <NavItem
                onClick={() => props.handleSectionChange(1)}
                className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0`}
              >
                <NavLink href="grocery.html">My List</NavLink>
              </NavItem>
              <NavItem className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0`}>
                <NavLink href="recipes.html">Recipes</NavLink>
              </NavItem>
              <NavItem
                onClick={() => props.handleSectionChange(1)}
                className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0 ${
                  props.currentSection === 1 ? "active" : ""
                }`}
              >
                <NavLink href="#about">About</NavLink>
              </NavItem>
              <NavItem
                onClick={() => props.handleSectionChange(2)}
                className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0 ${
                  props.currentSection === 2 ? "active" : ""
                }`}
              >
                <NavLink href="#contact">Contact</NavLink>
              </NavItem>
            </Nav>
            <NavbarText className="ml-lg-auto pr-5 hvr-grow">
              <a
                role="button"
                data-toggle="modal"
                data-target="#loginModal"
                className="btn btn-color1"
              >
                <i className="fa fa-sign-in"></i> LOGOUT
              </a>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
      {/* 
      <div>
        <Nav
          className="navbar navbar-dark navbar-expand-lg fixed-top"
          fixed="top"
        >
          <a className="navbar-brand hvr-grow" href="#homeSection">
            COOK<span className="navbar-brand-light">BOOK</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#cookbookNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="cookbookNavbar">
            <ul className="navbar-nav mx-auto">
              <li
                onClick={() => props.handleSectionChange(0)}
                className={`nav-item px-3 px-lg-0 pr-lg-3 mb-3 mb-lg-0 ${
                  props.currentSection === 0 ? "active" : ""
                }`}
              >
                {" "}
                <a className="nav-link" href="#homeCarousel">
                  Home
                </a>
              </li>

              <li className="nav-item px-3 mb-sm-3 mb-3 mb-lg-0">
                <a className="nav-link" href="grocery.html">
                  My List
                </a>
              </li>
              <li className="nav-item px-3 mb-sm-3 mb-3 mb-lg-0">
                <a className="nav-link" href="recipe.html">
                  {" "}
                  Recipes
                </a>
              </li>
              <li
                onClick={() => props.handleSectionChange(1)}
                className={`nav-item px-3 mb-sm-3 mb-3 mb-lg-0 ${
                  props.currentSection === 1 ? "active" : ""
                }`}
              >
                <a className="nav-link" href="#about">
                  {" "}
                  About
                </a>
              </li>
              <li
                onClick={() => props.handleSectionChange(2)}
                className={`nav-item px-3 mb-sm-3 mb-3 mb-lg-0 ${
                  props.currentSection === 2 ? "active" : ""
                }`}
              >
                <a className="nav-link" href="#contact">
                  {" "}
                  Contact
                </a>
              </li>
            </ul>
            <div className="navbar-text ml-lg-auto pr-5 hvr-grow">
              <a
                role="button"
                data-toggle="modal"
                data-target="#loginModal"
                className="btn btn-color1"
              >
                <i className="fa fa-sign-in"></i> LOGOUT
              </a>
            </div>
          </div>
        </Nav>
      </div> */}
    </>
  );
};

export default NavbarComponent;
