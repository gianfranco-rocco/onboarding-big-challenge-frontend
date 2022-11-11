import React, { FC } from 'react'

interface Props {
  type: 'submit' | 'button';
  children: React.ReactNode;
  className?: string;
}

export const ButtonPrimary: FC<Props> = ({ type, children, className }) => {
  return (
    <button
        type={type}
        className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
        {children}
    </button>
  )
}
