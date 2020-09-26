import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React,
{
  useEffect,
  useState
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
  Button
} from 'app/components/button/button';

import {
  Animated
} from 'app/components/containers/animated';

import {
  Container
} from 'app/components/containers/container';

import {
  ClientForm
} from 'app/components/form/clientForm';

import {
  SupplementForm
} from 'app/components/form/supplementForm';

import {
  SupplierForm
} from 'app/components/form/supplierForm';

import {
  Popup
} from 'app/components/popup/popup';

import {
  getInfo,
  getReference
  , showPopup
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
  supplierOptions: state.supplierOptions,
  supplierInfo: state.supplierInfo,
  referenceOptions: state.referenceOptions,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: (payload) => dispatch(getInfo(payload)),
  displayPopup: (payload) => dispatch(showPopup(payload)),
  getReferenceInfo: () => dispatch(getReference()),
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
  supplierOptions,
  supplierInfo,
  referenceOptions,
  getReferenceInfo,
  pageSize = 10,
}) {

  const { info, } = useParams();
  const [showClientForm, setShowClientForm] = useState(false);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [showSupplementForm, setShowSupplementForm] = useState(false);

  const buttons = [<Button onClick={() => setShowClientForm(true)} key='1' primary>
    <FontAwesomeIcon icon={faPlus} />
  </Button>, <Button onClick={() => setShowSupplierForm(true)} key='2' primary>
    <FontAwesomeIcon icon={faPlus} />
  </Button>, <Button onClick={() => setShowSupplementForm(true)} key='3' primary>
    <FontAwesomeIcon icon={faPlus} />
  </Button>];

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

  }, [info, getInfo, getReferenceInfo]);

  useEffect(() => {

    if (supplierInfo.length <= 0 && info !== 'suppliers') {

      getInfo('suppliers');

    }

    if (referenceOptions.length <= 0) {

      getReferenceInfo();

    }

  });

  const buttonIndex = info === 'clients' ? 0 : info === 'suppliers' ? 1 : 2;

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
        ) : data && (
          <React.Fragment>
            <div className='table-container'>
              <div className='info-header'>
                <p>
                  {capitalize(info)}
                  {' '}
                  Info
                </p>
                {buttons[buttonIndex]}
              </div>
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
                  Page
                  {' '}
                  <em>
                    {pageIndex + 1}
                    {' '}
                    of
                    {pageOptions.length}
                  </em>
                </div>
              </div>
            </div>
            <Popup show={showPopup} message={message} isError={isError} onButtonPress={()=> displayPopup(false)} />
            <ClientForm options={referenceOptions} onCloseButton={() => setShowClientForm(false)} show={showClientForm} />
            <SupplierForm show={showSupplierForm} onCloseButton={() => setShowSupplierForm(false)} />
            <SupplementForm options={supplierOptions} show={showSupplementForm} onCloseButton={() => setShowSupplementForm(false)} />
          </React.Fragment>
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
  supplierOptions: PropTypes.array,
  supplierInfo: PropTypes.array,
  referenceOptions: PropTypes.array,
  getReferenceInfo: PropTypes.func,
};

export const Info = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPage);
