import * as api from '../utils/api';

export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const GET_DECK = 'GET_DECK';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

export function getAllDecks (decks) {

  return {
    type: GET_ALL_DECKS,
    decks
  }
}

export function getDeck (deckID) {
  return {
    type: GET_DECK,
    deckID
  }
}


export function removeDeck(deckToRemove) {
  return {
    type: REMOVE_DECK,
    deckToRemove
  }
}

export function loadDecks(dispatch) {
  return api.getDecks().then((decks) => dispatch(getAllDecks(decks)));
}