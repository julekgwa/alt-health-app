
import PropTypes from 'prop-types';

import React, {
  useState
} from 'react';

import {
  connect
} from 'react-redux';

import Select from 'react-select';

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
  addNewClient
} from 'app/redux/actions/index';

import {
  handleKeyDown
  , maskPhoneNumber
  , validateEmail
} from 'app/utils';

const mapDispatchToProps = dispatch => ({
  addClient: (payload) => dispatch(addNewClient(payload)),
});

const Form = ({
  show,
  closeButtonText,
  okButtonText,
  onCloseButton,
  options,
  addClient,
}) => {

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cell, setCell] = useState('');
  const [work, setWork] = useState('');
  const [home, setHome] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [clientId, ClientInput] = useInput({
    type: 'number',
    id: 'client-id',
    placeholder: 'Client id',
  });

  const [name, NameInput] = useInput({
    type: 'text',
    id: 'name',
    placeholder: 'Name',
  });

  const [surname, SurnameInput] = useInput({
    type: 'text',
    id: 'surname',
    placeholder: 'Surname',
  });

  const [address, AddressInput] = useInput({
    type: 'text',
    id: 'address',
    placeholder: 'Address',
  });

  const [code, CodeInput] = useInput({
    type: 'text',
    id: 'code',
    placeholder: 'Code',
  });

  const [email, EmailInput] = useInput({
    type: 'email',
    id: 'email',
    placeholder: 'Email',
  });

  const closeForm = () => {

    onCloseButton();
    setIsInputEmpty(false);

  };

  const addNewItem = () => {

    const client = {
      name,
      surname,
      address,
      code,
      cell,
      work,
      home,
      email,
      clientId,
      referenceId,
    };

    setIsSubmitting(false);

    if (!name || !surname || !clientId || !address || !code || !home || !validateEmail(email)) {

      setIsSubmitting(true);

      return;

    }

    addClient(client);
    closeForm();

  };

  return (
    <React.Fragment>
      {show ? (
        <PopupContainer>
          <FormContainer
            inputEmpty={isInputEmpty}
          >
            <div className='container form'>

              <React.Fragment>
                <div className='input-container'>
                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='name' className={isSubmitting && !name ? 'required' : ''}>
                        name
                      </label>
                      {NameInput}
                    </div>

                    <div>
                      <label htmlFor='surname' className={isSubmitting && !surname ? 'required' : ''}>
                        surname
                      </label>
                      {SurnameInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='client-id' className={isSubmitting && !clientId ? 'required' : ''}>
                        client id
                      </label>
                      {ClientInput}
                    </div>

                    <div>
                      <label htmlFor='email' className={isSubmitting && !validateEmail(email) ? 'required' : ''}>
                        email
                      </label>
                      {EmailInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='address' className={isSubmitting && !address ? 'required' : ''}>
                        address
                      </label>
                      {AddressInput}
                    </div>

                    <div>
                      <label htmlFor='code' className={isSubmitting && !code ? 'required' : ''}>
                        code
                      </label>
                      {CodeInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='tel-work'>
                        tell work
                      </label>
                      <input placeholder='(011) 858-9033' className='task-input' value={work} onChange={(e) => setWork(maskPhoneNumber(e.target.value))} id='tel-work' type='tel' />
                    </div>
                    <div>
                      <label htmlFor='cell'>
                        cell
                      </label>
                      <input placeholder='(072) 858-9033' className='task-input' value={cell} onChange={(e) => setCell(maskPhoneNumber(e.target.value))} id='cell' type='tel' />
                    </div>
                  </div>
                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='tel-home' className={isSubmitting && !home ? 'required' : ''}>
                        tel home
                      </label>
                      <input placeholder='(011) 858-9033' className='task-input' value={home} onChange={(e) => setHome(maskPhoneNumber(e.target.value))} id='tel-home' type='tel' />
                    </div>
                    <div>
                      <label htmlFor='supplement-id'>
                        Reference id
                      </label>
                      <Select onChange={(e) => setReferenceId(e.value)} id='supplement-id' options={options}/>
                    </div>
                  </div>
                </div>

                <div className='button'>
                  <div data-testid='close-button' onClick={closeForm} role='button' tabIndex='0' onKeyDown={(e) => handleKeyDown(e, closeForm)}>
                    <p>
                      {closeButtonText}
                    </p>
                  </div>
                  <div data-testid='add-button' role='button' tabIndex='0' onKeyDown={(e) => handleKeyDown(e, addNewItem)} onClick={addNewItem}>
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
  options: PropTypes.array,
  addClient: PropTypes.func,
};

Form.defaultProps = {
  closeButtonText: 'Close',
  okButtonText: 'Add Client',
  onCloseButton: () => {},
  show: false,
};

export const ClientForm = connect(null, mapDispatchToProps)(Form);
