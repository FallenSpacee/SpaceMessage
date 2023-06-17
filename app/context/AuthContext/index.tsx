'use client';

// next
import {SessionProvider} from 'next-auth/react';
// types
import {AuthContextProps} from './types';

export const AuthContext = ({children}: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
