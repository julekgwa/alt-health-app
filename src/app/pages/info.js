import PropTypes from 'prop-types';

import React,
{
  useEffect
} from 'react';

import Loader from 'react-loader-spinner';

import {
  connect
} from 'react-redux';

import {
  useParams
} from 'react-router-dom';

import {
  usePagination,
  useTable
} from 'react-table';

import {
  Animated
} from 'app/components/containers/animated';

import {
  Container
} from 'app/components/containers/container';

import {
  Popup
} from 'app/components/popup/popup';

import {
  getInfo,
  showPopup
} from 'app/redux/actions';

import {
  Colors
} from 'app/styles/colors';

import {
  capitalize
} from 'app/utils';

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  data: state.data,
  isError: state.isError,
  message: state.message,
  tableHeadersAndAccessors: state.tableHeadersAndAccessors,
  showPopup: state.showPopup,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: (payload) => dispatch(getInfo(payload)),
  displayPopup: (payload) => dispatch(showPopup(payload)),
});

function InfoPage({
  isLoading,
  getInfo,
  tableHeadersAndAccessors,
  data,
  isError,
  message,
  showPopup,
  displayPopup,
  pageSize = 10,
}) {

  const { info, } = useParams();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = useTable(
    {
      columns: tableHeadersAndAccessors,
      data,
      initialState: {
        pageSize: pageSize,
        pageIndex: 0,
      },
    },
    usePagination
  );

  useEffect(() => {

    getInfo(info);

  }, [info, getInfo]);

  return (
    <Animated>
      <Container>
        {isLoading ? (
          <div data-testid='loader' className='loader'>
            <Loader
              type='Bars'
              color={Colors.White}
              height={100}
              width={100}
            />
          </div>
        ) : isError ? (
          <Popup show={showPopup} message={message} isError={isError} onButtonPress={()=> displayPopup(false)} />
        ) : (
          <div className='table-container'>
            <p>{capitalize(info)} Info</p>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, m) => (
                  <tr key={m} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, j) => (
                      <th key={j} {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {

                  prepareRow(row);

                  return (
                    <tr key={i} {...row.getRowProps()}>
                      {row.cells.map((cell, k) => {

                        return (
                          <td key={k} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );

                      })}
                    </tr>
                  );

                })}
              </tbody>
            </table>
            <div>
              <button
                data-testid='prev'
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous Page
              </button>
              <button
                data-testid='next'
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next Page
              </button>
              <div>
                Page{' '}
                <em>
                  {pageIndex + 1} of {pageOptions.length}
                </em>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Animated>
  );

}

InfoPage.propTypes = {
  isLoading: PropTypes.bool,
  getInfo: PropTypes.func,
  data: PropTypes.any,
  isError: PropTypes.bool,
  message: PropTypes.string,
  tableHeadersAndAccessors: PropTypes.array,
  showPopup: PropTypes.bool,
  displayPopup: PropTypes.func,
  pageSize: PropTypes.number,
};

export const Info = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPage);
