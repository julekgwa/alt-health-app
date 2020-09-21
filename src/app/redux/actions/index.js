import {
  ADD_TO_CART,
  ERROR,
  GET_DATA,
  IS_DESKTOP_MENU,
  REQUEST_METHOD,
  SET_CLIENT_INFO,
  SET_INVOICE_INFO,
  SET_INVOICE_ITEMS,
  SET_LOADER,
  SHOW_POPUP,
  UPDATE_SLIDER_INDEX
} from 'app/constants';

import {
  fetchItem
} from './utils';

const BASE_URL = process.env.REACT_APP_API_URL;
const GET_CLIENTS = BASE_URL + process.env.REACT_APP_GET_CLIENTS;
const GET_SUPPLIERS = BASE_URL + process.env.REACT_APP_GET_SUPPLIERS;
const GET_SUPPLEMENTS = BASE_URL + process.env.REACT_APP_GET_SUPPLEMENTS;
const GET_UNPAID_INVOICES = BASE_URL + process.env.REACT_APP_GET_UNPAID_INVOICES;
const GET_BIRTHDAYS = BASE_URL + process.env.REACT_APP_GET_BIRTHDAYS;
const GET_STOCK_LEVELS = BASE_URL + process.env.REACT_APP_GET_STOCK_LEVELS;
const GET_TOP_CLIENTS = BASE_URL + process.env.REACT_APP_GET_TOP_CLIENTS;
const GET_PURCHASE_STATS = BASE_URL + process.env.REACT_APP_GET_PURCHASE_STATS;
const GET_CLIENTS_WITH_INCOMPLETE_DATA = BASE_URL + process.env.REACT_APP_GET_CLIENTS_WITH_INCOMPLETE_DATA;
const GET_INVOICES_INFO = BASE_URL + process.env.REACT_APP_GET_INVOICES_INFO;
const GET_INVOICE_ITEMS = BASE_URL + process.env.REACT_APP_GET_INVOICE_ITEMS;

const infoUrls = {
  clients: GET_CLIENTS,
  suppliers: GET_SUPPLIERS,
  supplements: GET_SUPPLEMENTS,
  birthdays: GET_BIRTHDAYS,
  'unpaid-invoices': GET_UNPAID_INVOICES,
  'stock-levels': GET_STOCK_LEVELS,
  'top-clients': GET_TOP_CLIENTS,
  'purchase-stats': GET_PURCHASE_STATS,
  'incomplete-client-info': GET_CLIENTS_WITH_INCOMPLETE_DATA,
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
      isClientInfo: payload === 'clients',
    };

    const action = {
      type: GET_DATA,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function getInvoiceInfo() {

  return dispatch => {

    const requestOptions = {
      url: GET_INVOICES_INFO,
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: SET_INVOICE_INFO,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function getInvoiceItems(invoiceNumber) {

  return dispatch => {

    const requestOptions = {
      url: GET_INVOICE_ITEMS + invoiceNumber,
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: SET_INVOICE_ITEMS,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function showPopup(payload) {

  return {
    type: SHOW_POPUP,
    payload,
  };

}

export function setClientInfo(payload) {

  return {
    type: SET_CLIENT_INFO,
    payload,
  };

}

export function addToCart(payload) {

  return {
    type: ADD_TO_CART,
    payload,
  };

}
