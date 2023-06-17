// types
import {FullConversationType} from '@/app/types';
import {Conversation, User} from '@prisma/client';

export interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}
