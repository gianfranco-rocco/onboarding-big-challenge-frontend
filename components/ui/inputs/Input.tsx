'use client'

import React, { FC, useState, useEffect, HTMLInputTypeAttribute } from 'react'
import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { formErrors } from '@utils'
import { FieldError, FieldErrorIcon } from '@components/ui/error'
import { ApiError } from '@components/ui/forms'

export type SelectOption = {
  id: number | string,
  name: number | string,
  placeholder?: string
}

interface Props {
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  leadingAddOn?: React.ReactNode;
  selectOptions?: SelectOption[];
  form?: UseFormReturn<FieldValues, any>,
  validations?: RegisterOptions;
  apiErrors?: ApiError;
  hidden?: boolean;
  match?: string;
  noMatchMessage?: string;
  disabled?: boolean;
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
    hidden,
    match,
    noMatchMessage = "Fields don't match",
    disabled,
    ...rest
  } = props

  const { register, formState, getValues } = form!

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage(formErrors.getMessage(name, formState, apiErrors))
  }, [formState, apiErrors, name])

  const id = label?.split(' ').join('-').toLowerCase() || undefined

  if (match && validations) {
    validations.validate = {
      equals: value => (value === getValues(match)) || noMatchMessage
    }
  }

  const fieldRegistration = { ...register(name, validations) }

  const [placeholder, setPlaceholder] = useState('')
  const [selected, setSelected] = useState(selectOptions?.length ? selectOptions[0].id : '')

  useEffect(() => {
    const option = selectOptions?.find((option: SelectOption) => option.id === selected)

    setPlaceholder(option?.placeholder || propPlaceholder || '')
  }, [selected, propPlaceholder, selectOptions])

  return (
    <>
      {
        !hidden
          ? (
            <div className='w-full'>
              {label &&
                <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
                  {label}
                </label>}
              <div className={
                classNames(
                  (leadingAddOn || selectOptions?.length) ? 'flex' : '',
                  label ? 'mt-1' : '',
                  'rounded-md shadow-sm'
                )
              }
              >
                {
                  leadingAddOn &&
                    <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm'>
                      {leadingAddOn}
                    </span>
                }
                {
                  selectOptions?.length &&
                    <div className='flex items-center'>
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
                    disabled={disabled}
                    className={
                      classNames(
                        (selectOptions?.length || leadingAddOn) ? 'border-l-0 rounded-r-md' : 'rounded-md',
                        errorMessage ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500',
                        disabled ? 'disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500' : '',
                        'block w-full sm:text-sm border-gray-300'
                      )
                    }
                    {...fieldRegistration}
                    {...rest}
                  />
                  {errorMessage && <FieldErrorIcon />}
                </div>
              </div>
              {errorMessage && <FieldError>{errorMessage}</FieldError>}
            </div>
            )
          : <input type='hidden' hidden {...fieldRegistration} />
      }
    </>
  )
}
