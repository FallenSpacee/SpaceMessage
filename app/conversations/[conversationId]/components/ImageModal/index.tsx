'use client';

import Modal from '@/app/components/modals';
import {FC} from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: FC<ImageModalProps> = ({isOpen, onClose, src}) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[40rem]">
        <Image src={src} alt="image" fill className="  object-contain" />
      </div>
    </Modal>
  );
};

export default ImageModal;
