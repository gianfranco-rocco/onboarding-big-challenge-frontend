import React, { FC } from 'react'

interface Props {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const ButtonPrimary: FC<Props> = ({ type = 'button', children, className, onClick, disabled }) => {
  return (
    <button
      type={type}
      className={`flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className} ${disabled ? 'bg-gray-100 text-gray-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
