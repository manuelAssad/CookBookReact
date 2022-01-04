import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { Fade } from "react-animation-components";

import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";

import {
  deleteRecipeIngredient,
  setIngredientToEdit,
} from "../../redux/ActionCreators";

const ItemTypes = {
  CARD: "card",
};

const DraggableList = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <IngredientsList
        toggleModal={props.toggleModal}
        toggleAddModal={props.toggleAddModal}
      />
    </DndProvider>
  );
};

const IngredientCard = ({
  toggleModal,
  toggleAddModal,
  ing,
  i,
  id,
  findCard,
  moveCard,
}) => {
  const dispatch = useDispatch();

  const handleDeleteIngredient = (i) => {
    dispatch(deleteRecipeIngredient(i));
  };

  const handleEditIngredient = (ing) => {
    toggleModal();
    toggleAddModal();
    dispatch(setIngredientToEdit(ing));
  };

  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;

        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  return (
    <div
      className="row"
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {console.log("MONITORRRR", isDragging, id)}
      <div className="col-12 mt-3 igredients-list-item">
        <div className="row">
          <div className="col">
            <i
              className="fa fa-edit hvr-grow"
              onClick={() => handleEditIngredient(ing)}
            ></i>
            <span className="ml-2">{ing.grocery.name} -</span>
            <small className="ingredient-list-item-note">{ing.detail}</small>
          </div>
          <div className="d-flex pr-2">
            <div className="ml-auto">
              <span className="edit-ingredient-item">
                {" "}
                <i
                  className="fa fa-trash hvr-grow"
                  onClick={() => handleDeleteIngredient(i)}
                ></i>
              </span>
              <span>
                <i className="fa fa-bars hvr-grow ml-1"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IngredientsList = (props) => {
  const ingredients = useSelector((state) => state.recipeForm.ingredients);

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  const [cards, setCards] = useState(ITEMS);

  const findCard = (id) => {
    const card = cards.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  };

  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      })
    );
  };

  return (
    <div className="container-fluid" ref={drop}>
      {!ingredients.length && (
        <div className="row">
          <div className="col-12 mt-3">No ingredients in list</div>
        </div>
      )}

      {cards.map((card, i) => {
        return (
          <div>
            <IngredientCard
              key={card.id}
              ing={card}
              i={i}
              id={`${card.id}`}
              toggleModal={props.toggleModal}
              toggleAddModal={props.toggleAddModal}
              moveCard={moveCard}
              findCard={findCard}
            />
          </div>
        );
      })}

      <div className="row">
        <button
          className="btn w-100 mt-4 add-recipe-modal-btn"
          onClick={() => {
            props.toggleModal();
            props.toggleAddModal();
          }}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
};
const IngredientsListModal = (props) => {
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

export default IngredientsListModal;

const ITEMS = [
  {
    id: 1,
    grocery: { name: "Write a cool JS library" },
  },
  {
    id: 2,
    grocery: { name: "Make it generic enough" },
  },
  {
    id: 3,
    grocery: { name: "Write README" },
  },
  {
    id: 4,
    grocery: { name: "Create some examples" },
  },
  {
    id: 5,
    grocery: { name: "Spam in Twitter and IRC to promote it" },
  },
  {
    id: 6,
    grocery: { name: "???" },
  },
  {
    id: 7,
    grocery: { name: "PROFIT" },
  },
];

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
