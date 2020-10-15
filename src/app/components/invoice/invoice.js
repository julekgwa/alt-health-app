import {
  faMinus,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

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
  addToCart,
  createInvoice,
  removeFromCart,
  updateCartQty
} from 'app/redux/actions/index';

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

const mapDispatchToProps = dispatch => ({
  sendClientInvoice: (payload) => dispatch(createInvoice(payload)),
  addToCart: (payload) => dispatch(addToCart(payload)),
  removeItem: (payload) => dispatch(updateCartQty(payload)),
  removeFromCart: (payload) => dispatch(removeFromCart(payload)),
});

const Inv = ({
  cartItems,
  invoiceItems,
  invoiceClientInfo,
  nextInvoiceNumber,
  clearCart,
  onSendInvoice,
  sendClientInvoice,
  addToCart,
  removeItem,
  removeFromCart,
}) => {

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

  const sendInvoice = () => {

    if (!invoiceClientInfo || !invoiceClientInfo.C_name) {

      onSendInvoice(true);

      return;

    }

    const invoice = {
      clientName: `${invoiceClientInfo.C_name || ''} ${invoiceClientInfo.C_surname || ''}`,
      address: invoiceClientInfo.Address,
      clientEmail: invoiceClientInfo.C_Email,
      clientId: invoiceClientInfo.Client_id,
      invoiceNumber: cartItems.length ? nextInvoiceNumber : items && items[0] && items[0].Inv_Num,
      dueDate: cartItems.length
        ? '00-00-0000'
        : items && items[0] && convertDate(items[0].Inv_Paid_Date),
      dateIssued: cartItems.length
        ? getCurrentDate()
        : items && items[0] && convertDate(items[0].Inv_Date),
      vat: vat,
      subtotal: subtotal,
      total: total,
      updateStock: cartItems.length > 0,
      paid:
        items.length &&
        typeof items[0].Inv_Paid === 'string' &&
        items[0].Inv_Paid.toLowerCase() === 'y'
          ? total
          : 0,
      balance:
        items.length &&
        typeof items[0].Inv_Paid === 'string' &&
        items[0].Inv_Paid.toLowerCase() === 'y'
          ? 0
          : total,
      lineItems: items,
    };

    sendClientInvoice(invoice);

  };

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

                </th>
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
                    <FontAwesomeIcon onClick={() => removeFromCart(item)} icon={faTrash} />
                  </td>
                  <td>
                    {item.Description}
                  </td>
                  <td className='align-right'>
                    R
                    {item.Cost_excl}
                  </td>
                  <td className='align-right'>
                    <div className='qty-container'>
                      <FontAwesomeIcon onClick={() => removeItem(item)} icon={faMinus} />
                      {item.Item_quantity}
                      <FontAwesomeIcon onClick={() => addToCart(item)} icon={faPlus} />
                    </div>
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
                {`${invoiceClientInfo.C_name || ''} ${
                  invoiceClientInfo.C_surname || ''
                }`}
              </span>
              <span>
                {invoiceClientInfo.Address}
              </span>
            </p>

            <p className='invoice-info-p'>
              Invoice Number
              {' '}
              <span>
                {cartItems.length
                  ? nextInvoiceNumber
                  : items && items[0] && items[0].Inv_Num}
              </span>
            </p>

            <p className='invoice-info-p'>
              Date
              {' '}
              <span>
                {cartItems.length
                  ? getCurrentDate()
                  : items &&
                    items[0] &&
                    convertDate(items[0].Inv_Date)}
              </span>
            </p>

            <p className='invoice-info-p'>
              Due Date
              {' '}
              <span>
                {cartItems.length
                  ? '00-00-0000'
                  : items &&
                    items[0] &&
                    convertDate(items[0].Inv_Paid_Date)}
              </span>
            </p>
          </div>
        </div>
      </InvoiceContainer>
      <div className='button-container'>
        {cartItems.length ? (
          <Button onClick={clearCart}>
            clear cart
          </Button>
        ) : (
          ''
        )}
        <Button onClick={sendInvoice} primary>
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
  onSendInvoice: PropTypes.func,
  sendClientInvoice: PropTypes.func,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
  removeFromCart: PropTypes.func,
};

Inv.defaultProps = {
  cartItems: [],
  invoiceItems: [],
};

export const Invoice = connect(mapStateToProps,mapDispatchToProps)(Inv);
