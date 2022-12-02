import React, { FC } from 'react'
import { SubmissionStatus } from '@types'
import { badge } from '@utils'
import { Badge } from '@components/ui/badges'

interface Props {
    status: SubmissionStatus;
    children: React.ReactNode;
}

export const SubmissionTitle: FC<Props> = ({ status, children }) => {
  return (
    <>
      <h1 className='text-lg'>{children}</h1>
      <Badge type={badge.typeBasedOnStatus(status)} className='capitalize'>{status.replace('_', ' ')}</Badge>
    </>
  )
}
