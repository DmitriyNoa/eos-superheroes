import {LOAD_SUPERHEROES_SUCCESS} from "../constants/actionTypes";
import initialState from "./initialState";

export function superheroesReducer(state = initialState.superheroes, action) {
  switch (action.type) {
    case LOAD_SUPERHEROES_SUCCESS:
      return action.superheroes;
    default:
      return state;
  }
}
