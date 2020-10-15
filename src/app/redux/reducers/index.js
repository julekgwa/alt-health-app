import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  ADD_NEW_CLIENT,
  ADD_NEW_SUPPLEMENT,
  ADD_NEW_SUPPLIER,
  ADD_TO_CART,
  CLEAR_CART,
  CREATE_INVOICE,
  DECREASE_CART_QTY,
  ERROR,
  GET_BACKUPS,
  GET_DATA,
  GET_REFERENCE_INFO,
  GET_SUPPLEMENT_INFO,
  GET_SUPPLIER_INFO,
  IS_DESKTOP_MENU,
  REMOVE_FROM_CART,
  RESTORE_DB,
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
  createSelectOptionValues,
  nextSupplementId,
  removeFromCart,
  removeItem
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
  supplierInfo: [],
  supplierOptions: [],
  referenceOptions: [],
  supplementOptions: [],
  nextSupplementId: '',
  supplementHeaders: [],
  clientHeaders: [],
  supplierHeaders: [],
  backups: [],
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
      sliderIndex:
          state.sliderIndex === state.sliderImages.length - 1
            ? 0
            : ++state.sliderIndex,
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

  case GET_SUPPLIER_INFO:
    return {
      ...state,
      data: action.payload || [],
      isError: false,
      supplierHeaders: createHeaders(action.payload) || [],
      supplierInfo: action.payload || [],
      supplierOptions: createSelectOptionValues(
        action.payload,
        'Supplier_ID'
      ),
    };

  case GET_REFERENCE_INFO:
    return {
      ...state,
      referenceOptions: createSelectOptionValues(
        action.payload,
        'Reference_ID',
        'Description'
      ),
    };

  case ADD_NEW_CLIENT:
    return {
      ...state,
      showPopup: true,
      message: 'You\'ve successfully added a new client',
      clientInfo: action.payload,
      clientInfoOptions: createSelectOptionValues(
        action.payload,
        'Client_id'
      ),
      data: action.payload || [],
      isError: false,
      clientHeaders: createHeaders(action.payload) || [],
    };

  case ADD_NEW_SUPPLEMENT:
    return {
      ...state,
      showPopup: true,
      message: 'You\'ve successfully added a new supplement',
      data: action.payload || [],
      isError: false,
      supplementInfo: action.payload || [],
      supplementOptions: createSelectOptionValues(
        action.payload,
        'Supplement_id'
      ),
      supplementHeaders: createHeaders(action.payload) || [],
      nextSupplementId: nextSupplementId(action.payload),
    };

  case ADD_NEW_SUPPLIER:
    return {
      ...state,
      showPopup: true,
      message: 'You\'ve successfully added a new supplier',
      data: action.payload || [],
      isError: false,
      supplierHeaders: createHeaders(action.payload) || [],
      supplierInfo: action.payload || [],
      supplierOptions: createSelectOptionValues(
        action.payload,
        'Supplier_ID'
      ),
    };

  case GET_SUPPLEMENT_INFO:
    return {
      ...state,
      isError: false,
      supplementInfo: action.payload || [],
      supplementOptions: createSelectOptionValues(
        action.payload,
        'Supplement_id'
      ),
      supplementHeaders: createHeaders(action.payload) || [],
      nextSupplementId: nextSupplementId(action.payload),
    };

  case SET_INVOICE_ITEMS:
    return {
      ...state,
      invoiceClientInfo:
          state.clientInfo.find(
            (item) =>
              action.payload[0] &&
              item.Client_id === action.payload[0].Client_id
          ) || {},
      invoiceItems: action.payload,
    };

  case SET_INVOICE_INFO:
    return {
      ...state,
      invoiceInfo: createSelectOptionValues(
        action.payload,
        'Inv_Num'
      ),
      nextInvoiceNumber: createNextInvoiceNumber(action.payload),
    };

  case SET_CLIENT_INFO:
    return {
      ...state,
      clientInfo: action.payload,
      clientInfoOptions: createSelectOptionValues(
        action.payload,
        'Client_id'
      ),
      clientHeaders: createHeaders(action.payload) || [],
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

  case DECREASE_CART_QTY:
    // eslint-disable-next-line no-case-declarations
    const cartRemove = removeItem(state.cart, action.payload);

    return {
      ...state,
      cart: cartRemove,
      totalItems: countCartItems(cartRemove),
    };

  case REMOVE_FROM_CART:
    // eslint-disable-next-line no-case-declarations
    const items = removeFromCart(state.cart, action.payload);

    return {
      ...state,
      cart: items,
      totalItems: countCartItems(items),
    };

  case GET_BACKUPS:
    return {
      ...state,
      backups: createSelectOptionValues(
        action.payload,
        'commit',
        'date'
      ),
    };

  case RESTORE_DB:
    return {
      ...state,
      showPopup: true,
      message: 'You\'ve successfully restored database',
      isError: false,
    };

  default:
    return state;

  }

}
