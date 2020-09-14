import PropTypes from 'prop-types';

import React,
{
  useEffect,
  useState
} from 'react';

import Loader from 'react-loader-spinner';

import {
  connect
} from 'react-redux';

import {
  useParams
} from 'react-router-dom';

import {
  Animated
} from 'app/components/containers/animated';

import {
  Container
} from 'app/components/containers/container';

import {
  getInfo
} from 'app/redux/actions';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  data: state.data,
  isError: state.isError,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  getInfo: (payload) => dispatch(getInfo(payload)),
});

function InfoPage({ isLoading, getInfo, }) {

  const { info, } = useParams();

  useEffect(() => {

    getInfo(info);

  }, [info]);

  return (
    <Animated>
      <Container>
        { isLoading
          ? <div className='loader'>
            <Loader
              type='Bars'
              color={Colors.White}
              height={100}
              width={100}
            />
          </div>
          : <p>content</p>
        }
      </Container>
    </Animated>
  );

}

InfoPage.propTypes = {
  isLoading: PropTypes.bool,
  getInfo: PropTypes.func,
  data: PropTypes.any,
  isError: PropTypes.bool,
  message: PropTypes.string,
};

export const Info = connect(mapStateToProps, mapDispatchToProps)(InfoPage);
