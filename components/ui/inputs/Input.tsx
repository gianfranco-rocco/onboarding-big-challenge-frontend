import React, { FC, useState } from 'react'
import { useEffect } from 'react';

export type SelectOption = {
    id: number | string,
    name: number | string,
    placeholder?: string
}

interface Props {
    label: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    defaultValue?: string;
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    leadingAddOn?: React.ReactNode;
    selectOptions?: SelectOption[];
}

const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ')
}

export const Input: FC<Props> = ({ 
    label, 
    type = 'text',
    name, 
    defaultValue, 
    autoComplete, 
    placeholder: propPlaceholder, 
    required, 
    disabled,
    autoFocus,
    leadingAddOn,
    selectOptions,
}) => {
    const id = label.split(' ').join('-').toLowerCase();

    const [placeholder, setPlaceholder] = useState('')
    const [selected, setSelected] = useState<number | string>(selectOptions?.length ? selectOptions[0].id : '')

    useEffect(() => {
        const option = selectOptions?.find(option => option.id === selected)

        setPlaceholder(option?.placeholder || propPlaceholder || '')
    }, [selected])
    

    return (
        <div className='w-full'>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="flex mt-1 rounded-md shadow-sm">
                {
                    leadingAddOn &&
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                        {leadingAddOn}
                    </span>
                }
                {
                    selectOptions?.length && 
                    <div className="inset-y-0 left-0 flex items-center">
                        <select
                            className="h-full rounded-l-md border-t-gray-300 border-l-gray-300 border-b-gray-300 border-r-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue={selected}
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            {selectOptions.map((option: SelectOption) => <option key={option.id} value={option.id}>{option.name}</option>)}
                        </select>
                    </div>
                }
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
                    className={
                        classNames(
                            (selectOptions?.length || leadingAddOn) ? 'border-l-0 rounded-r-md' : 'rounded-md',
                            `block w-full focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-gray-300`
                        )
                    }
                />
            </div>
        </div>
    )
} 
