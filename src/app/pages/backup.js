import PropTypes from 'prop-types';

import React, {
  useEffect,
  useState
} from 'react';

import Loader from 'react-loader-spinner';

import {
  connect
} from 'react-redux';

import Select from 'react-select';

import {
  Button
} from 'app/components/button/button';

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
  getBackups,
  restoreDB,
  showPopup
} from 'app/redux/actions/index';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = (state) => ({
  backups: state.backups,
  showPopup: state.showPopup,
  isError: state.isError,
  message: state.message,
  sLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getBackups: () => dispatch(getBackups()),
  restoreDb: (payload) => dispatch(restoreDB(payload)),
  displayPopup: (payload) => dispatch(showPopup(payload)),
});

function BackupsPage({
  backups,
  getBackups,
  restoreDb,
  showPopup,
  message,
  isError,
  displayPopup,
  isLoading,
}) {

  const [commit, setCommit] = useState('');

  useEffect(() => {

    getBackups();

  }, []);

  const onCommitChange = (commit) => {

    setCommit(commit);

  };

  const restore = () => {

    restoreDb({
      commit,
    });

  };

  return (
    <Animated>
      <Container>
        { isLoading
          ? <div data-testid='loader' className='loader'>
            <Loader
              type='Bars'
              color={Colors.White}
              height={100}
              width={100}
            />
          </div>
          : (<React.Fragment>
            <div className='info-header'>
              <p>
                Backups
              </p>
            </div>

            <Select
              onChange={(e) => onCommitChange(e.value)}
              placeholder='Select backup...'
              className='invoice-select'
              options={backups}
            />

            <Button onClick={restore} primary>
              restore database
            </Button>

            <Popup
              show={showPopup}
              message={message || 'Successfully sent invoice to client'}
              isError={isError}
              onButtonPress={() => displayPopup(false)}
            />
          </React.Fragment>)
        }
      </Container>
    </Animated>
  );

}

BackupsPage.propTypes = {
  backups: PropTypes.array,
  restoreDb: PropTypes.func,
  getBackups: PropTypes.func,
  isError: PropTypes.bool,
  message: PropTypes.string,
  showPopup: PropTypes.bool,
  displayPopup: PropTypes.func,
  isLoading: PropTypes.bool,
};

export const Backups = connect(
  mapStateToProps,
  mapDispatchToProps
)(BackupsPage);
