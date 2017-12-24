import { GET_ALL_DECKS, ADD_DECK, REMOVE_DECK} from "./actions";

export default function decks (state = [], action){
  switch (action.type){
    case  GET_ALL_DECKS:
      const { decks } = action;
      let newState = [];

      for (let [ key ,deck] of Object.entries(decks)) {
        newState.push(deck);
      }

      return newState;

    case ADD_DECK:
      const { deckInfo } = action;
      deckInfo.isDeleted = false;
      deckInfo.cards = [];

      return {
        ...state,
        ...deckInfo
      };

    case REMOVE_DECK:
      const { deckToRemove } = action;

      return {
        ...state,
        ...deckToRemove,
        isDeleted: true
      };

    default:
      return state;
  }
}