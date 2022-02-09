import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { Fade } from "react-animation-components";

import {
  postRecipeIngredient,
  editIngredient,
} from "../../redux/ActionCreators";

import IngredientsListModal from "./IngredientsListModal";

import SearchBar from "../../components/SearchBar";

const AddIngredientModal = (props) => {
  const recipeFormDetails = useSelector((state) => state.recipeForm);

  useEffect(() => {
    setNoIngredientSelected(false);
    if (recipeFormDetails.ingredientToEdit.grocery) {
      setNewIngredientSelected(recipeFormDetails.ingredientToEdit.grocery);
      setNewIngredientNote(recipeFormDetails.ingredientToEdit.detail);
    } else {
      setNewIngredientSelected({});
      setNewIngredientNote("");
    }
  }, [recipeFormDetails]);
  const dispatch = useDispatch();

  const [newIngredientSelected, setNewIngredientSelected] = useState({});
  const [newIngredientNote, setNewIngredientNote] = useState("");
  const [noIngredientSelected, setNoIngredientSelected] = useState(false);

  const handleAddOrEditIngredient = () => {
    if (!newIngredientSelected.name) setNoIngredientSelected(true);
    else {
      if (recipeFormDetails.ingredientToEdit.grocery) {
        dispatch(
          editIngredient(
            newIngredientSelected,
            newIngredientNote,
            recipeFormDetails.ingredientToEdit.position
          )
        );
      } else {
        dispatch(
          postRecipeIngredient(
            newIngredientSelected,
            newIngredientNote,
            recipeFormDetails.ingredients.length,
            null
          )
        );
        props.setErrors("string");
      }

      props.setIngredientsListModalOpen(!props.ingredientsListModalOpen);
      props.toggleModal();
    }
  };

  const setNewGroceryIngredientSelected = (g) => {
    setNewIngredientSelected(g);
  };

  const setNewIngredientNoteSelected = (v) => {
    setNewIngredientNote(v);
  };

  const removeNewGroceryIngredientSelected = () => {
    setNewIngredientSelected({});
  };

  return (
    <div>
      <IngredientsListModal
        modalOpen={props.ingredientsListModalOpen}
        toggleModal={() =>
          props.setIngredientsListModalOpen(!props.ingredientsListModalOpen)
        }
        toggleAddModal={props.toggleModal}
        toggleEditModal={props.toggleEditModal}
        setErrors={props.setErrors}
      />
      <Modal isOpen={props.modalOpen}>
        <ModalHeader className="lightgreen-bg ">
          <h3>
            {recipeFormDetails.ingredientToEdit.grocery
              ? "Edit Ingredient"
              : "Add New Ingredient"}
          </h3>
        </ModalHeader>

        <ModalBody>
          <Fade in>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 mt-3">
                  <div className="form-row">
                    <div className="col-12">
                      <SearchBar
                        recipeEditMode={true}
                        setNewGroceryIngredientSelected={
                          setNewGroceryIngredientSelected
                        }
                        newIngredientSelected={newIngredientSelected}
                        removeNewGroceryIngredientSelected={
                          removeNewGroceryIngredientSelected
                        }
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <label for="recipeNote">
                        Note (quantity, description):
                      </label>
                      <textarea
                        id="recipeNote"
                        type="text"
                        className="form-control"
                        id="recipeName"
                        value={newIngredientNote}
                        onChange={(e) =>
                          setNewIngredientNoteSelected(e.target.value)
                        }
                      ></textarea>
                    </div>
                    {noIngredientSelected && (
                      <div className="col-12 mt-3" style={{ color: "red" }}>
                        - No ingredient selected
                      </div>
                    )}
                  </div>

                  <div className="form-row mt-5">
                    <div className="col-6">
                      <button
                        className="btn grocery-modal-button-1"
                        onClick={handleAddOrEditIngredient}
                      >
                        {recipeFormDetails.ingredientToEdit.grocery
                          ? "EDIT INGREDIENT"
                          : "ADD INGREDIENT"}
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn grocery-modal-button-2"
                        onClick={() => {
                          props.toggleModal();
                          if (recipeFormDetails.ingredientToEdit.grocery)
                            props.setIngredientsListModalOpen(true);
                          else {
                            props.toggleEditModal();
                            props.setErrors(recipeFormDetails.ingredients);
                          }
                        }}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              props.toggleModal();
              props.toggleEditModal();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddIngredientModal;
