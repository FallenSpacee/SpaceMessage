// types
import {GroupBase, PropsValue} from 'react-select';

export interface SelectProps {
  label: string;
  value?: PropsValue<string | any>;
  onChange: (value: Record<string, any>) => void;
  options: (OptionsType | GroupBase<OptionsType>)[];
  disabled?: boolean;
}

export interface OptionsType {
  label: string;
  image: string;
}
