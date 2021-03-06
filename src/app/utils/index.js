import {
  TECHNICAL_ERROR_MSG
} from 'app/constants';

export const capitalize = (str, lower = false) =>
  str &&
  (lower ? str.toLowerCase() : str).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase()
  );

export const cleanTableHeader = (header, searchValue = '_') => {

  if (!header || typeof header !== 'string') {

    return;

  }

  const re = new RegExp(searchValue, 'g');

  return capitalize(header.replace(re, ' '));

};

export const createHeaders = (headersData) => {

  if (
    !Array.isArray(headersData) ||
    (Array.isArray(headersData) && headersData.length <= 0)
  ) {

    return;

  }

  return Object.keys(headersData[0]).map((key) => ({
    Header: cleanTableHeader(key),
    accessor: key,
  }));

};

export const cleanErrors = (error) => {

  if (error && typeof error.message === 'string') {

    const message = error.message;

    return message.toLowerCase().includes('unexpected token') ||
      message.toLowerCase().includes('failed to fetch')
      ? TECHNICAL_ERROR_MSG
      : message;

  }

  return TECHNICAL_ERROR_MSG;

};

export function handleKeyDown(e, func) {

  if (e.keyCode === 13) {

    typeof func === 'function' && func();

  }

}

export function uuid() {

  let chars = '0123456789abcdef'.split('');

  let uuid = [],
    rnd = Math.random,
    r;

  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  uuid[14] = '4'; // version 4

  for (let i = 0; i < 36; i++) {

    if (!uuid[i]) {

      r = 0 | (rnd() * 16);

      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r & 0xf];

    }

  }

  return uuid.join('');

}

export function createSelectOptionValues(invoiceData, key, label) {

  if (!invoiceData) {

    return [];

  }

  return invoiceData.map(invoice => ({
    value: invoice[key],
    label: invoice[label] || invoice[key],
  }));

}

export function calculateVAT(totalPrice) {

  let price = totalPrice;

  if (typeof totalPrice === 'string') {

    price = parseFloat(totalPrice).toFixed(2);

  }

  const VAT = Number(process.env.REACT_APP_GET_VAT);
  const multiplier = VAT / 100 + 1;

  return `${(price * multiplier).toFixed(2)}`;

}

export function countCartItems(cartItems) {

  return Object.values(cartItems).reduce((t, { Item_quantity, }) => t + Item_quantity, 0);

}

export const convertTotalToCurrency = (items) => {

  return items.map(item => {

    item.price = parseFloat(item.Cost_excl).toFixed(2);
    item.total = item.Item_quantity * item.price;

    return item;

  });

};

export function calculateCartTotal(cartItems, incVat = false) {

  const items = convertTotalToCurrency(cartItems);
  const total = Object.values(items).reduce((t, { total, }) => t + total, 0);

  if (!incVat) {

    return total.toFixed(2);

  }
  const VAT = Number(process.env.REACT_APP_GET_VAT);
  const multiplier = VAT / 100 + 1;

  return (total * multiplier).toFixed(2);

}

export function addItemToCart(cart, cartItem) {

  const addItem = cart.find(
    (item) => item.Supplement_id === cartItem.Supplement_id
  );

  if (addItem) {

    addItem.Item_quantity += 1;

    return [...cart];

  }

  cartItem.Item_quantity = cartItem.Item_quantity || 1;

  return [...cart, cartItem];

}

export function removeItem(cart, cartItem) {

  const addItem = cart.find(
    (item) => item.Supplement_id === cartItem.Supplement_id
  );

  if (cartItem.Item_quantity === 1) {

    return [...cart];

  }

  if (addItem) {

    addItem.Item_quantity -= 1;

    return [...cart];

  }

  cartItem.Item_quantity = cartItem.Item_quantity || 1;

  return [...cart, cartItem];

}

export function removeFromCart(cart, cartItem) {

  return cart.filter(
    (item) => item.Supplement_id !== cartItem.Supplement_id
  );

}

export function getLeadingZeros(str) {

  let zeros = 0;

  for (let i = 0; i < str.length; i++) {

    if (str[i] === '0') {

      zeros++;
      continue;

    }

    break;

  }

  return zeros;

}

export function createNextInvoiceNumber(invoiceData) {

  const invoiceNumbers = invoiceData.map(invoice => ({
    zeros: getLeadingZeros(invoice.Inv_Num.substring(3)),
    number: Number(invoice.Inv_Num.substring(3)) || 0,
  }));

  const maxInv = Math.max.apply(Math, invoiceNumbers.map(function(o) {

    return o.number;

  }));

  const obj = invoiceNumbers.find(inv => inv.number === maxInv);

  const nextInvoice = (obj.number + 1).toString();

  return 'INV' + nextInvoice.padStart(nextInvoice.length + obj.zeros, 0);

}

export function nextSupplementId(currentSupplements) {

  const supplements = currentSupplements.map(supplement => ({
    number: Number(supplement.Supplement_id.substring(11)) || 0,
  }));

  const maxSupplement = Math.max.apply(Math, supplements.map(function(o) {

    return o.number;

  }));

  return `Supplement-${maxSupplement + 1}`;

}

export function convertDate(inputFormat) {

  if (Date.parse(inputFormat) < 0) {

    return '00-00-0000';

  }

  function pad(s) {

    return (s < 10) ? '0' + s : s;

  }
  const d = new Date(inputFormat);

  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-');

}

export function getCurrentDate() {

  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('-');

}

export function validateEmail(email) {

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());

}

export function maskPhoneNumber(number) {

  const x = number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

  return !x[2] ? x[1] : `(${x[1]})-(${x[2]})` + (x[3] ? '-(' + x[3] + ')' : '');

}

export function validateZARID(id) {

  if (!id || typeof id !== 'string') {

    return;

  }

  id = id.split('');

  const validationCheck = [];

  let sum = 0;

  for (let i = 0; i < id.length; i++) {

    // double every second digit.
    if (i % 2 === 1) {

      const multiplyNumber = Number(id[i]) * 2;

      // check for double numbers
      if (multiplyNumber && multiplyNumber.toString().length > 1) {

        const [n1, n2] = multiplyNumber.toString().split('');
        const singleDigit = Number(n1) + Number(n2);

        validationCheck.push(singleDigit);

        continue;

      }

      validationCheck.push(multiplyNumber);

      continue;

    }

    validationCheck.push(Number(id[i]));

  }

  for (let i = 0; i < validationCheck.length; i++) {

    sum += validationCheck[i];

  }

  return sum === 0 ? false : !(sum % 10);

}