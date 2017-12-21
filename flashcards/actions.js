export const GET_ALL_CARDS = 'GET_ALL_CARDS';
export const GET_CARD = 'GET_CARD';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export function getAllCards (cards) {
  return {
    type: GET_ALL_Cards,
    cards
  }
}

export function getCard (cardID) {
  return {
    type: GET_CARD,
    cardID
  }
}

export function addCard (cardInfo) {
  return {
    type: ADD_CARD,
    cardInfo,
  }
}

export function removeCard(cardToRemove) {
  return {
    type: REMOVE_CARD,
    cardToRemove
  }
}