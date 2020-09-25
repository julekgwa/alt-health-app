
import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  ADD_TO_CART,
  CLEAR_CART,
  CREATE_INVOICE,
  ERROR,
  GET_DATA,
  GET_SUPPLEMENT_INFO,
  IS_DESKTOP_MENU,
  SET_CLIENT_INFO,
  SET_CLIENT_INVOICE_INFO,
  SET_INVOICE_INFO,
  SET_INVOICE_ITEMS,
  SET_LOADER,
  SHOW_POPUP
  , UPDATE_SLIDER_INDEX
} from 'app/constants';

import {
  addItemToCart,
  countCartItems,
  createHeaders,
  createNextInvoiceNumber,
  createSelectOptionValues
} from 'app/utils';

const sliderImages = [
  {
    slider1: Medicine2,
    slider2: Medicine3,
  },
  {
    slider1: Medicine1,
    slider2: Medicine4,
  }
];

const initState = {
  isActive: false,
  sliderIndex: 0,
  sliderImages: sliderImages,
  isLoading: false,
  data: [],
  tableHeadersAndAccessors: [],
  showPopup: false,
  cart: [],
  totalItems: 0,
  clientInfo: [],
  invoiceInfo: [],
  invoiceItems: [],
  invoiceClientInfo: {},
  nextInvoiceNumber: '',
  clientInfoOptions: [],
  supplementInfo: [],
  supplementOptions: [],
};

export function rootReducer(state = initState, action) {

  switch (action.type) {

  case IS_DESKTOP_MENU:
    return {
      ...state,
      isActive: !state.isActive,
    };

  case UPDATE_SLIDER_INDEX:
    return {
      ...state,
      sliderIndex: state.sliderIndex === state.sliderImages.length - 1 ? 0 : ++state.sliderIndex,
    };

  case SET_LOADER:
    return {
      ...state,
      isLoading: action.payload,
    };

  case ERROR:
    return {
      ...state,
      showPopup: true,
      isError: action.payload.error,
      message: action.payload.message,
    };

  case SHOW_POPUP:
    return {
      ...state,
      showPopup: action.payload,
    };

  case GET_DATA:

    return {
      ...state,
      data: action.payload || [],
      isError: false,
      tableHeadersAndAccessors: createHeaders(action.payload) || [],
    };

  case GET_SUPPLEMENT_INFO:

    return {
      ...state,
      data: action.payload || [],
      isError: false,
      supplementInfo: action.payload || [],
      supplementOptions: createSelectOptionValues(action.payload, 'Supplement_id'),
      tableHeadersAndAccessors: createHeaders(action.payload) || [],
    };

  case SET_INVOICE_ITEMS:

    return {
      ...state,
      invoiceClientInfo: state.clientInfo.find(item => action.payload[0] && item.Client_id === action.payload[0].Client_id) || {},
      invoiceItems: action.payload,
    };

  case SET_INVOICE_INFO:
    return {
      ...state,
      invoiceInfo: createSelectOptionValues(action.payload, 'Inv_Num'),
      nextInvoiceNumber: (createNextInvoiceNumber(action.payload)),
    };

  case SET_CLIENT_INFO:
    return {
      ...state,
      clientInfo: action.payload,
      clientInfoOptions: createSelectOptionValues(action.payload, 'Client_id'),
    };

  case CLEAR_CART:
    return {
      ...state,
      cart: [],
      totalItems: 0,
    };

  case SET_CLIENT_INVOICE_INFO:
    return {
      ...state,
      invoiceClientInfo: action.payload || {},
    };

  case CREATE_INVOICE:
    return {
      ...state,
      showPopup: true,
      isError: false,
      invoiceItems: [],
      totalItems: 0,
      cart: [],
      supplementInfo: [],
    };

  case ADD_TO_CART:
    // eslint-disable-next-line no-case-declarations
    const cart = addItemToCart(state.cart, action.payload);

    return {
      ...state,
      cart: cart,
      totalItems: countCartItems(cart),
    };

  default:
    return state;

  }

}