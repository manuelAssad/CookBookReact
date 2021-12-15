import React, { useState, useEffect } from "react";
import "./styles.scss";

import { useDispatch, useSelector } from "react-redux";

import { handleClickCategory } from "../../redux/ActionCreators";

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

import SearchBar from "../SearchBar";
import MobileTabs from "../MobileTabs";

const NavbarComponent = (props) => {
  const groceryCategories = useSelector((state) => state.groceryCategories);
  const groceryInstances = useSelector((state) => state.groceryInstances);
  const recipes = useSelector((state) => state.recipes);
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

  useEffect(() => {
    const mobileTabsDataCalc = [];
    groceryCategories.groceryCategories.forEach((gc) => {
      if (
        groceryInstances.groceryInstances.filter(
          (gI) => gI.grocery.category === gc.id
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
    //       (gI) => gI.grocery.category === gc.id
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

          {window.innerWidth < 992 &&
          (pageName === "groceries" || pageName === "recipes") ? (
            <SearchBar />
          ) : null}

          {pageName === "groceries" ? (
            <MobileTabs
              key={pageName}
              data={mobileTabsData}
              activeTab={groceryCategories.activeCat}
              onTabClick={(id) =>
                dispatch(handleClickCategory(id, groceryInstances.refObj))
              }
              groupName={"groceryCategories"}
            />
          ) : pageName === "recipes" ? (
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
