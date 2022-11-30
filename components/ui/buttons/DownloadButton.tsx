import React, { FC } from 'react'
import { PaperClipIcon } from '@heroicons/react/24/outline';
interface Props {
    fileName: string;
    classNames?: string;
    handleDownload: () => void;
}

export const DownloadButton: FC<Props> = ({ fileName, classNames = '', handleDownload }) => {
    return (
        <div className={`p-3 rounded-md flex justify-between border ${classNames}`}>
            <div className='flex gap-2 items-center'>
                <PaperClipIcon className='text-gray-400 h-5 w-5' />
                <p className='text-sm text-gray-900'>{fileName}</p>
            </div>

            <button 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                onClick={handleDownload}
            >
                Download
            </button>
        </div>
    )
}
