import React, { FC } from 'react'

interface Props {
    label: string;
    children: React.ReactNode;
    classNames?: string;
}

export const Information: FC<Props> = ({ label, children, classNames = '' }) => {
  return (
    <div className={`text-sm ${classNames}`}>
        <label className='text-gray-500'>{label}</label>
        <p className='mt-1 text-gray-900'>{children}</p>
    </div>
  )
}
