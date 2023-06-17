// types
import {User} from '@prisma/client';

export interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}
