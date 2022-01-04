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
  updateIngredientsList,
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
  position,
  findCard,
  moveCard,
  setOverIndex,
  overIndex,
  handleDeleteIngredient,
}) => {
  const dispatch = useDispatch();

  const handleEditIngredient = (ing) => {
    toggleModal();
    toggleAddModal();
    dispatch(setIngredientToEdit(ing));
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
      className="row igredients-list-item mt-2"
      ref={(node) => drag(drop(node))}
      style={{
        opacity,
      }}
    >
      <div
        className="col-12"
        onMouseDown={() => console.log("Hi")}
        onMouseUp={() => console.log("Hello")}
      >
        <div className="row">
          <div className="col" onMouseUp={() => console.log("Hello")}>
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
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.recipeForm.ingredients);
  const [cards, setCards] = useState(ingredients);

  const handleDeleteIngredient = (i) => {
    dispatch(deleteRecipeIngredient(i));
    setCards(
      update(cards, {
        $splice: [[i, 1]],
      })
    );
  };

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  const [overIndex, setOverIndex] = useState(null);

  document.body.ondrop = () => {
    setTimeout(() => {
      dispatch(updateIngredientsList(cards));
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
    <div className="container-fluid" ref={drop}>
      {!cards.length && (
        <div className="row">
          <div className="col-12 mt-3">No ingredients in list</div>
        </div>
      )}

      {cards.map((card, i) => {
        return (
          <div>
            <IngredientCard
              key={card.position}
              ing={card}
              i={i}
              position={`${card.position}`}
              toggleModal={props.toggleModal}
              toggleAddModal={props.toggleAddModal}
              moveCard={moveCard}
              findCard={findCard}
              setOverIndex={setOverIndexHandler}
              overIndex={overIndex}
              handleDeleteIngredient={handleDeleteIngredient}
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
    position: 1,
    grocery: { name: "Write a cool JS library" },
  },
  {
    position: 2,
    grocery: { name: "Make it generic enough" },
  },
  {
    position: 3,
    grocery: { name: "Write README" },
  },
  {
    position: 4,
    grocery: { name: "Create some examples" },
  },
  {
    position: 5,
    grocery: { name: "Spam in Twitter and IRC to promote it" },
  },
  {
    position: 6,
    grocery: { name: "???" },
  },
  {
    position: 7,
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
