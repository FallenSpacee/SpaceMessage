// types
import {FieldErrors, UseFormRegister, FieldValues} from 'react-hook-form';

export interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
}
