import PropTypes from 'prop-types';

import React, {
  useEffect,
  useState
} from 'react';

import Loader from 'react-loader-spinner';

import {
  connect
} from 'react-redux';

import {
  Animated
} from 'app/components/containers/animated';

import {
  Container
} from 'app/components/containers/container';

import {
  Popup
} from 'app/components/popup/popup';

import {
  Supplement
} from 'app/components/supplement/supplement';

import {
  Pagination
} from 'app/pagination/pagination';

import {
  addToCart,
  getInfo,
  showPopup,
  updateSliderIndex
} from 'app/redux/actions';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = (state) => ({
  sliderIndex: state.sliderIndex,
  sliderImages: state.sliderImages,
  isActive: state.isActive,
  data: state.data,
  isLoading: state.isLoading,
  isError: state.isError,
  message: state.message,
  showPopup: state.showPopup,
});

const mapDispatchToProps = (dispatch) => ({
  updateSliderIndex: () => dispatch(updateSliderIndex()),
  getSupplements: (payload) => dispatch(getInfo(payload)),
  displayPopup: (payload) => dispatch(showPopup(payload)),
  addToCart: (payload) => dispatch(addToCart(payload)),
});

function AltHome({
  data,
  getSupplements,
  isLoading,
  isError,
  message,
  displayPopup,
  showPopup,
  addToCart,
}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [supplementsPerPage] = useState(6);

  useEffect(() => {

    getSupplements('supplements');

  }, [getSupplements]);

  const formatItemPrice = (price) => {

    if(!price) {

      return '---';

    }
    const itemPrice = parseFloat(price).toFixed(2);

    return `R${itemPrice}`;

  };

  const indexOfTheLastSupplement = currentPage * supplementsPerPage;
  const indexOfFirstSupplement =
    indexOfTheLastSupplement - supplementsPerPage;
  const currentSupplements = data.slice(
    indexOfFirstSupplement,
    indexOfTheLastSupplement
  );

  return (
    <Animated>
      <Container>
        <h1 className='company-title'>
          alt health{' '}
          <span className='tagline'>
            Better Care and Better Understanding.
          </span>
        </h1>
        {isLoading ? (
          <div data-testid='loader' className='loader'>
            <Loader
              type='Bars'
              color={Colors.White}
              height={100}
              width={100}
            />
          </div>
        ) : isError ? (
          <Popup
            show={showPopup}
            message={message}
            isError={isError}
            onButtonPress={() => displayPopup(false)}
          />
        ) : (
          <div>
            <div className='supplement-shop'>
              {currentSupplements.map((supplement, index) => (
                <Supplement
                  key={index}
                  description={supplement.Description}
                  price={formatItemPrice(supplement.Cost_excl)}
                  onClick={() => addToCart(supplement)}
                />
              ))}
            </div>
            <Pagination
              itemsPerPage={supplementsPerPage}
              totalItems={data.length}
              currentPage={currentPage}
              paginate={setCurrentPage}
            />
          </div>
        )}
      </Container>
    </Animated>
  );

}

AltHome.propTypes = {
  data: PropTypes.array,
  getSupplements: PropTypes.func,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  displayPopup: PropTypes.func,
  showPopup: PropTypes.bool,
  addToCart: PropTypes.func,
};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(AltHome);
