import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";

import checkmark from "../../check-mark.gif";

import { Fade, Stagger } from "react-animation-components";

import { useDispatch, useSelector } from "react-redux";

import AccordionComponent from "../../components/AccordionComponent";

import ContentLoader from "react-content-loader";

import CheckMarkLottie from "./CheckMarkLottie";
import SpinnerLottie from "../../components/Spinner";
import CrossLottie from "./Cross";
import ErrorLottie from "./ErrorLottie";
import RetryLottie from "./RetryLottie";
import AddLottie from "./AddLottie";
import { addIngredientToList, postGrocery } from "../../redux/ActionCreators";

const RecipeDetailsModal = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) =>
      state.recipes.recipeIngredientsLoading || state.recipes.recipeStepsLoading
  );

  const failedToFetch = useSelector(
    (state) =>
      state.recipes.recipeIngredientsFailed || state.recipes.recipeStepsFailed
  );
  const ingredientsList = useSelector(
    (state) => state.recipes.recipeIngredients
  );
  const stepsList = useSelector((state) => state.recipes.recipeSteps);
  const [activeTab, setActiveTab] = useState("1");

  const [ingredientToBeAdded, setIngredientToBeAdded] = useState(null);
  const [ingredientAdded, setIngredientAdded] = useState(null);
  const [retryHover, setRetryHover] = useState(null);
  const [addHover, setAddHover] = useState(null);
  const [addAllHover, setAddAllHover] = useState(false);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleIngredientAdd = (ingredient) => {
    setRetryHover(null);
    setAddHover(null);
    dispatch(addIngredientToList(ingredient));
  };

  const handleAddAllIngredients = () => {
    ingredientsList.forEach((ingredient) => {
      handleIngredientAdd(ingredient);
    });
  };

  return (
    <div>
      <Modal isOpen={props.modalOpen} toggle={props.toggle}>
        {console.log("PROPSSSS", props)}
        <ModalHeader className="lightgreen-bg ">
          <h3>{props.recipeOpen.title}</h3>
        </ModalHeader>

        {isLoading ? (
          <ContentLoader
            speed={2}
            width={"100%"}
            height={500}
            viewBox="0 0 476 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="19" y="22" rx="11" ry="11" width="90%" height="137" />
            <rect x="22" y="175" rx="10" ry="10" width="44%" height="40" />
            <rect x="50%" y="176" rx="10" ry="10" width="44%" height="40" />
            <circle cx="40" cy="251" r="12" />
            <rect x="72" y="241" rx="7" ry="7" width="78%" height="17" />
            <circle cx="40" cy="288" r="12" />
            <rect x="72" y="278" rx="7" ry="7" width="78%" height="17" />
            <circle cx="41" cy="325" r="12" />
            <rect x="73" y="315" rx="7" ry="7" width="78%" height="17" />
            <circle cx="41" cy="362" r="12" />
            <rect x="73" y="352" rx="7" ry="7" width="78%" height="17" />
            <circle cx="43" cy="403" r="12" />
            <rect x="75" y="393" rx="7" ry="7" width="78%" height="17" />
            <circle cx="43" cy="440" r="12" />
            <rect x="75" y="430" rx="7" ry="7" width="78%" height="17" />
            <circle cx="44" cy="477" r="12" />
            <rect x="76" y="467" rx="7" ry="7" width="78%" height="17" />
            <circle cx="44" cy="514" r="12" />
            <rect x="76" y="504" rx="7" ry="7" width="78%" height="17" />
          </ContentLoader>
        ) : failedToFetch ? (
          <div>Failed to fetch</div>
        ) : (
          <ModalBody>
            <Fade in>
              <div class="row justify-content-center">
                <div class="col-12">
                  <img
                    src={props.recipeOpen.image}
                    class="recipe-modal-image img-fluid img-thumbnail"
                    alt="responsive image"
                  />
                </div>
              </div>

              <div>
                <Nav tabs id="recipeModalTabs">
                  <NavItem className="w-50 text-center mt-3">
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Ingredients
                    </NavLink>
                  </NavItem>
                  <NavItem className="w-50 text-center mt-3">
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Prep. Steps
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    {activeTab === "1" ? (
                      <div class="container">
                        <div
                          class="col-11 mt-2 border-bottom py-2"
                          onMouseEnter={() => setAddAllHover(true)}
                          onMouseLeave={() => setAddAllHover(false)}
                          onClick={handleAddAllIngredients}
                          style={{ cursor: "pointer" }}
                        >
                          {addAllHover ? <AddLottie all={true} /> : null}
                          <span
                            class="add-all-plus"
                            style={{ opacity: addAllHover ? 0 : 1 }}
                          >
                            +
                          </span>
                          Add all ingredients to grocery list
                        </div>
                        <Stagger in>
                          {ingredientsList.map((ingredient, i) => {
                            return (
                              <Fade in>
                                <div
                                  class={`col-11 py-2 d-flex ${
                                    i + 1 === ingredientsList.length
                                      ? ""
                                      : "border-bottom"
                                  }`}
                                >
                                  {/*                                   
                                  {i % 2 ? (
                                    <SpinnerLottie />
                                  ) : (
                                    <CheckMarkLottie />
                                  )} */}

                                  {console.log(
                                    "COMAPREEE",
                                    ingredient.id,
                                    ingredientToBeAdded
                                  )}
                                  <div
                                    onMouseEnter={
                                      ingredient.addingToListStatus === "failed"
                                        ? () => setRetryHover(ingredient.id)
                                        : null
                                    }
                                    onMouseLeave={
                                      ingredient.addingToListStatus === "failed"
                                        ? () => setRetryHover(null)
                                        : null
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {ingredient.addingToListStatus ===
                                    "pending" ? (
                                      <SpinnerLottie />
                                    ) : ingredient.addingToListStatus ===
                                      "success" ? (
                                      <CheckMarkLottie />
                                    ) : ingredient.addingToListStatus ===
                                      "failed" ? (
                                      retryHover === ingredient.id ? (
                                        <RetryLottie />
                                      ) : (
                                        <ErrorLottie />
                                      )
                                    ) : null}
                                    {addHover === ingredient.id ? (
                                      <AddLottie />
                                    ) : null}
                                    <div
                                      class="add-ingredient-plus text-center"
                                      style={{
                                        opacity:
                                          ingredient.addingToListStatus ||
                                          addHover === ingredient.id
                                            ? 0
                                            : 1,
                                      }}
                                      onClick={() =>
                                        handleIngredientAdd(ingredient)
                                      }
                                      onMouseEnter={
                                        !ingredient.addingToListStatus
                                          ? () => setAddHover(ingredient.id)
                                          : null
                                      }
                                      onMouseLeave={() => setAddHover(null)}
                                    >
                                      +
                                    </div>
                                  </div>

                                  <div>
                                    {ingredient.grocery.name} -{" "}
                                    <small class="recipe-tab-note">
                                      {" "}
                                      {ingredient.detail}
                                    </small>
                                  </div>
                                </div>
                              </Fade>
                            );
                          })}
                        </Stagger>
                      </div>
                    ) : null}
                  </TabPane>
                  <TabPane tabId="2">
                    {activeTab === "2" ? (
                      <AccordionComponent panels={panels} steps={stepsList} />
                    ) : null}
                  </TabPane>
                </TabContent>
              </div>
            </Fade>
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RecipeDetailsModal;

const panels = [
  {
    label: "Seriously, Don't Use Icon Fonts",
    content:
      'Icons are everywhere. These "little miracle workers" (as John Hicks described them) help us reinforce meaning in the interfaces we design and build. Their popularity in web design has never been greater; the conciseness and versatility of pictograms in particular make them a lovely fit for displays large and small. But icons on the web have had their fair share of challenges.',
  },
  {
    label: "Screen Readers Actually Read That Stuff",
    content:
      'Most assistive devices will read aloud text inserted via CSS, and many of the Unicode characters icon fonts depend on are no exception. Best-case scenario, your "favorite" icon gets read aloud as "black favorite star." Worse-case scenario, it\'s read as "unpronounceable" or skipped entirely.',
  },
  {
    label: "They Fail Poorly and Often",
    content:
      'When your icon font fails, the browser treats it like any other font and replaces it with a fallback. Best-case scenario, you\'ve chosen your fallback characters carefully and something weird-looking but communicative still loads. Worse-case scenario (and far more often), the user sees something completely incongruous, usually the dreaded "missing character" glyph.',
  },
  {
    label: "They're a Nightmare if You're Dyslexic",
    content:
      "Many dyslexic people find it helpful to swap out a website's typeface for something like OpenDyslexic. But icon fonts get replaced as well, which makes for a frustratingly broken experience.",
  },
  {
    label: "There's Already a Better Way",
    content:
      "SVG is awesome for icons! It's a vector image format with optional support for CSS, JavaScript, reusability, accessibility and a bunch more. It was made for this sort of thing.",
  },
];
