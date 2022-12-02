'use client'

import React, { FC, useRef } from 'react'
import { ButtonSecondary } from '@components/ui/buttons'

interface Props {
    fileName?: string;
    disabled?: boolean;
    handleFileUpload?: React.ChangeEventHandler<HTMLInputElement>;
}

export const FileUploadButton: FC<Props> = ({ fileName, disabled, handleFileUpload }) => {
    const fileInput: React.LegacyRef<HTMLInputElement> = useRef(null)
    
    return (
        <div className='flex gap-2 items-center mt-1'>
            <div>
                <ButtonSecondary 
                    className='w-max' 
                    disabled={disabled} 
                    onClick={() => fileInput.current?.click()}
                >
                    Choose file
                </ButtonSecondary>

                <input type="file" className='hidden' ref={fileInput} onChange={handleFileUpload} />
            </div>

            <span className={`${disabled ? 'text-gray-300' : 'text-gray-800'}`}>{fileName || 'No file chosen'}</span>
        </div>
    )
}
