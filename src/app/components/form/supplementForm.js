
import PropTypes from 'prop-types';

import React, {
  useEffect,
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
  addNewSupplement
} from 'app/redux/actions/index';

import {
  calculateVAT
  , handleKeyDown
} from 'app/utils';

const mapDispatchToProps = dispatch => ({
  addSupplement: (payload) => dispatch(addNewSupplement(payload)),
});

const mapStateToProps = state => ({
  nextSupplementId: state.nextSupplementId,
});

export const Form = ({
  show,
  closeButtonText,
  okButtonText,
  onCloseButton,
  options,
  addSupplement,
  nextSupplementId,
}) => {

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nappiCode, setNappiCode] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [costExcl, setCostExcl] = useState('');

  const [supplementId, SupplementInput, setSupplementId] = useInput({
    type: 'text',
    id: 'supplement-id',
    placeholder: 'Supplement ID',
  });

  const [description, DescriptionInput] = useInput({
    type: 'text',
    id: 'description',
    placeholder: 'Description',
  });

  const [minLevels, MinLevelsInput] = useInput({
    type: 'number',
    id: 'minLevels',
    placeholder: 'Min Levels',
  });

  const [stockLevels, StockLevelsInput] = useInput({
    type: 'number',
    id: 'stock-levels',
    placeholder: 'Stock Levels',
  });

  const [costIncl, CostIncl, setCostIncl] = useInput({
    type: 'text',
    id: 'cost-incl',
    readOnly: true,
    placeholder: 'Cost Incl',
  });

  const closeForm = () => {

    onCloseButton();
    setIsInputEmpty(false);

  };

  const onCostExclChange = (e) => {

    const priceIncl = Number(e.target.value) || 0;

    setCostExcl(e.target.value);
    setCostIncl(calculateVAT(priceIncl));

  };

  const addNewItem = () => {

    const supplement = {
      supplementId,
      description,
      minLevels,
      stockLevels,
      nappiCode,
      costIncl,
      costExcl,
      supplierId,
    };

    setIsSubmitting(false);

    if (!supplementId || !description || !costExcl || !minLevels || !stockLevels || !costIncl || !supplierId) {

      setIsSubmitting(true);

      return;

    }

    addSupplement(supplement);
    closeForm();

  };

  useEffect(() => {

    setSupplementId(nextSupplementId);

  }, [nextSupplementId, setSupplementId]);

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
                      <label htmlFor='name' className={isSubmitting && !supplementId ? 'required' : ''}>
                        supplement id
                      </label>
                      {SupplementInput}
                    </div>

                    <div>
                      <label htmlFor='description' className={isSubmitting && !description ? 'required' : ''}>
                        Description
                      </label>
                      {DescriptionInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='cost-excl' className={isSubmitting && !costExcl ? 'required' : ''}>
                        cost excl
                      </label>
                      <input id='cost-excl' className='task-input' placeholder='Cost Excl' type='text' onChange={onCostExclChange}/>
                    </div>

                    <div>
                      <label htmlFor='const-incl' className={isSubmitting && !costIncl ? 'required' : ''}>
                        Cost Incl
                      </label>
                      {CostIncl}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='min-levels' className={isSubmitting && !minLevels ? 'required' : ''}>
                        Min levels
                      </label>
                      {MinLevelsInput}
                    </div>

                    <div>
                      <label htmlFor='stock-levels' className={isSubmitting && !stockLevels ? 'required' : ''}>
                        Stock Levels
                      </label>
                      {StockLevelsInput}
                    </div>
                  </div>

                  <div className='form-inputs'>
                    <div>
                      <label htmlFor='nappi-code'>
                        Nappi code
                      </label>
                      <input placeholder='Nappi Code' className='task-input' value={nappiCode} onChange={(e) => setNappiCode(e.target.value)} id='nappi-code' type='text' />
                    </div>
                    <div>
                      <label htmlFor='supplement-id' className={isSubmitting && !supplierId ? 'required' : ''}>
                        Supplier id
                      </label>
                      <Select className='dropdown' onChange={(e) => setSupplierId(e.value)} id='supplement-id' options={options}/>
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
  addSupplement: PropTypes.func,
  nextSupplementId: PropTypes.string,
};

Form.defaultProps = {
  closeButtonText: 'Close',
  okButtonText: 'Add Supplement',
  onCloseButton: () => {},
  show: false,
};

export const SupplementForm = connect(mapStateToProps, mapDispatchToProps)(Form);
