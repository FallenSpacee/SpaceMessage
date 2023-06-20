'use client';

// react
import {FC, useEffect, useRef, useState} from 'react';
// hooks
import useConversation from '@/app/hooks/useConversation';
import useSearch from '@/app/hooks/UseSearch';
// components
import MessageBox from '../MessageBox';
import SearchInput from '@/app/components/SearchInput';
// libraries
import axios from 'axios';
import {BodyProps} from './types';
import {pusherClient} from '@/app/libs/pusher';
import {find} from 'lodash';
// icons
import {HiOutlineSearch} from 'react-icons/hi';
// types
import {FullMessageType} from '@/app/types';

const Body: FC<BodyProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, {id: message.id})) {
          return current;
        }

        return [...current, message];
      });

      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId]);

  const [isOpen, setIsOpen] = useState(false);

  // Initialize useSearch for filtering messages based on body
  const {searchValue, setSearchValue, filteredItems} = useSearch(messages, 'body', 'startsWith', 500);
  return (
    <div
      className="flex-1 overflow-y-auto bg-purple-100 mx-[-1rem] pl-2"
      style={{backgroundImage: 'url(/images/ChatBG.jpg)'}}
    >
      <div className="flex justify-end absolute top-0 right-12 max-sm:w-40 max-sm:text-[11px]">
        <div className="w-80 mr-4 mt-4">
          <div className="flex justify-end">
            <HiOutlineSearch
              className="w-6 h-6 mt-2 mr-2 text-purple-500 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div className={`transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'hidden'}`}>
              <SearchInput
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search a message"
              />
            </div>
          </div>
        </div>
      </div>
      {filteredItems.map((message, i) => (
        <MessageBox isLast={i === filteredItems.length - 1} key={message.id} data={message} />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
