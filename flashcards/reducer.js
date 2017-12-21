import {GET_ALL_CARDS, GET_CARD, ADD_CARD, REMOVE_CARD } from "./actions";

const initialState = {};
export default function flashCards (state = initialState, action){
  switch (action.type){
    case GET_ALL_CARDS:
      return {

      };
    default:
      return state;
  }
}