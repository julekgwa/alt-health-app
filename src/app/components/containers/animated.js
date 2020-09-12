import platform from 'electron-platform';

import PropTypes from 'prop-types';

import React from 'react';

import {
  connect
} from 'react-redux';

import {
  animated,
  useSpring
} from 'react-spring';

import classes from './animated.module.css';

const mapStateToProps = (state) => ({
  isActive: state.isActive,
});

function AnimatedDiv(props) {

  const { isActive, children, } = props;
  //7.5% margin left
  const marginLeft = 0.075 * window.outerWidth + 'px';
  const style = useSpring({
    width: isActive ? '85%' : '100%',
    marginTop: isActive ? '100px' : '0px',
    marginLeft: isActive ? marginLeft : '0px',
  });

  const animatedStyle = useSpring({
    display: !platform.isPureWeb ? 'flex' : 'block',
    flexDirection: 'column',
    alignItems: 'center',
  });

  return (
    <animated.div
      className={isActive ? classes.animated : ''}
      style={{
        ...animatedStyle,
        ...style,
      }}
    >
      {children}
    </animated.div>
  );

}

AnimatedDiv.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export const Animated = connect(mapStateToProps)(AnimatedDiv);
