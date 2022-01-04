import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "react-redux-form";

import { Fade } from "react-animation-components";

import {
  setSearchActive,
  handleChangeNewGrocery,
  filterGroceries,
  setIngredientToEdit,
  setPrepStepToEdit,
} from "../../redux/ActionCreators";

import AddIngredientModal from "./AddIngredientModal";
import AddPrepStepModal from "./AddPrepStepModal";
import ImageUrlModal from "./ImageUrlModal";

import { Control, Form, Errors } from "react-redux-form";

const RecipeEditModal = (props) => {
  const dispatch = useDispatch();

  const recipeFormDetails = useSelector((state) => state.recipeForm);

  const [addPrepStepModalOpen, setAddPrepStepModalOpen] = useState(false);
  const [addIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [imageUrlModalOpen, setImageUrlModalOpen] = useState(false);

  const [ingredientsListModalOpen, setIngredientsListModalOpen] =
    useState(false);

  const [prepStepsListModalOpen, setprepStepsListModalOpen] = useState(false);

  const handleSubmit = (values) => {
    alert("HI");
    alert(JSON.stringify(values));
  };
  return (
    <div>
      <ImageUrlModal
        modalOpen={imageUrlModalOpen}
        toggleModal={() => setImageUrlModalOpen(!imageUrlModalOpen)}
        setImageUrl={(url) =>
          dispatch(actions.change("recipeForm.imageUrl", url))
        }
      />
      <AddIngredientModal
        modalOpen={addIngredientModalOpen}
        toggleModal={() => {
          setAddIngredientModalOpen(!addIngredientModalOpen);
          dispatch(setSearchActive(false));
          dispatch(handleChangeNewGrocery(""));
          dispatch(filterGroceries(""));
          dispatch(setIngredientToEdit({}));
        }}
        toggleEditModal={() => {
          props.toggleModal();
          dispatch(setIngredientToEdit({}));
        }}
        ingredientsListModalOpen={ingredientsListModalOpen}
        setIngredientsListModalOpen={setIngredientsListModalOpen}
      />
      <AddPrepStepModal
        modalOpen={addPrepStepModalOpen}
        toggleModal={() => {
          setAddPrepStepModalOpen(!addPrepStepModalOpen);
          dispatch(setPrepStepToEdit({}));
        }}
        toggleEditModal={() => {
          props.toggleModal();
          dispatch(setPrepStepToEdit({}));
        }}
        prepStepsListModalOpen={prepStepsListModalOpen}
        setprepStepsListModalOpen={setprepStepsListModalOpen}
      />
      <Modal isOpen={props.modalOpen}>
        <ModalHeader className="lightgreen-bg ">
          <h3>Create New Recipe</h3>
        </ModalHeader>

        <ModalBody>
          <Fade in>
            <Form
              model="recipeForm"
              onSubmit={(values) => handleSubmit(values)}
            >
              <div class="container-fluid">
                <div class="row justify-content-center">
                  <div class="col-12 mb-4">
                    <img
                      src={
                        recipeFormDetails.imageUrl
                          ? recipeFormDetails.imageUrl
                          : "https://delo-vcusa.ru/lazy-load-placeholder.png"
                      }
                      class="recipe-modal-image img-fluid img-thumbnail"
                      alt="responsive image"
                    />
                    <div
                      class="add-recipe-photo-text"
                      onClick={() => setImageUrlModalOpen(!imageUrlModalOpen)}
                    >
                      {recipeFormDetails.imageUrl
                        ? "Change Photo"
                        : "Add photo"}
                    </div>
                  </div>
                  <div class="col-12 mt-3">
                    <div class="form-row">
                      <div class="col-12">
                        <Control.text
                          model=".name"
                          id="name"
                          name="name"
                          placeholder="Recipe Name"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div class="form-row mt-3 row">
                      <div class="col-md-6">
                        <Control.select
                          name="category"
                          model=".category"
                          className="form-control mr-2 ml-md-0"
                        >
                          <option value={{}}>Select Category...</option>
                          <option value={{ id: 0, name: "Main Course" }}>
                            Main Course
                          </option>
                          <option value={{ id: 1, name: "Side Dish" }}>
                            Side Dish
                          </option>
                          <option value={{ id: 2, name: "Dessert" }}>
                            Dessert
                          </option>
                          <option value={{ id: 3, name: "Other" }}>
                            Other
                          </option>
                        </Control.select>
                      </div>

                      <div class="col-12 col-md-6 d-flex align-self-start mt-3 mt-md-0">
                        <div class="text-center my-auto ml-md-auto">
                          Servings:
                        </div>
                        <div
                          class="btn-group ml-md-auto"
                          role="group"
                          aria-label="Basic example"
                        >
                          <div class="align-self-center mr-3 ml-3">
                            {recipeFormDetails.servings}
                          </div>
                          <button
                            type="button"
                            class="btn border-r-left servings-button"
                            onClick={() =>
                              dispatch(
                                actions.change(
                                  "recipeForm.servings",
                                  recipeFormDetails.servings + 1
                                )
                              )
                            }
                          >
                            +
                          </button>
                          <button
                            type="button"
                            class="btn border-r-right servings-button"
                            onClick={() => {
                              recipeFormDetails.servings > 1
                                ? dispatch(
                                    actions.change(
                                      "recipeForm.servings",
                                      recipeFormDetails.servings - 1
                                    )
                                  )
                                : dispatch(
                                    actions.change(
                                      "recipeForm.servings",
                                      recipeFormDetails.servings
                                    )
                                  );
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="form-row mt-3">
                      <div class="col-md-6 d-flex">
                        <span class="my-auto">Cook Time:</span>
                        <Control.text
                          model=".cookTime"
                          id="cookTime"
                          name="cookTime"
                          className="form-control ml-2 cook-time-input small-inputs-margin-1"
                        />
                        <span class="my-auto ml-2">min</span>
                      </div>

                      <div class="col-md-6 d-flex mt-2 mt-md-0">
                        <span class="my-auto ml-md-auto">Prep Time:</span>
                        <Control.text
                          model=".prepTime"
                          id="prepTime"
                          name="prepTime"
                          className="form-control ml-2 cook-time-input small-inputs-margin-1"
                        />
                        <span class="my-auto ml-2">min</span>
                      </div>
                    </div>

                    <div class="form-row mt-3">
                      <div class="col-12 col-md-6">
                        <div
                          class="btn add-recipe-modal-btn w-100 hvr-grow"
                          onClick={() => {
                            setAddIngredientModalOpen(!addIngredientModalOpen);
                            props.toggleModal();
                          }}
                        >
                          Add Ingredient{" "}
                        </div>
                      </div>

                      <div class="col-12 col-md-6 mt-2 mt-md-0">
                        <div
                          class="btn add-recipe-modal-btn w-100 hvr-grow"
                          onClick={() => {
                            setAddPrepStepModalOpen(!addPrepStepModalOpen);
                            props.toggleModal();
                          }}
                        >
                          Add Preparation Step
                        </div>
                      </div>

                      {!!recipeFormDetails.ingredients.length && (
                        <div
                          class="col-12 col-md-6 mt-1"
                          onClick={() => {
                            setIngredientsListModalOpen(
                              !ingredientsListModalOpen
                            );
                            props.toggleModal();
                          }}
                        >
                          <div class="btn view-recipe-modal-btn w-100 hvr-grow">
                            Show {recipeFormDetails.ingredients.length}{" "}
                            Ingredient
                            {recipeFormDetails.ingredients.length > 1
                              ? "s"
                              : ""}
                          </div>
                        </div>
                      )}
                      {!!recipeFormDetails.prepSteps.length && (
                        <div
                          class={`col-12 col-md-6 mt-1 ${
                            recipeFormDetails.ingredients.length
                              ? ""
                              : "offset-md-6"
                          }`}
                          onClick={() => {
                            setprepStepsListModalOpen(!prepStepsListModalOpen);
                            props.toggleModal();
                          }}
                        >
                          <div class="btn view-recipe-modal-btn w-100 hvr-grow">
                            Show {recipeFormDetails.prepSteps.length} Prep Step
                            {recipeFormDetails.prepSteps.length > 1 ? "s" : ""}
                          </div>
                        </div>
                      )}
                    </div>

                    <div class="form-row mt-5">
                      <div class="col-6">
                        <button class="btn grocery-modal-button-1 hvr-grow">
                          SAVE
                        </button>
                      </div>
                      <div class="col-6">
                        <button
                          class="btn grocery-modal-button-2 hvr-grow"
                          onClick={props.toggleModal}
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Fade>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RecipeEditModal;
