'use client';
// next
import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
// react
import {FC, useCallback, useEffect, useState} from 'react';
// components
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import AuthSocialButton from '../AuthSocialButton';
// libraries
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-hot-toast';
// icons
import {BsGithub, BsGoogle} from 'react-icons/bs';
// types
import {LoginVariants} from './types';

const AuthForm: FC = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<LoginVariants>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {...data, redirect: false})
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials');
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Logged in successfully');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Something went wrong');
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in successfully');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
	 	mt-8
		sm:mx-auto 
		sm:w-full 
		sm:max-w-md 
	  "
    >
      <div
        className="
		bg-[#B19CD9]
		px-4
		py-8
		shadow
		sm:rounded-md
		sm:px-10
		"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />
          )}
          <Input
            id="email"
            type="email"
            label="Email address"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 rounded-full">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-6">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => {
                socialAction('github');
              }}
            />

            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => {
                socialAction('google');
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          {variant === 'LOGIN' ? 'New to Messenger? ' : 'Already have an account? '}
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
