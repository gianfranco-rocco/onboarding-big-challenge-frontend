import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React, { FC, useState, useEffect } from 'react'
import { UseFormRegister, FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form';

export type SelectOption = {
    id: number | string,
    name: number | string,
    placeholder?: string
}

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    leadingAddOn?: React.ReactNode;
    selectOptions?: SelectOption[];
    form?: UseFormReturn<FieldValues, any>,
    validations?: RegisterOptions;
}

const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ')
}

export const Input: FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const {
        label, 
        name,
        placeholder: propPlaceholder, 
        leadingAddOn,
        selectOptions,
        form,
        validations,
        ...rest
    } = props;

    const { register, formState: { errors } } = form!

    const fieldErrors = (errors && name) ? errors[name] : {}

    const hasErrors = fieldErrors && Object.keys(fieldErrors).length > 0

    const registerField = (name: string): UseFormRegister<FieldValues> | {} => {
        return register ? {...register(name, validations)} : {}
    }

    const id = label.split(' ').join('-').toLowerCase();
    const errorId = `${id}-error`;

    const [placeholder, setPlaceholder] = useState('')
    const [selected, setSelected] = useState<number | string>(selectOptions?.length ? selectOptions[0].id : '')

    useEffect(() => {
        const option = selectOptions?.find((option: SelectOption) => option.id === selected)

        setPlaceholder(option?.placeholder || propPlaceholder || '')
    }, [selected])

    return (
        <div className='w-full'>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className={
                classNames(
                    (leadingAddOn || selectOptions?.length) ? 'flex' : '',
                    'mt-1 rounded-md shadow-sm'
                )
            }>
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
                            {...registerField(`${name}-select`)}
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            {selectOptions.map((option: SelectOption) => <option key={option.id} value={option.id}>{option.name}</option>)}
                        </select>
                    </div>
                }
                <div className='relative'>
                    <input
                        id={id}
                        placeholder={placeholder}
                        className={
                            classNames(
                                (selectOptions?.length || leadingAddOn) ? 'border-l-0 rounded-r-md' : 'rounded-md',
                                hasErrors ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500',
                                `block w-full sm:text-sm border-gray-300`
                            )
                        }
                        aria-describedby={errorId}
                        {...registerField(name)}
                        {...rest}
                    />
                    {
                        hasErrors && 
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    }
                </div>
                {fieldErrors?.message && <p className="mt-2 text-sm text-red-600" id={errorId}>{fieldErrors.message as string}</p>}
            </div>
        </div>
    )
} 
