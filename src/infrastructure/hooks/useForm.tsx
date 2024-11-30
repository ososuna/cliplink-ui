import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {

  const [state, setState] = useState( initState );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof T) => {
    const value = event.target.value;
    setState({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};