export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase()
  );

export const cleanTableHeader = (header) => {

  if (!header || typeof header !== 'string') {

    return;

  }

  return capitalize(header.replace(/_/g, ' '));

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
