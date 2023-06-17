// types
import {Conversation, User} from '@prisma/client';

export interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}
