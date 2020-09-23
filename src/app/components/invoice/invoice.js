import PropTypes from 'prop-types';

import React from 'react';

import {
  connect
} from 'react-redux';

import InvoiceLogo from 'app/assets/invoice.png';

import {
  Button
} from 'app/components/button/button';

import {
  InvoiceContainer
} from 'app/components/invoice/invoiceContainer';

import {
  calculateCartTotal,
  convertDate,
  getCurrentDate
} from 'app/utils';

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  invoiceItems: state.invoiceItems,
  invoiceClientInfo: state.invoiceClientInfo,
  nextInvoiceNumber: state.nextInvoiceNumber,
});

const Inv = ({ cartItems, invoiceItems, invoiceClientInfo, nextInvoiceNumber, clearCart, }) => {

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
    <React.Fragment>
      <InvoiceContainer>
        <div className='invoice-header-container'>
          <p>
            invoice
          </p>
          <img src={InvoiceLogo} alt='invoice-logo' />
        </div>
        <div className='invoice-body'>
          <div className='line-items'>
            <table className='invoice-tbl'>
              <tr>
                <th className='align-left'>
                  Description
                </th>
                <th className='align-right'>
                  Price (excl)
                </th>
                <th className='align-right content'>
                  Qty
                </th>
                <th className='align-right'>
                  Total (excl)
                </th>
              </tr>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.Description}
                  </td>
                  <td className='align-right'>
                    R
                    {item.Cost_excl}
                  </td>
                  <td className='align-right'>
                    {item.Item_quantity}
                  </td>
                  <td className='align-right'>
                    R
                    {calculateTotalPrice(
                      item.Cost_excl,
                      item.Item_quantity
                    )}
                  </td>
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
                <td className='align-right'>
                  Subtotal
                </td>
                <td className='align-right'>
                  R
                  {subtotal}
                </td>
              </tr>
              <tr className='tr-subtotal'>
                <td></td>
                <td></td>
                <td className='align-right'>
                  VAT
                </td>
                <td className='align-right'>
                  R
                  {vat}
                </td>
              </tr>

              <tr className='tr-subtotal'>
                <td></td>
                <td></td>
                <td className='align-right'>
                  Total
                </td>
                <td className='align-right'>
                  R
                  {total}
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td className='align-right'>
                  Paid
                </td>
                <td className='align-right'>
                  R
                  {items.length &&
                typeof items[0].Inv_Paid === 'string' &&
                items[0].Inv_Paid.toLowerCase() === 'y'
                    ? total
                    : 0}
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td className='align-right'>
                  Balance
                </td>
                <td className='align-right'>
                  R
                  {items.length &&
                typeof items[0].Inv_Paid === 'string' &&
                items[0].Inv_Paid.toLowerCase() === 'y'
                    ? 0
                    : total}
                </td>
              </tr>
            </table>
          </div>
          <div className='divider'></div>
          <div className='bill-info'>
            <p className='invoice-info-p'>
              Bill To
              {' '}
              <span>
                {`${invoiceClientInfo.C_name || ''} ${invoiceClientInfo.C_surname || ''}`}
              </span>
              <span>
                {invoiceClientInfo.Address}
              </span>
            </p>

            <p className='invoice-info-p'>
              Invoice Number
              {' '}
              <span>
                {cartItems.length ? nextInvoiceNumber : items && items[0] && items[0].Inv_Num}
              </span>
            </p>

            <p className='invoice-info-p'>
              Date
              {' '}
              <span>
                {cartItems.length ? getCurrentDate() : items && items[0] && convertDate(items[0].Inv_Date)}
              </span>
            </p>

            <p className='invoice-info-p'>
              Due Date
              {' '}
              <span>
                {cartItems.length ? '00-00-0000' : items &&
                items[0] &&
                convertDate(items[0].Inv_Paid_Date)}
              </span>
            </p>
          </div>
        </div>
      </InvoiceContainer>
      <div className='button-container'>
        {cartItems.length ? <Button onClick={clearCart}>
          clear cart
        </Button> : ''}
        <Button primary>
          Send invoice
        </Button>
      </div>
    </React.Fragment>
  );

};

Inv.propTypes = {
  cartItems: PropTypes.array.isRequired,
  invoiceItems: PropTypes.array.isRequired,
  invoiceClientInfo: PropTypes.object,
  nextInvoiceNumber: PropTypes.string,
  clearCart: PropTypes.func,
};

Inv.defaultProps = {
  cartItems: [],
  invoiceItems: [],
};

export const Invoice = connect(mapStateToProps)(Inv);
