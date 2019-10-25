import * as types from '../constants/actionTypes';
import {Api, JsonRpc} from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';

const defaultPrivateKey = process.env.defaultPrivateKey;
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc(process.env.EOSEdnpoint, {fetch});
const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});

export function loadSuperheroes() {
  return async function  (dispatch) {

    const requestdata = {
      'json': true,
      'code': 'superheroes1',
      'scope': 'superheroes1',
      'table': 'heroes'
    };

    const superheroes = await rpc.get_table_rows(requestdata);

    return dispatch({
      type: types.LOAD_SUPERHEROES_SUCCESS,
      superheroes
    });
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

export function addSuperhero(superhero) {
  const {superhero_name, avatar, category, description} = superhero;
  return async function  (dispatch) {

    const superheroTransaction  = await api.transact({
      actions: [{
        account: 'superheroes',
        name: 'addhero',
        authorization: [{
          actor: 'superheroes',
          permission: 'active',
        }],
        data: {
          superhero_name,
          avatar,
          category,
          description
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });


    console.log(superheroTransaction);

    return dispatch({
      type: types.ADD_SUPERHERO_SUCCESS,
      superheroTransaction
    });
  };
}
