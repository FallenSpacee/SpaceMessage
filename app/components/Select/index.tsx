// next
import Image from 'next/image';
// react
import {FC} from 'react';
// libraries
import ReactSelect from 'react-select';
// images
import AvatarImage from '../../../public/images/avatar.jpg';
// types
import {SelectProps, OptionsType} from './types';

const Select: FC<SelectProps> = ({label, value, onChange, options, disabled}) => {
  const formatOptionLabel = ({label, image}: OptionsType) => (
    <div className="flex items-center">
      {image ? (
        <div className="w-6 h-6 mr-3">
          <Image className="rounded-full" src={image} alt={label} width={20} height={20} />
        </div>
      ) : (
        <div className="w-6 h-6 mr-3">
          <Image className="rounded-full" src={AvatarImage} alt="Default Avatar" width={20} height={20} />
        </div>
      )}
      <div>{label}</div>
    </div>
  );

  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900 bg-">{label}</label>
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
          formatOptionLabel={formatOptionLabel}
          getOptionLabel={(option: OptionsType) => option.label}
        />
      </div>
    </div>
  );
};

export default Select;
