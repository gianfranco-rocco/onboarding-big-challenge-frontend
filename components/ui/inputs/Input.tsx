import React, { FC } from 'react'

interface Props {
    label: string;
    type: string;
    name: string;
    defaultValue?: string;
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
}

export const Input: FC<Props> = ({ 
    label, 
    type, 
    name, 
    defaultValue, 
    autoComplete, 
    placeholder, 
    required, 
    disabled,
    autoFocus,
}) => {
    const id = label.split(' ').join('-').toLowerCase();

    return (
        <div className='w-full'>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                id={id}
                name={name}
                type={type}
                defaultValue={defaultValue}
                autoComplete={autoComplete}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
        </div>
    )
}
