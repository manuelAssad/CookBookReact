import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { Fade } from "react-animation-components";

import {
  deletePrepStep,
  setPrepStepToEdit,
  updatePrepStepsList,
} from "../../redux/ActionCreators";

import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";

const ItemTypes = {
  CARD: "card",
};

const DraggableList = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <PrepStepsList
        toggleModal={props.toggleModal}
        toggleAddModal={props.toggleAddModal}
        prepSteps={props.prepSteps}
        setErrors={props.setErrors}
      />
    </DndProvider>
  );
};

const PrepStepCard = ({
  toggleModal,
  toggleAddModal,
  prepStep,
  i,
  position,
  findCard,
  moveCard,
  setOverIndex,
  overIndex,
  handleDeletePrepStep,
}) => {
  const dispatch = useDispatch();

  const handleEditPrepStep = (ing) => {
    toggleModal();
    toggleAddModal();
    dispatch(setPrepStepToEdit(ing));
  };

  const originalIndex = findCard(position).index;

  const [{ isDragging, end }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { position, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { position: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
          setOverIndex(null);
        } else {
          setOverIndex(null);
        }
      },
    }),
    [position, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ position: draggedId }) {
        if (draggedId !== position) {
          const { index: overIndex } = findCard(position);
          moveCard(draggedId, overIndex);
          setOverIndex(overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging || overIndex == i ? 0 : 1;

  return (
    <div
      class="row mt-2 igredients-list-item"
      ref={(node) => drag(drop(node))}
      style={{
        opacity,
      }}
    >
      <div class="col-12 ">
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
};

const PrepStepsList = (props) => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState(props.prepSteps);

  const handleDeletePrepStep = (i) => {
    dispatch(deletePrepStep(i));
    const newCards = update(cards, {
      $splice: [[i, 1]],
    });
    setCards(newCards);
    props.setErrors(newCards);
  };

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  const [overIndex, setOverIndex] = useState(null);

  document.body.ondrop = () => {
    setTimeout(() => {
      dispatch(updatePrepStepsList(cards));
    }, 400);
  };

  const findCard = (position) => {
    const card = cards.filter((c) => `${c.position}` === position)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  };

  const moveCard = (position, atIndex) => {
    const { card, index } = findCard(position);

    const newCardsArray = update(cards, {
      $splice: [
        [index, 1],
        [atIndex, 0, card],
      ],
    });
    setCards(newCardsArray);
  };
  const setOverIndexHandler = (index) => {
    setOverIndex(index);
  };

  return (
    <div class="container-fluid" ref={drop}>
      {!cards.length && (
        <div className="row">
          <div className="col-12 mt-3">No preparation steps in list</div>
        </div>
      )}
      {cards.map((card, i) => {
        return (
          <PrepStepCard
            key={card.position}
            prepStep={card}
            i={i}
            position={`${card.position}`}
            toggleModal={props.toggleModal}
            toggleAddModal={props.toggleAddModal}
            moveCard={moveCard}
            findCard={findCard}
            setOverIndex={setOverIndexHandler}
            overIndex={overIndex}
            handleDeletePrepStep={handleDeletePrepStep}
          />
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
  );
};

const PrepStepsListModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.modalOpen}>
        <ModalHeader className="lightgreen-bg ">
          <h3>Add New Ingredient</h3>
        </ModalHeader>

        <ModalBody>
          <Fade in>
            <DraggableList
              toggleModal={props.toggleModal}
              toggleAddModal={props.toggleAddModal}
              prepSteps={props.prepSteps}
              setErrors={props.setErrors}
            />
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
