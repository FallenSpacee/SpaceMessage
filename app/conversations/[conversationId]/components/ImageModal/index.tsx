'use client';

// next
import Image from 'next/image';
// react
import {FC} from 'react';
// components
import Modal from '@/app/components/Modal';
// types
import {ImageModalProps} from './types';

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
