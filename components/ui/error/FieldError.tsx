import React, { FC } from 'react'

interface Props {
    children: React.ReactNode;
}

export const FieldError: FC<Props> = ({ children }) => <p className='mt-2 text-sm text-red-600'>{children}</p>
