import {
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

const middleware = [thunk];

const mockStore = configureStore(middleware);

import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  Report
} from 'app/pages/reports';

const sliderImages = [
  {
    slider1: Medicine2,
    slider2: Medicine3,
  },
  {
    slider1: Medicine1,
    slider2: Medicine4,
  }
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    report: 'birthdays',
  }),
  useRouteMatch: () => ({
    url: '/report/birthdays',
  }),
}));

describe('Reports', () => {

  it('should render without crashing', () => {

    const initState = {
      isActive: false,
      sliderIndex: 0,
      sliderImages: sliderImages,
      isLoading: false,
      data: [],
      tableHeadersAndAccessors: [],
      showPopup: false,
    };

    const store = mockStore(initState);

    fetch.mockResponseOnce(JSON.stringify([{
      title: 'fake',
      id: 'anotherFake',
      status: false,
      dueDate: 'fakeFake',
    }]));

    render(<Provider store={store}><Router><Report isError={false} isLoading={true} getInfo={jest.fn()} data={[]} /></Router></Provider>);

  });

  it('should show loading spinner', () => {

    const initState = {
      isActive: false,
      sliderIndex: 0,
      sliderImages: sliderImages,
      isLoading: true,
      data: [],
      tableHeadersAndAccessors: [],
      showPopup: false,
    };

    const store = mockStore(initState);

    fetch.mockResponseOnce(
      JSON.stringify([
        {
          title: 'fake',
          id: 'anotherFake',
          status: false,
          dueDate: 'fakeFake',
        }
      ])
    );

    const { getByTestId, } = render(
      <Provider store={store}>
        <Router>
          <Report getInfo={jest.fn()} displayPopup={jest.fn()} />
        </Router>
      </Provider>
    );

    getByTestId('loader');

  });

  it('should show popup', () => {

    const initState = {
      isActive: false,
      sliderIndex: 0,
      sliderImages: sliderImages,
      isLoading: false,
      data: [],
      tableHeadersAndAccessors: [],
      isError: true,
      message: 'something went wrong',
      showPopup: true,
    };

    const store = mockStore(initState);

    fetch.mockResponseOnce(
      JSON.stringify([
        {
          title: 'fake',
          id: 'anotherFake',
          status: false,
          dueDate: 'fakeFake',
        }
      ])
    );

    const { queryByText, queryByRole, getByRole, } = render(
      <Provider store={store}>
        <Router>
          <Report getInfo={jest.fn()} displayPopup={jest.fn()} />
        </Router>
      </Provider>
    );

    expect(queryByText(/something went wrong/i)).toBeTruthy();
    expect(queryByText(/ok/i)).toBeTruthy();
    expect(queryByRole('button')).toBeTruthy();

    const button = getByRole('button');

    fireEvent.click(button);

  });

  it('should show table', () => {

    const initState = {
      isActive: false,
      sliderIndex: 0,
      sliderImages: sliderImages,
      isLoading: false,
      message: 'something went wrong',
      showPopup: true,
      data: [
        {
          title: 'fake',
          id: 'anotherFake',
          status: false,
          dueDate: 'fakeFake',
        },
        {
          title: '1fake',
          id: '1anotherFake',
          status: false,
          dueDate: '1fakeFake',
        },
        {
          title: '2fake',
          id: '2anotherFake',
          status: false,
          dueDate: '2fakeFake',
        }
      ],
      tableHeadersAndAccessors: [
        {
          Header: 'Title',
          accessor: 'title',
        },
        {
          Header: 'Id',
          accessor: 'id',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'DueDate',
          accessor: 'dueDate',
        }
      ],
      isError: false,
    };

    const store = mockStore(initState);

    fetch.mockResponseOnce(
      JSON.stringify([
        {
          title: 'fake',
          id: 'anotherFake',
          status: false,
          dueDate: 'fakeFake',
        }
      ])
    );

    const { getByTestId, } = render(
      <Provider store={store}>
        <Router>
          <Report getInfo={jest.fn()} pageSize={1} displayPopup={jest.fn()} />
        </Router>
      </Provider>
    );

    const prevBtn = getByTestId('prev');
    const nextBtn = getByTestId('next');

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

  });

});
