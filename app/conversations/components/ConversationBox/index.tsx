'use client';

// next
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
// react
import {FC, useCallback, useMemo} from 'react';
// hooks
import useOtherUser from '@/app/hooks/useOtherUser';
// components
import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
// libraries
import {format} from 'date-fns';
import clsx from 'clsx';
// types
import {ConversationBoxProps} from './types';

const ConversationBox: FC<ConversationBoxProps> = ({data, selected}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'p-2 w-full relative flex items-center space-x-3 bg-purple-200 hover:bg-purple-300 rounded-lg transition cursor-pointer',
        selected ? 'bg-purple-300' : 'bg-purple-200'
      )}
    >
      {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}
      <div className="min-w-0 flex-1">
        <div className="flex justify-between items-center mb-1 ">
          <p className="text-md font-medium text-gray-900">{data.name || otherUser.name}</p>
          {lastMessage?.createdAt && (
            <p className="text-xs text-gray-400 font-light">{format(new Date(lastMessage.createdAt), 'p')}</p>
          )}
        </div>
        <p className={clsx('text-sm truncate', hasSeen ? 'text-gray-500' : 'text-black font-medium ')}>
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

export default ConversationBox;
