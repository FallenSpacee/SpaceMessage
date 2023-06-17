'use client';

// react
import {FC} from 'react';
// libraries
import clsx from 'clsx';
// types
import {ButtonProps} from './types';

const Button: FC<ButtonProps> = ({type, fullWidth, children, onClick, secondary, danger, disabled}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        'flex justify-center rounded-md px-3 py-2  text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-700 focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-blue-500 hover:bg-blue-700 focus-visible:outline-blue-600'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
