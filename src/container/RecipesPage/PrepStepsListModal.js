import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { Fade } from "react-animation-components";

import { deletePrepStep, setPrepStepToEdit } from "../../redux/ActionCreators";

const PrepStepsListModal = (props) => {
  const dispatch = useDispatch();
  const handleDeletePrepStep = (i) => {
    dispatch(deletePrepStep(i));
  };
  const handleEditPrepStep = (prepStep) => {
    props.toggleModal();
    props.toggleAddModal();
    dispatch(setPrepStepToEdit(prepStep));
  };
  return (
    <div>
      <Modal isOpen={props.modalOpen}>
        <ModalHeader className="lightgreen-bg ">
          <h3>Add New Ingredient</h3>
        </ModalHeader>

        <ModalBody>
          <Fade in>
            <div class="container-fluid">
              {!props.prepSteps.length && (
                <div className="row">
                  <div className="col-12 mt-3">
                    No preparation steps in list
                  </div>
                </div>
              )}
              {props.prepSteps.map((prepStep, i) => {
                return (
                  <div class="row">
                    <div class="col-12 mt-3 igredients-list-item">
                      <div class="row">
                        <div class="col">
                          <i
                            class="fa fa-edit hvr-grow"
                            onClick={() => handleEditPrepStep(prepStep)}
                          ></i>
                          <span class="ml-2">{prepStep.title}</span>
                        </div>
                        <div class="d-flex pr-2">
                          <div class="ml-auto">
                            <span class="edit-ingredient-item">
                              {" "}
                              <i
                                class="fa fa-trash hvr-grow"
                                onClick={() => handleDeletePrepStep(i)}
                              ></i>
                            </span>
                            <span>
                              <i class="fa fa-bars hvr-grow ml-1"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div class="row">
                <button
                  class="btn w-100 mt-4 add-recipe-modal-btn hvr-grow"
                  onClick={() => {
                    props.toggleModal();
                    props.toggleAddModal();
                  }}
                >
                  Add Preparation Step
                </button>
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

export default PrepStepsListModal;
