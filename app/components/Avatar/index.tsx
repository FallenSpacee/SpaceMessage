'use client';

// next
import Image from 'next/image';
// react
import {FC} from 'react';
// icons
import AvatarIcon from 'public/images/Avatar.jpg';
// types
import {AvatarProps} from './types';
import useActiveList from '@/app/hooks/useActiveList';

const Avatar: FC<AvatarProps> = ({user}) => {
  const {members} = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-11 w-11 max-sm:h-8 max-sm:w-8">
        <Image alt="avatar" src={user?.image || AvatarIcon} fill />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 w-2 h-2 md:h-3 md:w-3" />
      )}
      {!isActive && (
        <span className="absolute block rounded-full bg-gray-500 ring-2 ring-white top-0 right-0 w-2 h-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;
