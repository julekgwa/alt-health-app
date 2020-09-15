const { TECHNICAL_ERROR_MSG, } = require('app/constants');

const { capitalize, cleanTableHeader, createHeaders, cleanErrors, handleKeyDown, } = require('../index');

describe('capitilize', () => {

  it('should convert string to lowercase',() => {

    const str = capitalize('TEST', true);

    expect(str).toBe('Test');

  });

});

describe('cleanHeader', () => {

  it('should return undefined when no value is provided',() => {

    expect(cleanTableHeader()).toBeUndefined();

  });

});

describe('createHeaders', () => {

  it('should return undefined when no value is provided',() => {

    expect(createHeaders()).toBeUndefined();

  });

});

describe('cleanErrors', () => {

  it('should return technical error message',() => {

    expect(cleanErrors()).toBe(TECHNICAL_ERROR_MSG);

  });

  it('should return technical error message when network request fails', () => {

    expect(cleanErrors({
      message: 'failed to fetch',
    })).toBe(TECHNICAL_ERROR_MSG);

  });

});

describe('handleKeyDown', () => {

  it('should run function when enter key is pressed', () => {

    const func = jest.fn();

    handleKeyDown({
      keyCode: 13,
    }, func);

    expect(func).toHaveBeenCalled();

  });

  it('should not run the function when pressed key is not an enter key', () => {

    const func = jest.fn();

    handleKeyDown({
      keyCode: 14,
    }, func);

    expect(func).not.toHaveBeenCalled();

  });

});