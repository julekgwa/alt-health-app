import PropTypes from 'prop-types';

import React, {
  useEffect,
  useState
} from 'react';

import Loader from 'react-loader-spinner';

import {
  connect
} from 'react-redux';

import Select from 'react-select';

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
  CartForm
} from 'app/components/form/cartForm';

import {
  Invoice
} from 'app/components/invoice/invoice';

import {
  addToCart,
  clearCart,
  getInfo,
  getInvoiceInfo,
  getInvoiceItems,
  getSupplementInfo,
  setClientInvoiceInfo
} from 'app/redux/actions';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = (state) => ({
  clientInfo: state.clientInfo,
  isLoading: state.isLoading,
  options: state.invoiceInfo,
  clientInfoOptions: state.clientInfoOptions,
  cartItems: state.cart,
  invoiceItems: state.invoiceItems,
  supplementOptions: state.supplementOptions,
  supplementInfo: state.supplementInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: (payload) => dispatch(getInfo(payload)),
  getInvoiceInfo: () => dispatch(getInvoiceInfo()),
  getInvoiceItems: (payload) => dispatch(getInvoiceItems(payload)),
  setClientInvoice: (payload) =>
    dispatch(setClientInvoiceInfo(payload)),
  getSupplementInfo: () => dispatch(getSupplementInfo()),
  addToCart: (payload) => dispatch(addToCart(payload)),
  clearCart: () => dispatch(clearCart()),
});

const CartPage = ({
  clientInfo,
  cartItems,
  addToCart,
  getSupplementInfo,
  supplementInfo,
  clientInfoOptions,
  isLoading,
  supplementOptions,
  setClientInvoice,
  getInfo,
  getInvoiceInfo,
  options,
  getInvoiceItems,
  clearCart,
}) => {

  const [selectValue, setSelect] = useState('');
  const [currentSupplement, setCurrentSupplement] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    if (clientInfo.length <= 0) {

      getInfo('clients');

    }

    if (supplementInfo.length <= 0) {

      getSupplementInfo();

    }

    getInvoiceInfo();

  }, [clientInfo, getInfo, getInvoiceInfo, getSupplementInfo, supplementInfo]);

  useEffect(() => {

    getInvoiceItems(selectValue);

  }, [selectValue, getInvoiceItems]);

  const setClientInvoiceInfo = (id) => {

    const client = clientInfo.find((info) => info.Client_id === id);

    setClientInvoice(client);

  };

  const onSupplementChange = (value) => {

    const supplement = supplementInfo.find(
      (supp) => supp.Supplement_id === value
    );

    setCurrentSupplement(supplement || {});

  };

  const addSupplementToCart = (qty) => {

    if (!currentSupplement) {

      return;

    }

    const cartItem = {
      ...currentSupplement,
    };

    cartItem.Item_quantity = qty;

    addToCart(cartItem);
    setCurrentSupplement(null);

  };

  const resetSupplement = () => {

    setCurrentSupplement(null);

  };

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
        ) : (
          <React.Fragment>
            <div className='select-container'>
              {cartItems.length <= 0 && (
                <Select
                  onChange={(e) => setSelect(e.value)}
                  placeholder='Select invoice...'
                  className='invoice-select'
                  options={options}
                />
              )}
              {cartItems.length > 0 && (
                <Select
                  onChange={(e) => setClientInvoiceInfo(e.value)}
                  placeholder='Select client...'
                  className='invoice-select'
                  options={clientInfoOptions}
                />
              )}

              <Button onClick={() => setShowForm(true)} primary>
                Add items to cart
              </Button>
            </div>
            <Invoice clearCart={clearCart} />

            <CartForm
              stockLevels={
                (currentSupplement &&
                  currentSupplement.Current_stock_levels) ||
                0
              }
              supplementPrice={
                (currentSupplement && currentSupplement.Cost_excl) ||
                '0'
              }
              onOkButton={addSupplementToCart}
              onCloseButton={() => setShowForm(false)}
              onSelectChange={onSupplementChange}
              options={supplementOptions}
              show={showForm}
              resetValues={resetSupplement}
              minLevels={
                (currentSupplement &&
                  currentSupplement.Min_levels) ||
                0
              }
            />
          </React.Fragment>
        )}
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
  supplementOptions: PropTypes.array,
  supplementInfo: PropTypes.array,
  getSupplementInfo: PropTypes.func,
  addToCart: PropTypes.func,
  clearCart: PropTypes.func,
};

export const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
