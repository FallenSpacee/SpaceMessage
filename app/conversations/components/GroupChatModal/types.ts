// types
import {User} from '@prisma/client';

export interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}
