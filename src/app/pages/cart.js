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

import Select from 'react-select';

import {
  Animated
} from 'app/components/containers/animated';

import {
  Container
} from 'app/components/containers/container';

import {
  Invoice
} from 'app/components/invoice/invoice';

import {
  getInfo,
  getInvoiceInfo,
  getInvoiceItems
} from 'app/redux/actions';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps= state => ({
  clientInfo: state.clientInfo,
  isLoading: state.isLoading,
  options: state.invoiceInfo,
});

const mapDispatchToProps = dispatch => ({
  getInfo: (payload) => dispatch(getInfo(payload)),
  getInvoiceInfo: () => dispatch(getInvoiceInfo()),
  getInvoiceItems: (payload) => dispatch(getInvoiceItems(payload)),
});

const CartPage = ({ clientInfo, isLoading, getInfo, getInvoiceInfo, options, getInvoiceItems, }) => {

  const [selectValue, setSelect] = useState('');

  useEffect(() => {

    if (clientInfo.length <= 0) {

      getInfo('clients');

    }

    getInvoiceInfo();

  }, [clientInfo, getInfo, getInvoiceInfo]);

  useEffect(() => {

    getInvoiceItems(selectValue);

  }, [selectValue,getInvoiceItems]);

  return (
    <Animated>
      <Container>
        { isLoading
          ? <div data-testid='loader' className='loader'>
            <Loader
              type='Bars'
              color={Colors.White}
              height={100}
              width={100}
            />
          </div>

          : <React.Fragment>
            <Select onChange={(e) => setSelect(e.value)} placeholder='Select invoice...' className='invoice-select' options={options} />
            <Invoice />
          </React.Fragment>
        }
      </Container>
    </Animated>
  );

};

CartPage.propTypes = {
  clientInfo: PropTypes.array,
  isLoading: PropTypes.bool,
  getInfo: PropTypes.func,
  getInvoiceInfo: PropTypes.func.isRequired,
  options: PropTypes.array,
  getInvoiceItems: PropTypes.func,
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartPage);
