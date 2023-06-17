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
// types

const Body: FC<BodyProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
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
