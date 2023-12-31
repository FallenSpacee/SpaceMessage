// next
import {usePathname} from 'next/navigation';
import {signOut} from 'next-auth/react';
// react
import {useMemo} from 'react';
// hooks
import useConversation from './useConversation';
// icons
import {HiChat} from 'react-icons/hi';
import {HiArrowLeftOnRectangle, HiUsers} from 'react-icons/hi2';

const useRoutes = () => {
  const pathname = usePathname();
  const {conversationId} = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
