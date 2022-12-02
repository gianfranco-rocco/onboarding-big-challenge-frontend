import React, { FC } from 'react'

interface Props {
    children: React.ReactNode;
}

export const MainContent: FC<Props> = ({ children }) => {
  return (
    <main className='flex-1'>
      <div className='w-full h-full px-4 sm:px-6 md:px-8 py-6'>
        {children}
      </div>
    </main>
  )
}
