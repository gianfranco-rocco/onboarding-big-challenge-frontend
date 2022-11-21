import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
    href: string;
}

export const GoBackButton: FC<Props> = ({ href }) => {
    return (
        <Link href={href}>
            <ArrowLeftIcon className='h-5 w-5 mb-4' />
        </Link>
    )
}
