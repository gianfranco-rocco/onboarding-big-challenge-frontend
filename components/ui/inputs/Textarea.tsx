import React, { FC, useEffect, useState } from 'react'
import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { formErrors } from '@utils'
import { FieldError, FieldErrorIcon } from '@components/ui/error'
import { ApiError } from '@components/ui/forms'

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}

interface Props {
    label: string;
    name: string;
    form?: UseFormReturn<FieldValues, any>,
    validations?: RegisterOptions;
    apiErrors?: ApiError;
}

export const Textarea: FC<Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const {
    label,
    name,
    form,
    validations,
    apiErrors,
    ...rest
  } = props

  const id = label.split(' ').join('-').toLowerCase()

  const { register, formState } = form!

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage(formErrors.getMessage(name, formState, apiErrors))
  }, [formState, apiErrors, name])

  return (
    <div className='w-full'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-900'>
        {label}
      </label>
      <div className='mt-1'>
        <div className='relative'>
          <textarea
            id={id}
            className={
                            classNames(
                              errorMessage ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500',
                              'block w-full rounded-md shadow-sm sm:text-sm'
                            )
                        }
            {...register(name, validations)}
            {...rest}
          />
          {errorMessage && <FieldErrorIcon position='right-0 bottom-2.5' />}
        </div>
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </div>
    </div>
  )
}
