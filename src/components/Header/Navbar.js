import React, { useState, useEffect } from "react";
import "./styles.scss";

import { useDispatch, useSelector } from "react-redux";

import {
  handleClickCategory,
  handlePauseDetection,
  loginUser,
  logoutUser,
  signupUser,
} from "../../redux/ActionCreators";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Modal,
} from "reactstrap";

import { NavLink as NavLinkR } from "react-router-dom";

import SearchBar from "../SearchBar";
import MobileTabs from "../MobileTabs";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import Button from "reactstrap/lib/Button";

const NavbarComponent = (props) => {
  const groceryCategories = useSelector((state) => state.groceryCategories);
  const groceryInstances = useSelector((state) => state.groceryInstances);
  const recipes = useSelector((state) => state.recipes);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  const [pageName, setPageName] = useState("");

  const [mobileTabsData, setMobileTabsData] = useState([]);
  const toggle = () => setIsOpen(!isOpen);

  const handleNavItemClick = (sectionId) => {
    if (sectionId === "groceries" || sectionId === "recipes")
      setPageName(sectionId);
    else setPageName("homepage");
    props.handleScrollSectionChange(sectionId);
    setIsOpen(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);

  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  useEffect(() => {
    const mobileTabsDataCalc = [];
    groceryCategories.groceryCategories.forEach((gc) => {
      if (
        groceryInstances.groceryInstances.filter(
          (gI) => gI.grocery.category === gc._id
        ).length
      ) {
        mobileTabsDataCalc.push(gc);
      }
    });
    setMobileTabsData(mobileTabsDataCalc);

    // const mobileTabsDataCalc = [];
    // groceryCategories.groceryCategories.forEach((gc) => {
    //   if (
    //     groceryInstances.groceryInstances.filter(
    //       (gI) => gI.grocery.category === gc._id
    //     ).length
    //   ) {
    //     mobileTabsDataCalc.push(gc);
    //   }
    // });
    // setMobileTabsData(mobileTabsDataCalc);

    setIsHomePage(true);
    const urlValue = window.location.href;
    if (urlValue.includes("/groceries")) {
      setPageName("groceries");
      setIsHomePage(false);
    } else if (urlValue.includes("/recipes")) {
      setPageName("recipes");
      setIsHomePage(false);
    }
  }, [props.currentSection, groceryCategories, pageName]);

  const handleRecipeTabClick = (id) => {
    recipes.history.push(`/recipes${id !== null ? `?category=${id}` : ""}`);
  };

  const handleClickLoginoutButton = () => {
    if (auth.user) {
      dispatch(logoutUser());
      window.location.href = "/";
    } else {
      setSignInModalVisible(true);
    }
  };

  const handleSignupButton = () => {
    setSignUpModalVisible(true);
  };

  const handleSignUp = () => {
    let error = null;
    if (!username) {
      error = "username required";
    } else if (!password) {
      error = "no password provided";
    } else if (password2 !== password) {
      error = "passwords don't match";
    }

    setError(error);

    if (!error) {
      dispatch(
        signupUser({ username, password }, setSignUpModalVisible, setError)
      );
      setError("");
    }
  };

  const handleSignIn = () => {
    let error = null;
    if (!username) {
      error = "username required";
    } else if (!password) {
      error = "password missing";
    }

    setErrorLogin(error);

    if (!error) {
      dispatch(
        loginUser({ username, password }, setSignInModalVisible, setErrorLogin)
      );
      setErrorLogin("");
    }
  };
  return (
    <>
      <Modal isOpen={signUpModalVisible}>
        <ModalHeader>Signup</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center">
            <label className="col-5 mt-1" for="username">
              Username:
            </label>
            <div className="col-7">
              <input
                className="form-control"
                id="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <label className="col-5 mt-1" for="password">
              Password:
            </label>
            <div className="col-7">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <label className="col-5 mt-1" for="reenter-password">
              Re-enter Password:
            </label>
            <div className="col-7">
              <input
                type="password"
                className="form-control"
                id="reenter-password"
                placeholder="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
          </div>
          <div className="text-danger mt-2 ml-2">{error}</div>
          <div className="d-flex justify-content-center mt-3">
            <Button className="w-100 m-2 btn-color2 btn" onClick={handleSignUp}>
              SIGNUP
            </Button>
            <Button
              className="w-100 m-2 btn-danger btn"
              onClick={() => setSignUpModalVisible(false)}
            >
              CANCEL
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={signInModalVisible}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center">
            <label className="col-5 mt-1" for="username">
              Username:
            </label>
            <div className="col-7">
              <input
                className="form-control"
                id="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <label className="col-5 mt-1" for="password">
              Password:
            </label>
            <div className="col-7">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-danger mt-2 ml-2">{errorLogin}</div>
          <div className="d-flex justify-content-center mt-3">
            <Button className="w-100 m-2 btn-color2 btn" onClick={handleSignIn}>
              LOGIN
            </Button>
            <Button
              className="w-100 m-2 btn-danger btn"
              onClick={() => setSignInModalVisible(false)}
            >
              CANCEL
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <div>
        {console.log("AUTHHHHHH", auth)}
        <Navbar fixed="top" light expand="lg" className="navbar-dark">
          <a className="navbar-brand hvr-grow" href="#homeSection">
            COOK<span className="navbar-brand-light">BOOK</span>
          </a>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem
                className={`nav-item px-3 px-lg-0 pr-lg-3 mb-3 mb-lg-0 ${
                  props.currentSection === 0 && isHomePage ? "active" : ""
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
              {auth.user && (
                <>
                  <NavItem
                    className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0`}
                  >
                    <NavLinkR
                      onClick={() => handleNavItemClick("groceries")}
                      className="nav-link"
                      to="/groceries"
                    >
                      My List
                    </NavLinkR>
                  </NavItem>
                  <NavItem
                    className={`nav-item px-3 px-lg-3 pr-lg-3 mb-3 mb-lg-0`}
                  >
                    <NavLinkR
                      className="nav-link"
                      to="/recipes"
                      onClick={() => handleNavItemClick("recipes")}
                    >
                      Recipes
                    </NavLinkR>
                  </NavItem>
                </>
              )}
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
            <NavbarText className="ml-lg-auto pr-5">
              {auth.user ? (
                <span style={{ marginRight: 15 }}>
                  Hey, {auth.user.username}
                </span>
              ) : null}
              {!auth.user && (
                <a
                  onClick={handleSignupButton}
                  className="btn btn-color1 mr-2 hvr-grow"
                >
                  <i className="fa fa-sign-up" style={{ marginRight: 5 }}></i>
                  SIGNUP
                </a>
              )}
              <a
                onClick={handleClickLoginoutButton}
                className="btn btn-color1 hvr-grow"
              >
                <i className="fa fa-sign-in" style={{ marginRight: 5 }}></i>
                {auth.user ? "LOGOUT" : "LOGIN"}
              </a>
            </NavbarText>
          </Collapse>

          {window.innerWidth < 992 &&
          (pageName === "groceries" || pageName === "recipes") ? (
            <SearchBar />
          ) : null}

          {pageName === "groceries" &&
          !groceryInstances.groceryInstanceToFilter ? (
            <MobileTabs
              key={pageName}
              data={mobileTabsData}
              activeTab={groceryCategories.activeCat}
              onTabClick={(id) => {
                dispatch(handleClickCategory(id, groceryInstances.refObj));
                dispatch(handlePauseDetection());
              }}
              groupName={"groceryCategories"}
            />
          ) : pageName === "recipes" &&
            !groceryInstances.groceryInstanceToFilter ? (
            <MobileTabs
              key={pageName}
              data={recipes.categories}
              activeTab={recipes.activeRecipeCategory}
              onTabClick={handleRecipeTabClick}
              groupName={"recipeCategories"}
            />
          ) : null}
        </Navbar>
      </div>
    </>
  );
};

export default NavbarComponent;
