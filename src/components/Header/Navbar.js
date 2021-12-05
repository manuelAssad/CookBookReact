import React, { useState, useEffect } from "react";
import "./styles.scss";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

import { NavLink as NavLinkR } from "react-router-dom";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const handleNavItemClick = (sectionId) => {
    props.handleSectionChange(sectionId);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsHomePage(true);
    const urlValue = window.location.href;
    if (urlValue.includes("groceries")) {
      props.handleSectionChange("/groceries");
      setIsHomePage(false);
    } else if (urlValue.includes("/recipes")) {
      props.handleSectionChange("recipes");
      setIsHomePage(false);
    }
  }, [props.currentSection]);

  return (
    <>
      <div>
        <Navbar fixed="top" light expand="lg" className="navbar-dark">
          <a className="navbar-brand hvr-grow" href="#homeSection">
            COOK<span className="navbar-brand-light">BOOK</span>
          </a>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem
                className={`nav-item px-3 px-lg-0 pr-lg-3 mb-3 mb-lg-0 ${
                  props.currentSection === 0 ? "active" : ""
                }`}
              >
                {isHomePage ? (
                  <NavLink
                    onClick={() => handleNavItemClick(0)}
                    href={"#homeCarousel"}
                  >
                    Home
                  </NavLink>
                ) : (
                  <NavLinkR
                    onClick={() => handleNavItemClick(0)}
                    to="/home"
                    className="nav-link"
                  >
                    Home
                  </NavLinkR>
                )}
              </NavItem>
              <NavItem className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0`}>
                <NavLinkR
                  onClick={() => handleNavItemClick("groceries")}
                  className="nav-link"
                  to="/groceries"
                >
                  My List
                </NavLinkR>
              </NavItem>
              <NavItem className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0`}>
                <NavLinkR
                  className="nav-link"
                  to="/recipes"
                  onClick={() => handleNavItemClick("recipes")}
                >
                  Recipes
                </NavLinkR>
              </NavItem>
              {isHomePage ? (
                <>
                  <NavItem
                    onClick={() => handleNavItemClick(1)}
                    className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0 ${
                      props.currentSection === 1 ? "active" : ""
                    }`}
                  >
                    <NavLink href="#about">About</NavLink>
                  </NavItem>
                  <NavItem
                    onClick={() => handleNavItemClick(2)}
                    className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0 ${
                      props.currentSection === 2 ? "active" : ""
                    }`}
                  >
                    <NavLink href="#contact">Contact</NavLink>
                  </NavItem>
                </>
              ) : null}
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
    </>
  );
};

export default NavbarComponent;
