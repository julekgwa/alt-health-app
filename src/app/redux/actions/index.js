import {
  ERROR,
  GET_DATA,
  IS_DESKTOP_MENU,
  REQUEST_METHOD,
  SET_LOADER,
  UPDATE_SLIDER_INDEX
} from 'app/constants';

import {
  fetchItem
} from './utils';

const BASE_URL = process.env.REACT_APP_API_URL;
const GET_CLIENTS = BASE_URL + process.env.REACT_APP_GET_CLIENTS;
const GET_SUPPLIERS = BASE_URL + process.env.REACT_APP_GET_SUPPLIERS;
const GET_SUPPLEMENTS = process.env.REACT_APP_GET_SUPPLEMENTS;
// const GET_UNPAID_INVOICES = process.env.REACT_APP_GET_UNPAID_INVOICES;
// const GET_BIRTHDAYS = process.env.REACT_APP_GET_BIRTHDAYS;
// const GET_STOCK_LEVELS = process.env.REACT_APP_GET_STOCK_LEVELS;
// const GET_TOP_CLIENTS = process.env.REACT_APP_GET_TOP_CLIENTS;
// const GET_PURCHASE_STATS = process.env.REACT_APP_GET_PURCHASE_STATS;
// const GET_CLIENTS_WITH_INCOMPLETE_DATA = process.env.REACT_APP_GET_CLIENTS_WITH_INCOMPLETE_DATA;

const infoUrls = {
  clients: GET_CLIENTS,
  suppliers: GET_SUPPLIERS,
  supplements: GET_SUPPLEMENTS,
};

export function setIsActive() {

  return {
    type: IS_DESKTOP_MENU,
  };

}

export function updateSliderIndex() {

  return {
    type: UPDATE_SLIDER_INDEX,
  };

}

export function setError(type, payload) {

  return {
    type,
    payload,
  };

}

export function getInfo(payload) {

  return dispatch => {

    const requestOptions = {
      url: infoUrls[payload],
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: GET_DATA,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}
