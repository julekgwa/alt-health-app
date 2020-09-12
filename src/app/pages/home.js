import PropTypes from 'prop-types';

import React,
{
  useEffect
} from 'react';

import {
  connect
} from 'react-redux';

import {
  animated,
  useTransition
} from 'react-spring';

import {
  Animated
} from 'app/components/containers/animated';

import {
  Container
} from 'app/components/containers/container';

import {
  Slider
} from 'app/components/slider/slider';

import {
  updateSliderIndex
} from 'app/redux/actions';

const mapStateToProps = (state) => ({
  sliderIndex: state.sliderIndex,
  sliderImages: state.sliderImages,
  isActive: state.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  updateSliderIndex: () => dispatch(updateSliderIndex()),
});

function AltHome({ sliderIndex, sliderImages, updateSliderIndex, isActive, }) {

  const transitions = useTransition(sliderIndex, null, {
    native: true,
    reset: true,
    unique: true,
    from: {
      opacity: 0,
      transform: 'translate3d(100%, 0 ,0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%, 0, 0)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(-50%, 0, 0)',
    },
  });

  useEffect(() => {

    const interval = setInterval(() => {

      if (!isActive) {

        updateSliderIndex();

      }

    }, 3000);

    return () => clearInterval(interval);

  }, [updateSliderIndex, isActive]);

  return (
    <Animated>
      <Container>
        <h1 className='company-title'>
          alt health{' '}
          <span className='tagline'>
            Better Care and Better Understanding.
          </span>
        </h1>
        {transitions.map(({ item, props, key, }) => (
          <animated.div style={{
            willChange: 'transform, opacity',
            position: 'absolute',
            width: '100%',
            height: '100%',
            ...props,
          }} key={key}>
            <Slider>
              <div>
                <img src={sliderImages[item].slider1} alt='logo1' />
              </div>
              <div>
                <img src={sliderImages[item].slider2} alt='logo2' />
              </div>
            </Slider>
          </animated.div>
        ))}
      </Container>
    </Animated>
  );

}

AltHome.propTypes = {
  sliderIndex: PropTypes.number,
  sliderImages: PropTypes.array,
  updateSliderIndex: PropTypes.func,
  isActive: PropTypes.bool,
};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(AltHome);
