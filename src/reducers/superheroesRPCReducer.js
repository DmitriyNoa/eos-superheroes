import {LOAD_SUPERHEROES_SUCCESS, LOAD_SUPERHERO_SUCCESS} from "../constants/actionTypes";
import initialState from "./initialState";

export function superheroesReducer(state = [], action) {
  switch (action.type) {
    case LOAD_SUPERHEROES_SUCCESS:
      return action.superheroes;
    case LOAD_SUPERHERO_SUCCESS:
      return {
        superheroes: [...state],
        superhero: action.superhero
      };
    default:
      return state;
  }
}
