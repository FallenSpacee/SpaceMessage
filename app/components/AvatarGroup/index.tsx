'use client';

import {User} from '@prisma/client';
import Image from 'next/image';
import {FC} from 'react';
import AvatarImage from 'public/images/Avatar.jpg';

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: FC<AvatarGroupProps> = ({users = []}) => {
  // TODO check this feature
  // const getRandomUsers = (array: any[], count: number) => {
  //   const shuffled = array.sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, count);
  // };

  // const slicedUsers = getRandomUsers(users, 3);

  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: 'top-0 right-[12px]',
    1: 'bottom-0 ',
    2: 'bottom-0 left-[23px]',
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image alt="Avatar" fill src={user.image || AvatarImage} />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
