// types
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';

export interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
