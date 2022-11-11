import React, { FC } from 'react'

interface Props {
    name: string;
    label: string;
}

export const Checkbox: FC<Props> = ({ name, label}) => {
    const id = label.split(' ').join('-').toLowerCase();

    return (
        <div className="flex items-center">
            <input
                id={id}
                name={name}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
                {label}
            </label>
        </div>
    )
}
