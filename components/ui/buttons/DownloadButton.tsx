import { PaperClipIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react'
import { Link } from './Link';

interface Props {
    fileName: string;
    fileUrl: string;
    classNames?: string;
}

export const DownloadButton: FC<Props> = ({ fileName, fileUrl, classNames = '' }) => {
    return (
        <div className={`p-3 rounded-md flex justify-between border ${classNames}`}>
            <div className='flex gap-2 items-center'>
                <PaperClipIcon className='text-gray-400 h-5 w-5' />
                <p className='text-sm text-gray-900'>{fileName}</p>
            </div>

            <Link href={fileUrl} target="_blank" download>Download</Link>
        </div>
    )
}
