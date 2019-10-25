import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import {superheroesReducer} from "./superheroesRPCReducer";

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  superheroes: superheroesReducer
});

export default rootReducer;
