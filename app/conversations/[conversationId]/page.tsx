//actions
import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
// components
import EmptyState from '@/app/components/EmptyState';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
// types
import {IParams} from '../types';

const ConversationId = async ({params}: {params: IParams}) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col mx-2">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className=" h-full flex flex-col mx-2">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
