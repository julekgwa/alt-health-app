import {
  SET_CLIENT_INFO
} from 'app/constants';

import {
  fetchAPI
} from 'app/fetch/fetch';

import {
  cleanErrors
} from 'app/utils';

import {
  setError
} from './index';

const dispatcher = (dispatch, type, payload) => dispatch({
  type,
  payload,
});

export const fetchItem = (dispatch, requestOptions, isLoading, action) => {

  dispatcher(dispatch, action.loaderType, isLoading);

  return fetchAPI(requestOptions)
    .then(res => {

      dispatcher(dispatch, action.loaderType, !isLoading);

      dispatcher(dispatch, action.type, res.result);

      if (requestOptions.isClientInfo) {

        dispatcher(dispatch, SET_CLIENT_INFO, res.result);

      }

      dispatcher(dispatch, action.success || 'default', true);

    })
    .catch(error => {

      dispatch(setError(action.error, {
        error: true,
        message: cleanErrors(error),
      }));
      dispatcher(dispatch, action.loaderType, !isLoading);

    });

};