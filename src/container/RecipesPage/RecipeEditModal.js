import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "react-redux-form";

import { Fade } from "react-animation-components";

import {
  setSearchActive,
  handleChangeNewGrocery,
  filterGroceries,
  setIngredientToEdit,
  setPrepStepToEdit,
  addNewRecipe,
  editRecipe,
} from "../../redux/ActionCreators";

import AddIngredientModal from "./AddIngredientModal";
import AddPrepStepModal from "./AddPrepStepModal";
import ImageUrlModal from "./ImageUrlModal";

import { Control, Form, Errors } from "react-redux-form";

import FileBase64 from "react-file-base64";

import ContentLoader from "react-content-loader";

import { baseUrl } from "../../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const RecipeEditModal = (props) => {
  useEffect(() => {
    console.log(
      props.recipe,
      props.recipeIngredients,
      props.recipePrepSteps,
      "RECIEREREASER"
    );
    if (props.editMode) {
      dispatch(actions.change("recipeForm.name", props.recipe.title));
      dispatch(
        actions.change("recipeForm.category", props.recipe.recipe_category)
      );
      dispatch(actions.change("recipeForm.servings", props.recipe.servings));
      dispatch(actions.change("recipeForm.cookTime", props.recipe.cook_time));
      dispatch(actions.change("recipeForm.prepTime", props.recipe.prep_time));
      dispatch(
        actions.change("recipeForm.ingredients", props.recipeIngredients)
      );
      dispatch(actions.change("recipeForm.prepSteps", props.recipePrepSteps));
      dispatch(actions.change("recipeForm.imageFile", props.recipe.image));
    } else {
      dispatch(actions.change("recipeForm.name", ""));
      dispatch(actions.change("recipeForm.category", {}));
      dispatch(actions.change("recipeForm.servings", 1));
      dispatch(actions.change("recipeForm.cookTime", 0));
      dispatch(actions.change("recipeForm.prepTime", 1));
      dispatch(actions.change("recipeForm.ingredients", []));
      dispatch(actions.change("recipeForm.prepSteps", []));
      dispatch(actions.change("recipeForm.imageFile", ""));
    }
  }, [props.editMode, props.recipeIngredients, props.recipePrepSteps]);

  const dispatch = useDispatch();

  const recipeFormDetails = useSelector((state) => state.recipeForm);
  const recipeCategories = useSelector((state) => state.recipes.categories);
  const addingNewRecipeLoading = useSelector(
    (state) => state.recipes.addingNewRecipeLoading
  );
  const addingNewRecipeFailed = useSelector(
    (state) => state.recipes.addingNewRecipeFailed
  );

  const [addPrepStepModalOpen, setAddPrepStepModalOpen] = useState(false);
  const [addIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [imageUrlModalOpen, setImageUrlModalOpen] = useState(false);

  const [ingredientsListModalOpen, setIngredientsListModalOpen] =
    useState(false);

  const [prepStepsListModalOpen, setprepStepsListModalOpen] = useState(false);

  const getFiles = (files) => {
    console.log(files, "FILESSSS");
    dispatch(actions.change("recipeForm.imageFile", files.base64));
    dispatch(
      actions.setValidity("recipeForm.imageFile", {
        required: required("string"),
      })
    );
  };

  const handleValidateForm = () => {
    let formValid = true;

    if (!recipeFormDetails.imageFile) {
      formValid = false;
      dispatch(
        actions.setValidity("recipeForm.imageFile", {
          required: required(recipeFormDetails.imageFile),
        })
      );
      return formValid;
    }

    if (!recipeFormDetails.category.name) {
      formValid = false;
      dispatch(
        actions.setValidity("recipeForm.category", {
          required: required(recipeFormDetails.category.name),
        })
      );
      return formValid;
    }

    if (
      !recipeFormDetails.cookTime &&
      parseInt(recipeFormDetails.cookTime) !== 0
    ) {
      formValid = false;
      dispatch(
        actions.setValidity("recipeForm.cookTime", {
          required: required(""),
        })
      );
      return formValid;
    }

    if (!recipeFormDetails.prepTime) {
      formValid = false;
      dispatch(
        actions.setValidity("recipeForm.prepTime", {
          required: required(""),
        })
      );
      return formValid;
    }

    if (!recipeFormDetails.ingredients.length) {
      formValid = false;
      dispatch(
        actions.setValidity("recipeForm.ingredients", {
          required: required(recipeFormDetails.ingredients.length),
        })
      );
      return formValid;
    }

    if (!recipeFormDetails.prepSteps.length) {
      formValid = false;
      dispatch(
        actions.setValidity("recipeForm.prepSteps", {
          required: required(recipeFormDetails.prepSteps.length),
        })
      );
      return formValid;
    }

    return formValid;
  };

  const resetForm = () => {
    dispatch(actions.reset("recipeForm"));
  };
  const handleSubmit = (values) => {
    const formValid = handleValidateForm();
    if (formValid) {
      if (props.editMode)
        dispatch(
          editRecipe(values, props.toggleModal, resetForm, props.recipe._id)
        );
      else dispatch(addNewRecipe(values, props.toggleModal, resetForm));
    }
  };

  const handleChangeCategory = (e) => {
    if (recipeCategories.filter((cat) => cat._id == e.target.value)[0]) {
      dispatch(
        actions.change(
          "recipeForm.category",
          recipeCategories.filter((cat) => cat._id == e.target.value)[0]
        )
      );
      dispatch(
        actions.setValidity("recipeForm.category", {
          required: required("string"),
        })
      );
    } else
      dispatch(
        actions.setValidity("recipeForm.category", {
          required: required(""),
        })
      );
  };
  return (
    <div>
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
        setErrors={(value) =>
          dispatch(
            actions.setValidity("recipeForm.ingredients", {
              required: required(value),
            })
          )
        }
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
        setErrors={(value) =>
          dispatch(
            actions.setValidity("recipeForm.prepSteps", {
              required: required(value),
            })
          )
        }
      />
      <Modal isOpen={props.modalOpen}>
        <ModalHeader className="lightgreen-bg ">
          <h3>{props.editMode ? "Edit Recipe" : "Create New Recipe"}</h3>
        </ModalHeader>

        <ModalBody>
          <Fade in>
            {props.editMode && props.loading ? (
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
            ) : (
              <Form
                model="recipeForm"
                onSubmit={(values) => handleSubmit(values)}
              >
                <div class="container-fluid">
                  <div class="row justify-content-center">
                    <div class="col-12 mb-4">
                      <img
                        class="recipe-modal-image img-fluid img-thumbnail"
                        src={
                          recipeFormDetails.imageFile
                            ? `${
                                recipeFormDetails.imageFile.includes("base64")
                                  ? ""
                                  : `${baseUrl}/`
                              }${recipeFormDetails.imageFile}`
                            : "https://delo-vcusa.ru/lazy-load-placeholder.png"
                        }
                      />

                      <Errors
                        model=".imageFile"
                        messages={{
                          required: "Image required",
                        }}
                        component="div"
                        className="text-danger"
                      />
                      <div
                        class="add-recipe-photo-text"
                        onClick={() => setImageUrlModalOpen(!imageUrlModalOpen)}
                      ></div>
                      {!recipeFormDetails.imageFile ? (
                        <div className="mt-2">
                          <FileBase64
                            multiple={false}
                            onDone={(data) => getFiles(data)}
                          />
                        </div>
                      ) : (
                        <div
                          className="mt-2 text-danger"
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            dispatch(actions.change("recipeForm.imageFile", ""))
                          }
                        >
                          Remove Image
                        </div>
                      )}
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
                            validators={{
                              required,
                              minLength: minLength(2),
                              maxLength: maxLength(35),
                            }}
                          />
                          <Errors
                            show="touched"
                            model=".name"
                            messages={{
                              required: "Required",
                              minLength: "Must be atleast 2 characters",
                              maxLength: "Must be 15 characters or less",
                            }}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      {console.log(
                        recipeFormDetails,
                        "recipeFormDetailsrecipeFormDetails"
                      )}
                      <div class="form-row mt-3 row">
                        <div class="col-md-6">
                          <select
                            name="category"
                            className="form-control mr-2 ml-md-0"
                            onChange={(e) => handleChangeCategory(e)}
                            value={
                              recipeFormDetails.category
                                ? recipeFormDetails.category._id
                                : null
                            }
                          >
                            <option>Select Category...</option>
                            {recipeCategories.map((cat) => {
                              return (
                                <option value={cat._id}>{cat.name}</option>
                              );
                            })}
                          </select>
                          <Errors
                            model=".category"
                            messages={{
                              required: "required",
                            }}
                            component="div"
                            className="text-danger"
                          />
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
                          <input
                            type="number"
                            min="0"
                            id="cookTime"
                            name="cookTime"
                            className="form-control ml-2 cook-time-input small-inputs-margin-1"
                            onChange={(e) => {
                              if (parseInt(e.target.value) <= 0) {
                                dispatch(
                                  actions.change("recipeForm.cookTime", 0)
                                );
                              } else
                                dispatch(
                                  actions.change(
                                    "recipeForm.cookTime",
                                    e.target.value
                                  )
                                );
                              dispatch(
                                actions.setValidity("recipeForm.cookTime", {
                                  required: required("string"),
                                })
                              );
                            }}
                            value={recipeFormDetails.cookTime}
                          />

                          <span class="my-auto ml-2">min</span>
                        </div>

                        <div class="col-md-6 d-flex mt-2 mt-md-0">
                          <span class="my-auto ml-md-auto">Prep Time:</span>
                          <input
                            type="number"
                            min="1"
                            id="prepTime"
                            name="prepTime"
                            className="form-control ml-2 cook-time-input small-inputs-margin-1"
                            onChange={(e) => {
                              {
                                if (parseInt(e.target.value) < 1) {
                                  dispatch(
                                    actions.change("recipeForm.prepTime", "")
                                  );
                                } else {
                                  dispatch(
                                    actions.change(
                                      "recipeForm.prepTime",
                                      e.target.value
                                    )
                                  );
                                  dispatch(
                                    actions.setValidity("recipeForm.prepTime", {
                                      required: required("string"),
                                    })
                                  );
                                }
                              }
                            }}
                            value={recipeFormDetails.prepTime}
                          />
                          <span class="my-auto ml-2">min</span>
                        </div>

                        <div class="col-md-6 d-flex mt-2 mt-md-0">
                          <Errors
                            model=".cookTime"
                            messages={{
                              required: "required",
                            }}
                            component="div"
                            className="text-danger "
                          />
                        </div>
                        <div class="col-md-6 d-flex mt-2 mt-md-0">
                          <Errors
                            model=".prepTime"
                            messages={{
                              required: "required",
                            }}
                            component="div"
                            className="text-danger ml-2"
                          />
                        </div>
                      </div>

                      <div class="form-row mt-3">
                        <div class="col-12 col-md-6">
                          <div
                            class="btn add-recipe-modal-btn w-100 hvr-grow"
                            onClick={() => {
                              setAddIngredientModalOpen(
                                !addIngredientModalOpen
                              );
                              props.toggleModal();
                            }}
                          >
                            Add Ingredient{" "}
                          </div>
                          <Errors
                            model=".ingredients"
                            messages={{
                              required: "Atleast 1 ingredient required",
                            }}
                            component="div"
                            className="text-danger position-absolute"
                          />
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
                          <Errors
                            model=".prepSteps"
                            messages={{
                              required: "Atleast 1 prep step required",
                            }}
                            component="div"
                            className="text-danger position-absolute"
                          />
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
                              setprepStepsListModalOpen(
                                !prepStepsListModalOpen
                              );
                              props.toggleModal();
                            }}
                          >
                            <div class="btn view-recipe-modal-btn w-100 hvr-grow">
                              Show {recipeFormDetails.prepSteps.length} Prep
                              Step
                              {recipeFormDetails.prepSteps.length > 1
                                ? "s"
                                : ""}
                            </div>
                          </div>
                        )}
                      </div>

                      <div class="form-row mt-5">
                        {console.log(
                          addingNewRecipeLoading,
                          "addingNewRecipeLoadingaddingNewRecipeLoading"
                        )}
                        {addingNewRecipeFailed && (
                          <div className="text-danger mb-2">
                            Recipe with same name already exists in database!
                          </div>
                        )}

                        <div class="col-6">
                          {addingNewRecipeLoading ? (
                            <div>Loading...</div>
                          ) : (
                            <button class="btn grocery-modal-button-1 hvr-grow">
                              SUBMIT
                            </button>
                          )}
                        </div>
                        {addingNewRecipeLoading ? null : (
                          <div class="col-6">
                            <div
                              class="btn grocery-modal-button-2 hvr-grow"
                              onClick={props.toggleModal}
                            >
                              CANCEL
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
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
