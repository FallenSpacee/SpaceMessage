'use client';

// next
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
// react
import {FC, useEffect, useMemo, useState} from 'react';
// hooks
import useConversation from '@/app/hooks/useConversation';
// components
import ConversationBox from '../ConversationBox';
import GroupChatModal from '../GroupChatModal';
// libraries
import {pusherClient} from '@/app/libs/pusher';
import {find} from 'lodash';
import clsx from 'clsx';
// icons
import {MdOutlineGroupAdd} from 'react-icons/md';
// types
import {FullConversationType} from '@/app/types';
import {ConversationListProps} from './types';
import SearchInput from '@/app/components/SearchInput';
import useSearch from '@/app/hooks/UseSearch';
import filterItems from './helpers';

const ConversationList: FC<ConversationListProps> = ({initialItems, users}) => {
  const session = useSession();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');

  const {conversationId, isOpen} = useConversation();

  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, {id: conversation.id})) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        });
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((currentConversation) => currentConversation.id !== conversation.id)];
      });

      if (conversation.id === conversationId) {
        router.push('/conversations');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind(pusherKey);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  const filteredItems = useMemo(() => filterItems(items, searchValue), [items, searchValue]);

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `
    fixed 
    inset-y-0 
    pb-20
    lg:pb-0
    lg:left-20 
    lg:w-80 
    lg:block
    overflow-y-auto 
    border-r 
    bg-[#B19CD9]
    border-gray-200 
  `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5 flex flex-col gap-y-2">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-white">Messages</div>
            <div onClick={() => setIsModalOpen(true)}>
              <MdOutlineGroupAdd
                size={50}
                className="
            rounded-full
            p-2
            bg-gray-100
            text-gray-600
            cursor-pointer
            hover:opacity-75
            transition
            "
              />
            </div>
          </div>
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {/* ... */}
          {filteredItems.map((item) => (
            <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
