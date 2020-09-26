import PropTypes from 'prop-types';

import React,
{
  useState
} from 'react';

import {
  connect
} from 'react-redux';

import {
  FormContainer
} from 'app/components/form/formContainer';

import {
  useInput
} from 'app/components/form/useInput';

import {
  PopupContainer
} from 'app/components/popup/popupContainer';

import {
  addNewSupplier
} from 'app/redux/actions/index';

import {
  handleKeyDown,
  maskPhoneNumber,
  validateEmail
} from 'app/utils';

const mapDispatchToProps = dispatch => ({
  addSupplier: (payload) => dispatch(addNewSupplier(payload)),
});

export const Form = ({
  show,
  closeButtonText,
  okButtonText,
  onCloseButton,
  addSupplier,
}) => {

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplierId, setSupplierId] = useState('');
  const [supplierTel, setSupplierTel] = useState('');
  const [home, setHome] = useState('');
  const [bank, BankInput] = useInput({
    type: 'text',
    id: 'bank',
    placeholder: 'Bank Name',
  });

  const [name, NameInput] = useInput({
    type: 'text',
    id: 'name',
    placeholder: 'Name',
  });

  const [contact, ContactInput] = useInput({
    type: 'text',
    id: 'contact',
    placeholder: 'Contact Person',
  });

  const [bankNumber, BankNumberInput] = useInput({
    type: 'text',
    id: 'bankNumber',
    placeholder: 'Supplier bank number',
  });

  const [code, CodeInput] = useInput({
    type: 'number',
    id: 'code',
    placeholder: 'Bank Code',
  });

  const [email, EmailInput] = useInput({
    type: 'email',
    id: 'email',
    placeholder: 'Supplier Email',
  });

  const closeForm = () => {

    onCloseButton();
    setIsInputEmpty(false);

  };

  const addNewItem = () => {

    const supplier = {
      name,
      contact,
      bankNumber,
      code,
      supplierId,
      supplierTel,
      home,
      email,
      bank,
    };

    setIsSubmitting(false);

    if (
      !name ||
      !contact ||
      !supplierTel ||
      !home ||
      !supplierId ||
      !validateEmail(email)
    ) {

      setIsSubmitting(true);

      return;

    }

    addSupplier(supplier);
    closeForm();

  };

  return (
    <React.Fragment>
      {show ? (
        <PopupContainer>
          <FormContainer inputEmpty={isInputEmpty}>
            <div className='container form'>
              <React.Fragment>
                <div className='input-container'>
                  <div className='form-inputs'>
                    <div>
                      <label
                        htmlFor='name'
                        className={
                          isSubmitting && !name ? 'required' : ''
                        }
                      >
                        name
                      </label>
                      {NameInput}
                    </div>

                    <div>
                      <label
                        htmlFor='contact'
                        className={
                          isSubmitting && !contact ? 'required' : ''
                        }
                      >
                        Contact person
                      </label>
                      {ContactInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='bank'>
                        Bank
                      </label>
                      {BankInput}
                    </div>

                    <div>
                      <label
                        htmlFor='email'
                        className={
                          isSubmitting && !validateEmail(email)
                            ? 'required'
                            : ''
                        }
                      >
                        email
                      </label>
                      {EmailInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='bankNumber'>
                        Bank Number
                      </label>
                      {BankNumberInput}
                    </div>

                    <div>
                      <label htmlFor='code'>
                        bank code
                      </label>
                      {CodeInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label
                        htmlFor='tel-supplier'
                        className={
                          isSubmitting && !supplierTel
                            ? 'task-input required'
                            : ''
                        }
                      >
                        supplier Tel
                      </label>
                      <input
                        placeholder='(011) 858-9033'
                        className='task-input'
                        value={supplierTel}
                        onChange={(e) =>
                          setSupplierTel(
                            maskPhoneNumber(e.target.value)
                          )
                        }
                        id='tel-supplier'
                        type='tel'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='tel-home'
                        className={
                          isSubmitting && !home ? 'required' : ''
                        }
                      >
                        tel home
                      </label>
                      <input
                        placeholder='(011) 858-9033'
                        className='task-input'
                        value={home}
                        onChange={(e) =>
                          setHome(maskPhoneNumber(e.target.value))
                        }
                        id='tel-home'
                        type='tel'
                      />
                    </div>
                  </div>
                  <div className='form-inputs'>
                    <div>
                      <label
                        htmlFor='supplier'
                        className={
                          isSubmitting && !supplierId
                            ? 'task-input required'
                            : 'task-input'
                        }
                      >
                        supplier id
                      </label>
                      <input
                        className='task-input'
                        value={supplierId}
                        onChange={(e) =>
                          setSupplierId(e.target.value)
                        }
                        id='supplier'
                        type='text'
                      />
                    </div>
                  </div>
                </div>

                <div className='button'>
                  <div
                    data-testid='close-button'
                    onClick={closeForm}
                    role='button'
                    tabIndex='0'
                    onKeyDown={(e) => handleKeyDown(e, closeForm)}
                  >
                    <p>
                      {closeButtonText}
                    </p>
                  </div>
                  <div
                    data-testid='add-button'
                    role='button'
                    tabIndex='0'
                    onKeyDown={(e) => handleKeyDown(e, addNewItem)}
                    onClick={addNewItem}
                  >
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

Form.propTypes = {
  show: PropTypes.bool.isRequired,
  closeButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  onCloseButton: PropTypes.func,
  addSupplier: PropTypes.func,
};

Form.defaultProps = {
  closeButtonText: 'Close',
  okButtonText: 'Add Supplier',
  onCloseButton: () => {},
  show: false,
};

export const SupplierForm = connect(null, mapDispatchToProps)(Form);
