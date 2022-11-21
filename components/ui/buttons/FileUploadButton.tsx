import React, { FC, useRef } from 'react'
import { ButtonSecondary } from './ButtonSecondary'

interface Props {
    label: string;
    disabled?: boolean;
    file?: any;
    handleFileUpload?: React.ChangeEventHandler<HTMLInputElement>;
}

export const FileUploadButton: FC<Props> = ({ disabled, handleFileUpload }) => {
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

            <span className={`${disabled ? 'text-gray-300' : 'text-gray-800'}`}>No file chosen</span>
        </div>
    )
}
