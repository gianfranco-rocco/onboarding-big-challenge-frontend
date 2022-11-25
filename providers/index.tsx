'use client'

import axios from 'axios';
import { FC } from 'react';
import { SWRConfig } from 'swr';
import { AuthProvider } from '../context/auth';

const fetcher = (url: string) => axios.get(url).then(res => res.data)

interface Props {
    children: React.ReactNode;
}

export const Providers: FC<Props> = ({ children }) => (
    <SWRConfig 
      value={{
        fetcher
      }}
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </SWRConfig>
)
