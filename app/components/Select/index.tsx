'use client';

// react
import {FC} from 'react';
// libraries
import ReactSelect from 'react-select';
// types
import {SelectProps} from './types';

// TODO функионал с картинкой
const Select: FC<SelectProps> = ({label, value, onChange, options, disabled}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{menuPortal: (base) => ({...base, zIndex: 9999})}}
          classNames={{
            control: () => 'text-sm',
          }}
        />
      </div>
    </div>
  );
};

export default Select;
