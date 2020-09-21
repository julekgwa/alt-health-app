import PropTypes from 'prop-types';

import React from 'react';

import {
  connect
} from 'react-redux';

import InvoiceLogo from 'app/assets/invoice.png';

import {
  calculateCartTotal
} from 'app/utils';

import {
  InvoiceContainer
} from './invoiceContainer';

const mapStateToProps = state => ({
  cartItems: state.cart,
  invoiceItems: state.invoiceItems,
});

const Inv = ({ cartItems, invoiceItems, }) => {

  if (cartItems.length <= 0 && invoiceItems.length <= 0) {

    return '';

  }

  const items = cartItems.length ? cartItems : invoiceItems;

  const calculateTotalPrice = (price, qty) => {

    return parseFloat(price).toFixed(2) * qty;

  };

  const subtotal = calculateCartTotal(items);
  const total = calculateCartTotal(items, true);
  const vat = (total - subtotal).toFixed(2);

  return (
    <InvoiceContainer>
      <div className='invoice-header-container'>
        <p>invoice</p>
        <img src={InvoiceLogo} alt='invoice-logo' />
      </div>
      <div className='invoice-body'>
        <div className='line-items'>
          <table className='invoice-tbl'>
            <tr>
              <th>Description</th>
              <th>Price (excl)</th>
              <th>Qty</th>
              <th>Total (excl)</th>
            </tr>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.Description}</td>
                <td>R{item.Cost_excl}</td>
                <td>{item.Item_quantity}</td>
                <td>R{calculateTotalPrice(item.Cost_excl, item.Item_quantity)}</td>
              </tr>
            ))}

            <tr className='tr-divider'>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className='tr-subtotal'>
              <td></td>
              <td></td>
              <td>Subtotal</td>
              <td>R{subtotal}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>VAT</td>
              <td>R{vat}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td>Grand Total Incl. VAT</td>
              <td>R{total}</td>
            </tr>
          </table>
        </div>
        <div className='divider'></div>
        <div className='bill-info'>
          <p>Billed To:</p>
          <p>888 TIJGER VILLAS OLD OAK ROAD BELLVILLE</p>
        </div>
      </div>
    </InvoiceContainer>
  );

};

Inv.propTypes = {
  cartItems: PropTypes.array.isRequired,
  invoiceItems: PropTypes.array.isRequired,
};

Inv.defaultProps = {
  cartItems:[],
  invoiceItems: [],
};

export const Invoice = connect(mapStateToProps)(Inv);
