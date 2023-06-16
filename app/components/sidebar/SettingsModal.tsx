'use client';

import {User} from '@prisma/client';
import {FC, useState} from 'react';
import Modal from '../modals';
import {useRouter} from 'next/navigation';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../Inputs';
import Image from 'next/image';
import AvatarImage from 'public/images/Avatar.jpg';
import {CldUploadButton} from 'next-cloudinary';
import Button from '../Button';

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({currentUser, isOpen, onClose}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {shouldValidate: true});
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
        toast.success('Profile updated!');
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Edit your profile information</p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input disabled={isLoading} label="Name" id="name" register={register} errors={errors} required />
              <div>
                <label className="block text-sm font-medium text-gray-900 leading-6">Photo</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    className="rounded-full"
                    width="48"
                    height="48"
                    src={image || currentUser?.image || AvatarImage}
                    alt="Avatar"
                  />
                  <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset="f3z8lnwo">
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 ">
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
