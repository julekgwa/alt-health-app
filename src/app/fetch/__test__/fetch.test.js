import {
  fetchAPI
} from 'app/fetch/fetch';

const options ={
  method: 'get',
  url: '/v1/todo/tasks',
};

beforeEach(() => {

  fetch.resetMocks();

});

describe('fetchApi', () => {

  it('should respond with valid response', () => {

    fetch.mockResponseOnce(JSON.stringify([{
      title: 'Test',
      id: '6767',
      status: false,
      dueDate: '989898988',
    }]));

    return fetchAPI(options)
      .then(res => {

        expect(res.length).toBeTruthy();

      });

  });

  it('should respond with json error response', () => {

    fetch.mockResponseOnce(JSON.stringify({
      message: 'Bad request',
    }), {
      status: 400,
    });

    return fetchAPI(options)
      .catch(error => {

        expect(error.message).toBe('Bad request');

      });

  });

  it('should handle json error response with error property', () => {

    fetch.mockResponseOnce(JSON.stringify({
      error: 'Bad request',
    }), {
      status: 400,
    });

    return fetchAPI(options)
      .catch(error => {

        expect(error.message).toBe('Bad request');

      });

  });

  it('should respond with string error response', () => {

    fetch.mockResponseOnce('Something went wrong', {
      status: 500,
    });

    return fetchAPI(options)
      .catch(error => {

        expect(error.message).toBe('Something went wrong');

      });

  });

});