import React, { FC } from 'react'

interface Props {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    button?: React.ReactNode;
}

export const PageTitle: FC<Props> = ({ title, subtitle, button }) => {
  return (
    <>
        <div className='flex flex-row justify-between'> 
            <div>
                <div className='flex gap-2 mb-1'>{title}</div>
                {subtitle && <div className='flex gap-1 text-sm text-gray-500'>{subtitle}</div>}
            </div>

            {button && <div className='flex items-center'>{button}</div>}
        </div>

        <hr className='my-6' />
    </>
  )
}
