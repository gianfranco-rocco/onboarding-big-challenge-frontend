import React, { FC } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
    position?: string;
}

export const FieldErrorIcon: FC<Props> = ({ position = 'inset-y-0 right-0' }) => {
  return (
    <div className={`pointer-events-none absolute flex items-center pr-3 ${position}`}>
        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
    </div>
  )
}
