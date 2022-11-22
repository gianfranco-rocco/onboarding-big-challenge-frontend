import React, { FC } from 'react'

interface Props {
    label: string;
    name: string;
    rows?: number;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
}

export const Textarea: FC<Props> = ({ 
    label, 
    name,
    rows = 4,
    defaultValue,  
    placeholder, 
    required, 
    disabled,
    autoFocus,
}) => {
    const id = label.split(' ').join('-').toLowerCase();

    return (
        <div className='w-full'>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-1">
                <textarea
                    rows={rows}
                    name={name}
                    id={id}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={defaultValue}
                    required={required}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}
  
