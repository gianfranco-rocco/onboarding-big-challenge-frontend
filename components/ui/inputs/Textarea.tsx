import React, { FC } from 'react'
import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { FieldError, FieldErrorIcon } from '../error';

const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ')
}

interface Props {
    label: string;
    name: string;
    form?: UseFormReturn<FieldValues, any>,
    validations?: RegisterOptions;
}

export const Textarea: FC<Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
    const { 
        label, 
        name,
        form,
        validations,
        ...rest
    } = props

    const id = label.split(' ').join('-').toLowerCase();

    const errorId = `${id}-error`

    const {
        register,
        formState: { errors }
    } = form!

    const fieldErrors = (errors && name) ? errors[name] : {}

    const hasErrors = fieldErrors && Object.keys(fieldErrors).length > 0

    return (
        <div className='w-full'>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-1">
                <div className="relative">
                    <textarea
                        id={id}
                        className={
                            classNames(
                                hasErrors ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500',
                                'block w-full rounded-md shadow-sm sm:text-sm'
                            )
                        }
                        {...register(name, validations)}
                        {...rest}
                    />
                    {hasErrors && <FieldErrorIcon position='right-0 bottom-2.5' />}
                </div>
                <FieldError id={id} fieldErrors={fieldErrors} />
            </div>
        </div>
    )
}
  
