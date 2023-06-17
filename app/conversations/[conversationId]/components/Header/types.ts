// types
import {Conversation, User} from '@prisma/client';

export interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
