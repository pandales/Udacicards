import { AsyncStorage } from 'react-native';
import { DECK_INDEX, FLASHCARDS_INDEX } from "./helpers";


export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(DECK_INDEX, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(DECK_INDEX)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_INDEX, JSON.stringify(data))
    })
}

export function updateDeck (key, deck) {
  return AsyncStorage.setItem(key, JSON.stringify(deck))
    .then((result) => {
      console.log(result);
      return AsyncStorage.getItem(key)
    })

}