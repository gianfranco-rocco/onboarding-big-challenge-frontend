import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, NoSymbolIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

type ToastType = 'error' | 'success' | 'primary' | 'secondary'

interface Props {
  type: ToastType;
  children: React.ReactNode;
  canBeHidden?: boolean;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  classNames?: string;
}

const getIcon = (type: ToastType): JSX.Element => {
  switch (type) {
    case 'error':
      return <ExclamationTriangleIcon className='h-6 w-6' />
    case 'success':
      return <CheckCircleIcon className='h-6 w-6' />
    case 'primary':
      return <InformationCircleIcon className='h-6 w-6' />
    case 'secondary':
    default:
      return <NoSymbolIcon className='h-6 w-6' />
  }
}

const getClassNames = (type: ToastType): string => {
  switch (type) {
    case 'error':
      return 'bg-red-100 text-red-800'
    case 'success':
      return 'bg-green-100 text-green-800'
    case 'primary':
      return 'bg-blue-100 text-blue-800'
    case 'secondary':
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const ToastAlert: FC<Props> = ({ type, children, canBeHidden, show, setShow, classNames = '' }) => {
  if (show !== undefined && !show) return null

  return (
    <div className={`p-4 rounded-md flex justify-between ${getClassNames(type)} ${classNames}`}>
      <div className='flex gap-2 items-center'>
        {getIcon(type)}
        <p className='text-sm'>{children}</p>
      </div>
      {canBeHidden &&
        <button onClick={canBeHidden && setShow ? () => setShow(false) : undefined}>
          <XMarkIcon className='h-6 w-6' />
        </button>}
    </div>
  )
}
