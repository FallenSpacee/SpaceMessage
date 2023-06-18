'use client';

// next
import Link from 'next/link';
// react
import {FC, useMemo, useState} from 'react';
// hooks
import useOtherUser from '@/app/hooks/useOtherUser';
import useActiveList from '@/app/hooks/useActiveList';
// components
import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import ProfileDrawer from '../ProfileDrawer';
// icons
import {HiChevronLeft} from 'react-icons/hi';
import {HiEllipsisHorizontal} from 'react-icons/hi2';
// types
import {HeaderProps} from './types';

const Header: FC<HeaderProps> = ({conversation}) => {
  const otherUser = useOtherUser(conversation);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const {members} = useActiveList();

  const isActive = members.indexOf(otherUser.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Online' : 'Offline';
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div
        className="
    bg-white 
    w-full
    border-b-[1px]
    sm:px-4
    px-4
    py-3
    lg:px-6
    flex
    justify-between
    items-center
    shadow-sm
    "
      >
        <div className="flex gap-3 items-center">
          <Link href="/conversations" className="lg:hidden block text-sky-500 hover:text-sky-600 cursor-pointer">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <Avatar user={otherUser} />}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
        />
      </div>
    </>
  );
};

export default Header;
