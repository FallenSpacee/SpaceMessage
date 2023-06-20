// react
import {FC} from 'react';
// types
import {SearchInputProps} from './types';

const SearchInput: FC<SearchInputProps> = ({type, value, onChange, placeholder}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input bg-purple-200 border border-gray-400  hover:border-purple-400 rounded-md px-4 py-2 mb-4 w-full  "
    />
  );
};

export default SearchInput;
