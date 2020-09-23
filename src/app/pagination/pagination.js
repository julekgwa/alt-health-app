/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';

import React from 'react';

import {
  PaginationContainer
} from 'app/pagination/paginationContainer';

import {
  uuid
} from 'app/utils';

export function Pagination({
  itemsPerPage,
  totalItems,
  numberOfPaginates,
  currentPage,
  paginate,
}) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {

    pageNumbers.push(i);

  }

  const createNextPages = () => {

    const pages = [];

    let numberPages = numberOfPaginates;

    let current = currentPage;

    while(numberPages--) {

      current++;
      const next = current;

      if (next > Math.ceil(totalItems / itemsPerPage)) {

        break;

      }

      pages.push(<li key={uuid()} onClick={() => paginate(next)}>
        {current}
      </li>);

    }

    return pages;

  };

  const jumpPages = (multiplier) => {

    return (currentPage + numberOfPaginates) * multiplier;

  };

  const lastPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <PaginationContainer>
      <ul>
        <li onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}>
          &laquo;
        </li>
        {currentPage > 1 && <li onClick={() => paginate(1)}>
          1
        </li>}
        <li className='active'>
          {currentPage}
        </li>
        {createNextPages()}
        {jumpPages(2) < (totalItems / itemsPerPage) && <li onClick={() => paginate(jumpPages(2))}>
          {jumpPages(2)}
        </li>}
        {jumpPages(3) < (totalItems / itemsPerPage) && <li onClick={() => paginate(jumpPages(3))}>
          {jumpPages(3)}
        </li>}
        {jumpPages(4) < (totalItems / itemsPerPage) && <li onClick={() => paginate(jumpPages(4))}>
          {jumpPages(4)}
        </li>}
        {currentPage < lastPage && <li onClick={() => paginate(currentPage + 1)}>
          &raquo;
        </li>}
      </ul>
    </PaginationContainer>
  );

}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  numberOfPaginates: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  numberOfPaginates: 5,
};
