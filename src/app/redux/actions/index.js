import {
  ADD_NEW_CLIENT,
  ADD_NEW_SUPPLEMENT,
  ADD_NEW_SUPPLIER,
  ADD_TO_CART,
  CLEAR_CART,
  CREATE_INVOICE,
  DECREASE_CART_QTY,
  ERROR,
  GET_DATA,
  GET_REFERENCE_INFO,
  GET_SUPPLEMENT_INFO,
  GET_SUPPLIER_INFO,
  IS_DESKTOP_MENU,
  REMOVE_FROM_CART,
  REQUEST_METHOD,
  SET_CLIENT_INFO,
  SET_CLIENT_INVOICE_INFO,
  SET_INVOICE_INFO,
  SET_INVOICE_ITEMS,
  SET_LOADER
  , SHOW_POPUP
  , UPDATE_SLIDER_INDEX
} from 'app/constants';

import {
  fetchItem
} from 'app/redux/actions/utils';

const BASE_URL = process.env.REACT_APP_API_URL;
const GET_CLIENTS = BASE_URL + process.env.REACT_APP_GET_CLIENTS;
const GET_SUPPLIERS = BASE_URL + process.env.REACT_APP_GET_SUPPLIERS;
const GET_SUPPLEMENTS =
  BASE_URL + process.env.REACT_APP_GET_SUPPLEMENTS;
const GET_UNPAID_INVOICES =
  BASE_URL + process.env.REACT_APP_GET_UNPAID_INVOICES;
const GET_BIRTHDAYS = BASE_URL + process.env.REACT_APP_GET_BIRTHDAYS;
const GET_STOCK_LEVELS =
  BASE_URL + process.env.REACT_APP_GET_STOCK_LEVELS;
const GET_TOP_CLIENTS =
  BASE_URL + process.env.REACT_APP_GET_TOP_CLIENTS;
const GET_PURCHASE_STATS =
  BASE_URL + process.env.REACT_APP_GET_PURCHASE_STATS;
const GET_CLIENTS_WITH_INCOMPLETE_DATA =
  BASE_URL + process.env.REACT_APP_GET_CLIENTS_WITH_INCOMPLETE_DATA;
const GET_INVOICES_INFO =
  BASE_URL + process.env.REACT_APP_GET_INVOICES_INFO;
const GET_INVOICE_ITEMS =
  BASE_URL + process.env.REACT_APP_GET_INVOICE_ITEMS;
const POST_CREATE_INVOICE =
  BASE_URL + process.env.REACT_APP_POST_CREATE_INVOICE;
const GET_REFERENCE = BASE_URL + process.env.REACT_APP_GET_REFERENCE;

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

  if (payload === 'supplements') {

    return getSupplementInfo();

  }

  if (payload === 'suppliers') {

    return getSupplierInfo();

  }

  return (dispatch) => {

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

export function addNewSupplier(payload) {

  return (dispatch) => {

    const requestOptions = {
      url: GET_SUPPLIERS,
      method: REQUEST_METHOD.post,
      body: JSON.stringify(payload),
    };

    const action = {
      type: ADD_NEW_SUPPLIER,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function getReference() {

  return (dispatch) => {

    const requestOptions = {
      url: GET_REFERENCE,
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: GET_REFERENCE_INFO,
      loaderType: '',
      error: '',
    };

    return fetchItem(dispatch, requestOptions, false, action);

  };

}

export function addNewSupplement(payload) {

  return (dispatch) => {

    const requestOptions = {
      url: GET_SUPPLEMENTS,
      method: REQUEST_METHOD.post,
      body: JSON.stringify(payload),
    };

    const action = {
      type: ADD_NEW_SUPPLEMENT,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function addNewClient(payload) {

  return (dispatch) => {

    const requestOptions = {
      url: GET_CLIENTS,
      method: REQUEST_METHOD.post,
      body: JSON.stringify(payload),
    };

    const action = {
      type: ADD_NEW_CLIENT,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function getInvoiceInfo() {

  return (dispatch) => {

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

  return (dispatch) => {

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

export function getSupplementInfo() {

  return (dispatch) => {

    const requestOptions = {
      url: GET_SUPPLEMENTS,
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: GET_SUPPLEMENT_INFO,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function getSupplierInfo() {

  return (dispatch) => {

    const requestOptions = {
      url: GET_SUPPLIERS,
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: GET_SUPPLIER_INFO,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function createInvoice(payload) {

  return (dispatch) => {

    const requestOptions = {
      url: POST_CREATE_INVOICE,
      method: REQUEST_METHOD.post,
      body: JSON.stringify(payload),
    };

    const action = {
      type: CREATE_INVOICE,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function clearCart() {

  return {
    type: CLEAR_CART,
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

export function updateCartQty(payload) {

  return {
    type: DECREASE_CART_QTY,
    payload,
  };

}

export function removeFromCart(payload) {

  return {
    type: REMOVE_FROM_CART,
    payload,
  };

}

export function setClientInvoiceInfo(payload) {

  return {
    type: SET_CLIENT_INVOICE_INFO,
    payload,
  };

}
