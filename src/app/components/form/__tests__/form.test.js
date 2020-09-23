import {
  act,
  cleanup,
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import configureStore from 'redux-mock-store';

import {
  CartForm
} from 'app/components/form/cartForm';

const initState = {
  tasks: [],
  task: {},
  isUpdatingTask: false,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  reminderTasks: [],
  updatedId: '',
};

afterEach(cleanup);

const mockStore = configureStore();
const store = mockStore(initState);

describe('Add Task form', () => {

  let getByPlaceholderText;

  let queryByTestId;

  let queryByPlaceholderText;

  let getByLabelText;

  let getByText;

  let getByTestId;

  let onCloseButton = jest.fn();

  let onOkButton = jest.fn();

  beforeEach(() => {

    ({
      getByPlaceholderText,
      queryByTestId,
      queryByPlaceholderText,
      getByLabelText,
      getByText,
      getByTestId,
    } = render(
      <Provider store={store}>
        <CartForm
          onOkButton={onOkButton}
          onCloseButton={onCloseButton}
          show={true}
        />
      </Provider>
    ));

  });

  it('renders correctly', () => {

    const { container, } = render(<CartForm />);

    expect(container.firstChild).toBeNull();

  });

  describe('Add new task form', () => {

    it('should render the form', () => {

      expect(getByLabelText(/task/i)).toBeTruthy();
      // this is the custom hook useInput()
      expect(queryByPlaceholderText(/add task/i)).toBeTruthy();

      expect(getByLabelText(/due date/i)).toBeTruthy();
      expect(queryByTestId('mockedDateField')).toBeTruthy();

      expect(queryByTestId('close-button')).toBeTruthy();
      expect(queryByTestId('add-button')).toBeTruthy();
      expect(getByText(/close/i)).toBeTruthy();
      expect(getByText(/add task/i)).toBeTruthy();

    });

  });

  describe('Loader', () => {

    it('should show a Loader when isLoading is true', () => {

      const { queryByTestId, } = render(<Provider store={store}>
        <CartForm show={true} isLoading={true} />
      </Provider>);

      expect(queryByTestId('loader')).toBeTruthy();

    });

  });

  describe('Add new task input field', () => {

    it('should update text value on change', () => {

      const addTaskInput = getByPlaceholderText(/add task/i);

      fireEvent.change(addTaskInput, {
        target: {
          value: 'todo',
        },
      });

      expect(addTaskInput.value).toBe('todo');

    });

  });

  describe('Close button', () => {

    it('should close the form', () => {

      const closeButton = getByTestId('close-button');

      fireEvent.click(closeButton);

      expect(onCloseButton).toHaveBeenCalled();

    });

  });

  describe('Close button with keydown event', () => {

    it('should close the form using keydown', () => {

      fireEvent.keyDown(getByTestId('close-button'), {
        key: 'Enter',
        keyCode: 13,
      });

      expect(onCloseButton).toHaveBeenCalledTimes(2);

    });

  });

  describe('Add task button', () => {

    it('should not add task when input is empty', () => {

      fireEvent.click(getByTestId('add-button'));
      expect(onOkButton).not.toHaveBeenCalled();

    });

    it('should add task when input is not empty', () => {

      const addTaskInput = getByPlaceholderText(/add task/i);

      fireEvent.change(addTaskInput, {
        target: {
          value: 'todo',
        },
      });

      fireEvent.click(getByTestId('add-button'));

      expect(onOkButton).toHaveBeenCalled();

    });

    it('should handle keydown event', () => {

      const addTaskInput = getByPlaceholderText(/add task/i);

      fireEvent.change(addTaskInput, {
        target: {
          value: 'keydown',
        },
      });

      fireEvent.keyDown(getByTestId('add-button'), {
        key: 'Enter',
        keyCode: 13,
      });

      expect(onOkButton).toHaveBeenCalledTimes(2);

    });

  });

});

describe('Default functions', () => {

  it('should not crash when prop functions are not provided', () => {

    const { getByTestId, getByPlaceholderText, } = render(<Provider store={store}>
      <CartForm show={true} isLoading={false} />
    </Provider>);

    const addTaskInput = getByPlaceholderText(/add task/i);

    const closeButton = getByTestId('close-button');
    const addButton = getByTestId('add-button');

    act(() => {

      fireEvent.change(addTaskInput, {
        target: {
          value: 'should not break',
        },
      });

    });

    fireEvent.click(addButton);
    fireEvent.click(closeButton);

  });

});
