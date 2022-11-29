'use client'

import React, { FC, useState, useEffect, HTMLInputTypeAttribute } from 'react'
import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { formErrors } from '../../../utils';
import { FieldError, FieldErrorIcon } from '../error';
import { ApiError } from '../forms';

export type SelectOption = {
    id: number | string,
    name: number | string,
    placeholder?: string
}

interface Props {
    label: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    leadingAddOn?: React.ReactNode;
    selectOptions?: SelectOption[];
    form?: UseFormReturn<FieldValues, any>,
    validations?: RegisterOptions;
    apiErrors?: ApiError;
}

const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ')
}

export const Input: FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const {
        label, 
        name,
        type = 'text',
        placeholder: propPlaceholder, 
        leadingAddOn,
        selectOptions,
        form,
        validations,
        apiErrors,
        ...rest
    } = props;

    const { register, formState } = form!

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setErrorMessage(formErrors.getMessage(name, formState, apiErrors))
    }, [formState, apiErrors])

    const id = label.split(' ').join('-').toLowerCase();

    const [placeholder, setPlaceholder] = useState('')
    const [selected, setSelected] = useState(selectOptions?.length ? selectOptions[0].id : '')

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
                    <div className="flex items-center">
                        <select
                            className={
                                classNames(
                                    errorMessage ? 'border-red-300 border-r-0 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500' : 'border-gray-300 border-r-0 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500',
                                    'h-full rounded-l-md py-0 pl-3 pr-7 sm:text-sm'
                                )
                            }
                            defaultValue={selected}
                            {...register(`${name}-select`)}
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            {selectOptions.map((option: SelectOption) => <option key={option.id} value={option.id}>{option.name}</option>)}
                        </select>
                    </div>
                }
                <div className='relative w-full'>
                    <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        className={
                            classNames(
                                (selectOptions?.length || leadingAddOn) ? 'border-l-0 rounded-r-md' : 'rounded-md',
                                errorMessage ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500',
                                `block w-full sm:text-sm border-gray-300`
                            )
                        }
                        {...register(name, validations)}
                        {...rest}
                    />
                    {errorMessage && <FieldErrorIcon />}
                </div>
            </div>
            {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </div>
    )
} 
