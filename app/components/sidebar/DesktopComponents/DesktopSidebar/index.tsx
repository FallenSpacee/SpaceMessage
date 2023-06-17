'use client';

// react
import {FC, useState} from 'react';
// hooks
import useRoutes from '@/app/hooks/useRoutes';
// components
import Avatar from '@/app/components/Avatar';
import DesktopItem from '../DesktopItem';
import SettingsModal from '@/app/components/sidebar/SettingsModal';
// types
import {DesktopSidebarProps} from './types';

const DesktopSidebar: FC<DesktopSidebarProps> = ({currentUser}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overfow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="space-y-1 flex flex-col items-center">
            {routes.map((route) => (
              <DesktopItem
                key={route.label}
                href={route.href}
                label={route.label}
                icon={route.icon}
                active={route.active}
                onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
