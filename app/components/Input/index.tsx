'use client';

// react
import {FC} from 'react';
// libraries
import clsx from 'clsx';
// types
import {InputProps} from './types';

const Input: FC<InputProps> = ({label, id, type, required, register, errors, disabled}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, {required})}
          className={clsx(
            'form-input bg-purple-200 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400  sm:text-sm sm:leading-6',
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
      </div>
    </div>
  );
};

export default Input;
