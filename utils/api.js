import { AsyncStorage } from 'react-native';
import { DECK_INDEX, FLASHCARDS_INDEX, createGuid } from "./helpers";

export function resetStorage(){
  return AsyncStorage.removeItem(DECK_INDEX);
}
export function getDecks(){

 return AsyncStorage.getItem(DECK_INDEX).then(results => {
    if(!results){
      results = [];
      return AsyncStorage.setItem(DECK_INDEX, JSON.stringify({}))
        .then(() => results);
    }else{
      return JSON.parse(results);
    }
  });
}

export function addDeck (title) {

  const deckToAdd = {
    title,
    cardsCount: 0,
    id: createGuid(),
    cards: []
  };

  return getDecks(DECK_INDEX).then(decks => {

    decks[deckToAdd.id] = deckToAdd;
    return decks;
  }).then(decks => {
    return AsyncStorage.setItem(DECK_INDEX, JSON.stringify(decks)).then(() => decks);
  });
}

export function addCard (updatedDeck) {


  return getDecks(DECK_INDEX).then(decks => {
    decks[updatedDeck.id] = updatedDeck;

    return decks;
  }).then(decks => {
    return AsyncStorage.setItem(DECK_INDEX, JSON.stringify(decks)).then(() => decks);
  });
}
