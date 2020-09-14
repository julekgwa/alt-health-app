import {
  fetchAPI
} from 'app/fetch/fetch';

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

      dispatcher(dispatch, action.success || 'default', true);

    })
    .catch(error => {

      dispatch(setError(action.error, {
        error: true,
        message: error.message,
      }));
      dispatcher(dispatch, action.loaderType, !isLoading);

    });

};