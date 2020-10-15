
import PropTypes from 'prop-types';

import React, {
  useState
} from 'react';

import Select from 'react-select';

import {
  FormContainer
} from 'app/components/form/formContainer';

import {
  PopupContainer
} from 'app/components/popup/popupContainer';

import {
  handleKeyDown
} from 'app/utils';

export const CartForm = ({
  show,
  closeButtonText,
  okButtonText,
  onCloseButton,
  onOkButton,
  isLoading,
  options,
  onSelectChange,
  supplementPrice,
  stockLevels,
  minLevels,
  resetValues,
}) => {

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [qty, setQty] = useState(0);

  const closeForm = () => {

    onCloseButton();
    setIsInputEmpty(false);
    setQty(0);
    resetValues();

  };

  const onAddToCartPress = () => {

    if (Number(qty) > 0) {

      onOkButton(Number(qty));
      setQty(0);
      resetValues();

      return;

    }

    setIsInputEmpty(true);

  };

  return (
    <React.Fragment>
      {show ? (
        <PopupContainer>
          <FormContainer
            inputEmpty={isInputEmpty}
            isSubmitting={isLoading}
          >
            <div className='container form'>

              <React.Fragment>
                <div className='input-container'>
                  <label htmlFor='supplement-id'>
                    supplement id
                  </label>
                  <Select onChange={(e) => onSelectChange(e.value)} id='supplement-id' options={options}/>
                  <label htmlFor='task'>
                    Item price
                  </label>
                  <input value={supplementPrice} className={!Number(supplementPrice) && isInputEmpty ? 'task-input empty' : 'task-input'} readOnly />
                  <label htmlFor='item-price'>
                    qty
                  </label>
                  <input type='number' min='0' max={stockLevels} onChange={(e) => setQty(e.target.value)} className={!Number(qty) && isInputEmpty ? 'task-input empty' : 'task-input'} value={qty} />
                </div>

                {minLevels > stockLevels && <p className='min-levels'>
                  Only
                  {' '}
                  {stockLevels}
                  {' '}
                  left
                </p>}

                <div className='button'>
                  <div data-testid='close-button' onClick={closeForm} role='button' tabIndex='0' onKeyDown={(e) => handleKeyDown(e, closeForm)}>
                    <p>
                      {closeButtonText}
                    </p>
                  </div>
                  <div data-testid='add-button' role='button' tabIndex='0' onKeyDown={(e) => handleKeyDown(e, onAddToCartPress)} onClick={onAddToCartPress}>
                    <p>
                      {okButtonText}
                    </p>
                  </div>
                </div>
              </React.Fragment>

            </div>
          </FormContainer>
        </PopupContainer>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );

};

CartForm.propTypes = {
  show: PropTypes.bool.isRequired,
  closeButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  onCloseButton: PropTypes.func,
  isLoading: PropTypes.bool,
  onOkButton: PropTypes.func.isRequired,
  stockLevels: PropTypes.number,
  options: PropTypes.array,
  onSelectChange: PropTypes.func,
  supplementPrice: PropTypes.string,
  minLevels: PropTypes.number,
  resetValues: PropTypes.func,
};

CartForm.defaultProps = {
  closeButtonText: 'Close',
  okButtonText: 'Add to cart',
  onCloseButton: () => {},
  show: false,
  isLoading: false,
  requestStatus: '',
  message: '',
  onOkButton: () => {},
  taskTitle: '',
  taskDueDate: new Date(),
  supplementPrice: '0',
  stockLevels: 0,
};
