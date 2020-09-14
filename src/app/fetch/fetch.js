const validateResponse = (response) => {

  if (typeof response === 'object') {

    return response;

  }

  try {

    const { message, error, } = JSON.parse(response);

    return Promise.reject(new Error(message || error));

  } catch (err) {

    return Promise.reject(new Error(response));

  }

};

export const fetchAPI = (options) => {

  options.headers = {
    'Content-Type': 'application/json',
  };

  return fetch(options.url, options)
    .then(response => {

      if(response.status !== 200) {

        return response.text();

      }

      return response;

    })
    .then(validateResponse)
    .then(response => response.json());

};