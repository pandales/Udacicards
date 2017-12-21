import { GET_ALL_DECKS, GET_DECK, ADD_DECK, REMOVE_DECK} from "./actions";

let id = 0;
const initialState = [
  {
    id: id++,
    name: 'udaciCards',
    cardsCount: 3
  },
  {
    id: id++,
    name: 'English words',
    cardsCount: 50
  },
  {
    id: id++,
    name: 'Trivia',
    cardsCount: 7
  },
  {
    id: id++,
    name: 'New deck',
    cardsCount: 5
  },
  {
    id: id++,
    name: 'New deck 2',
    cardsCount: 9
  },
  {
    id: id++,
    name: 'New deck 3',
    cardsCount: 3
  },
 {
    id: id++,
    name: 'New deck 4',
    cardsCount: 2
  },
  {
    id: id++,
    name: 'New deck 5',
    cardsCount: 89
  },
  {
    id: id++,
    name: 'New deck 6',
    cardsCount: 6
  },
  {
    id: id++,
    name: 'New deck 7',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 8',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 9',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 10',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 11',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 12',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 13',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 14',
    cardsCount: 0
  },
  {
    id: id++,
    name: 'New deck 15',
    cardsCount: 0
  }
];

export default function decks (state = initialState, action){
  switch (action.type){
    case  GET_ALL_DECKS:

      const { decks } = action;
      return {
        ...state,
        ...decks
      };
    /*case GET_DECK:

      const { deckID } = action;

      return {
        ...state
      };*/
    case ADD_DECK:
      const { deckInfo } = action;
      deckInfo.isDeleted = false;

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