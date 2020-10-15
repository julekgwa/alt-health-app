import React, {
  useState
} from 'react';

// use props to override default properties
export const useInput = props => {

  const [value, setValue] = useState((props && props.value) || '');

  props && delete props.value;

  const input = (
    <input
      placeholder='Add task'
      className='task-input'
      type='text'
      id='task'
      value={value}
      onChange={e => setValue(e.target.value)}
      {...props}
    />
  );

  return [value, input, setValue];

};
