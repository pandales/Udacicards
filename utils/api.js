import { AsyncStorage } from 'react-native';
import { DECK_INDEX, FLASHCARDS_INDEX, createGuid } from "./helpers";


export function getDecks(){

 return AsyncStorage.getItem(DECK_INDEX).then(results => {
    if(!results){
      results = {};
      AsyncStorage.setItem(DECK_INDEX, JSON.stringify(results));
    }
    return JSON.parse(results);
  });
}

export function addDeck (title) {

  const deckToAdd = {
    title,
    cardsCount: 0,
    id: createGuid()
  };

  return getDecks(DECK_INDEX).then(decks => {

    console.log(decks);
    decks[deckToAdd.id] = deckToAdd;
    return decks;
  }).then(decks => {
    return AsyncStorage.setItem(DECK_INDEX, JSON.stringify(decks)).then(() => decks);
  });

}
