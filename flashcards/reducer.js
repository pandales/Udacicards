import {GET_ALL_CARDS, ADD_CARD, REMOVE_CARD } from "./actions";

export default function flashCards (state = [], action){
  switch (action.type){
    case  GET_ALL_CARDS:
      const { flashCards } = action;
      let newState = [];

      for (let [ key ,card] of Object.entries(flashCards)) {
        newState.push(card);
      }

      return newState;

    case ADD_CARD:
      const { flashCardInfo } = action;
      flashCardInfo.isDeleted = false;

      return {
        ...state,
        ...flashCardInfo
      };

    case REMOVE_CARD:
      const { cardToRemove } = action;

      return {
        ...state,
        ...cardToRemove,
        isDeleted: true
      };

    default:
      return state;
  }
}