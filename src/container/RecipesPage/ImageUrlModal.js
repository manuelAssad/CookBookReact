import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { Fade } from "react-animation-components";

import {} from "../../redux/ActionCreators";

const AddIngredientModal = (props) => {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState("");
  return (
    <div>
      <Modal isOpen={props.modalOpen}>
        <ModalHeader className="lightgreen-bg ">
          <h3>Enter Image Url</h3>
        </ModalHeader>

        <ModalBody>
          <Fade in>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 mt-3">
                  <div className="form-row">
                    <div className="col-12 mt-3">
                      <label for="recipeNote">Image Url:</label>
                      <textarea
                        id="recipeNote"
                        type="text"
                        className="form-control"
                        id="recipeName"
                        onChange={(e) => setImageUrl(e.target.value)}
                        value={imageUrl}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-row mt-5">
                    <div className="col-6">
                      <button
                        className="btn grocery-modal-button-1"
                        onClick={() => {
                          props.setImageUrl(imageUrl);
                          props.toggleModal();
                        }}
                      >
                        ADD IMAGE
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn grocery-modal-button-2"
                        onClick={props.toggleModal}
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
      </Modal>
    </div>
  );
};

export default AddIngredientModal;
