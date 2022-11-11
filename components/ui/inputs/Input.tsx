import React, { FC } from 'react'

interface Props {
    label: string;
    type: string;
    name: string;
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
}

export const Input: FC<Props> = ({ label, type, name, autoComplete, placeholder, required }) => {
    const id = label.split(' ').join('-').toLowerCase();

    return (
        <>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                placeholder={placeholder}
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
        </>
    )
}
