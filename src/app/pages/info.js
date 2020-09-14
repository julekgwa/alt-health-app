import PropTypes from 'prop-types';

import React, {
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
  getInfo
} from 'app/redux/actions';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  data: state.data,
  isError: state.isError,
  message: state.message,
  tableHeadersAndAccessors: state.tableHeadersAndAccessors,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: (payload) => dispatch(getInfo(payload)),
});

function InfoPage({
  isLoading,
  getInfo,
  tableHeadersAndAccessors,
  data,
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
        pageSize: 10,
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
          <div className='loader'>
            <Loader
              type='Bars'
              color={Colors.White}
              height={100}
              width={100}
            />
          </div>
        ) : (
          <div>
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
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous Page
              </button>
              <button
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
};

export const Info = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPage);
