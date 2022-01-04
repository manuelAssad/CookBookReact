import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { Fade } from "react-animation-components";

import { addPrepStep, editPrepStep } from "../../redux/ActionCreators";

import PrepStepsListModal from "./PrepStepsListModal";

const AddPrepStepModal = (props) => {
  const dispatch = useDispatch();
  const recipeFormDetails = useSelector((state) => state.recipeForm);

  const [missingFieldMessage, setMissingFieldMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddOrEditPrepStep = () => {
    if (!title) setMissingFieldMessage("Enter Preparation Step Title");
    else if (!description)
      setMissingFieldMessage("Enter Preparation Step Description");
    else {
      if (recipeFormDetails.prepStepToEdit.title)
        dispatch(
          editPrepStep(
            title,
            description,
            recipeFormDetails.prepStepToEdit.position
          )
        );
      else dispatch(addPrepStep({ title, description }));
      props.setprepStepsListModalOpen(!props.prepStepsListModalOpen);
      props.toggleModal();
    }
  };

  useEffect(() => {
    setMissingFieldMessage("");
    if (recipeFormDetails.prepStepToEdit.title) {
      setTitle(recipeFormDetails.prepStepToEdit.title);
      setDescription(recipeFormDetails.prepStepToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [recipeFormDetails]);

  return (
    <div>
      <PrepStepsListModal
        modalOpen={props.prepStepsListModalOpen}
        toggleModal={() =>
          props.setprepStepsListModalOpen(!props.prepStepsListModalOpen)
        }
        toggleAddModal={props.toggleModal}
        toggleEditModal={props.toggleEditModal}
        prepSteps={recipeFormDetails.prepSteps}
      />
      <Modal isOpen={props.modalOpen}>
        <ModalHeader className="lightgreen-bg ">
          <h3>
            {" "}
            {recipeFormDetails.prepStepToEdit.title
              ? "Edit Prep Step"
              : "Add New Prep Step"}
          </h3>
        </ModalHeader>

        <ModalBody>
          <Fade in>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 mt-3">
                  <div className="form-row">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        id="stepTitle"
                        placeholder="Step Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <label for="stepDescription">Step Description:</label>
                      <textarea
                        id="stepDescription"
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    {missingFieldMessage && (
                      <div className="col-12 mt-3" style={{ color: "red" }}>
                        - {missingFieldMessage}
                      </div>
                    )}
                  </div>

                  <div className="form-row mt-5">
                    <div className="col-6">
                      <button
                        className="btn grocery-modal-button-1"
                        onClick={handleAddOrEditPrepStep}
                      >
                        {recipeFormDetails.prepStepToEdit.title
                          ? "EDIT PREP STEP"
                          : "ADD PREP STEP"}
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn grocery-modal-button-2"
                        onClick={() => {
                          props.toggleModal();
                          if (recipeFormDetails.prepStepToEdit.title)
                            props.setprepStepsListModalOpen(true);
                          else props.toggleEditModal();
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

export default AddPrepStepModal;
