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
  getInvoiceItems,
  setClientInvoiceInfo
} from 'app/redux/actions';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps= state => ({
  clientInfo: state.clientInfo,
  isLoading: state.isLoading,
  options: state.invoiceInfo,
  clientInfoOptions: state.clientInfoOptions,
  cartItems: state.cart,
  invoiceItems: state.invoiceItems,
});

const mapDispatchToProps = dispatch => ({
  getInfo: (payload) => dispatch(getInfo(payload)),
  getInvoiceInfo: () => dispatch(getInvoiceInfo()),
  getInvoiceItems: (payload) => dispatch(getInvoiceItems(payload)),
  setClientInvoice: (payload) => dispatch(setClientInvoiceInfo(payload)),
});

const CartPage = ({ clientInfo,cartItems,invoiceItems,clientInfoOptions, isLoading, setClientInvoice, getInfo, getInvoiceInfo, options, getInvoiceItems, }) => {

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

  const setClientInvoiceInfo = (id) => {

    const client = clientInfo.find(info => info.Client_id === id);

    setClientInvoice(client);

  };

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
            <div className='select-container'>
              {cartItems.length <=0 && <Select onChange={(e) => setSelect(e.value)} placeholder='Select invoice...' className='invoice-select' options={options} />}
              {invoiceItems.length <= 0 && <Select onChange={(e) => setClientInvoiceInfo(e.value)} placeholder='Select client...' className='invoice-select' options={clientInfoOptions} />}
            </div>
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
  clientInfoOptions: PropTypes.array,
  setClientInvoice: PropTypes.func,
  cartItems: PropTypes.array,
  invoiceItems: PropTypes.array,
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartPage);
