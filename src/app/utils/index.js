import {
  TECHNICAL_ERROR_MSG
} from 'app/constants';

export const capitalize = (str, lower = false) => str &&
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

  return Object.keys(headersData[0]).map(key => ({
    Header: cleanTableHeader(key),
    accessor: key,
  }));

};

export const cleanErrors =(error) => {

  if (error && typeof error.message === 'string') {

    const message = error.message;

    return message.toLowerCase().includes('unexpected token') || message.toLowerCase().includes('failed to fetch') ? TECHNICAL_ERROR_MSG : message;

  }

  return TECHNICAL_ERROR_MSG;

};

export function handleKeyDown(e, func) {

  if (e.keyCode === 13) {

    typeof func === 'function' && func();

  }

}
