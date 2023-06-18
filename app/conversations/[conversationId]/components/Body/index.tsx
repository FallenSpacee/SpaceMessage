'use client';

// react
import {FC, useEffect, useRef, useState} from 'react';
// hooks
import useConversation from '@/app/hooks/useConversation';
// components
import MessageBox from '../MessageBox';
// libraries
import axios from 'axios';
import {BodyProps} from './types';
import {pusherClient} from '@/app/libs/pusher';
import {find} from 'lodash';
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

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
