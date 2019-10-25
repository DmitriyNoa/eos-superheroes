import * as types from '../constants/actionTypes';

// example of a thunk using the redux-thunk middleware

export function loadSuperheroesSuccess(superheroes) {
  return {
    type: types.LOAD_SUPERHEROES_SUCCESS,
    superheroes: superheroes.rows
  }
}

export function loadSuperheroes() {
  return async function  (dispatch) {
    const requestdata = {
      'json': true,
      'code': 'superheroes1',
      'scope': 'superheroes1',
      'table': 'heroes'
    };
    const superheroesRPC = await fetch(`${process.env.EOSEdnpoint}/v1/chain/get_table_rows`, {
      method: 'POST',
      body: JSON.stringify(requestdata)
    });

    const superheroes = await superheroesRPC.json();
    console.log(superheroes);
    return dispatch(loadSuperheroesSuccess(superheroes));
  };
}

export function loadSuperhero(id) {
  return async function  (dispatch) {
    const requestdata = {
      'json': true,
      'code': 'superheroes1',
      'scope': 'superheroes1',
      'table': 'heroes',
      'lower_bound': id,
      'upper_bound': id
    };
    const superheroesRPC = await fetch(`${process.env.EOSEdnpoint}/v1/chain/get_table_rows`, {
      method: 'POST',
      body: JSON.stringify(requestdata)
    });

    const superhero = await superheroesRPC.json();

    return dispatch({
      type: types.LOAD_SUPERHERO_SUCCESS,
      superhero: superhero.rows[0]
    });
  };
}
