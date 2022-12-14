'use client'

import { FC } from 'react'
import { RadioGroup as HeroIconsRadioGroup } from '@headlessui/react'
import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form'

export interface IRadioOption {
  id: string | number;
  name: string;
  description?: string;
}

interface Props {
  label: string;
  name: string;
  subLabel?: string;
  options: IRadioOption[];
  form?: UseFormReturn<FieldValues, any>,
  validations?: RegisterOptions;
}

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}

export const RadioGroup: FC<Props> = ({
  label,
  name,
  subLabel,
  options,
  form,
  validations
}) => {
  const id = label.split(' ').join('-').toLowerCase()
  const errorId = `${id}-error`

  const { register, formState: { errors }, getValues, setValue } = form!

  const fieldErrors = (errors && name) ? errors[name] : {}

  const hasErrors = fieldErrors && Object.keys(fieldErrors).length > 0

  return (
    <div>
      <label className='text-sm font-medium text-gray-900'>{label}</label>
      <p className='text-xs leading-5 text-gray-500'>{subLabel}</p>
      <HeroIconsRadioGroup
        {...register(name, validations)}
        className='mt-1'
        onChange={(e: IRadioOption) => setValue(name, e.id, { shouldValidate: true })}
        defaultValue={getValues(name)}
      >
        <HeroIconsRadioGroup.Label className='sr-only'>{label}</HeroIconsRadioGroup.Label>
        <div className='-space-x-px bg-white grid sm:grid-cols-2 grid-cols-1'>
          {options.map((option, index) => (
            <HeroIconsRadioGroup.Option
              key={option.name}
              value={option}
              className={({ checked }) =>
                classNames(
                  index === 0 ? 'rounded-l-md' : '',
                  index === options.length - 1 ? 'rounded-r-md' : '',
                  hasErrors
                    ? 'border-red-300 text-red-900 focus:border-red-500 focus:outline-none focus:ring-red-500'
                    : checked
                      ? 'bg-indigo-50 border-indigo-200 z-10'
                      : 'border-gray-200',
                  'relative border p-4 flex cursor-pointer focus:outline-none'
                )}
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      hasErrors
                        ? 'border-red-300'
                        : checked
                          ? 'bg-indigo-600 border-transparent'
                          : 'bg-white border-gray-300',
                      active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                      'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                    )}
                    aria-hidden='true'
                  >
                    <span className='rounded-full bg-white w-1.5 h-1.5' />
                  </span>
                  <span className='ml-3 flex flex-col'>
                    <HeroIconsRadioGroup.Label
                      as='span'
                      className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium')}
                    >
                      {option.name}
                    </HeroIconsRadioGroup.Label>
                    <HeroIconsRadioGroup.Description
                      as='span'
                      className={classNames(checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm')}
                    >
                      {option.description}
                    </HeroIconsRadioGroup.Description>
                  </span>
                </>
              )}
            </HeroIconsRadioGroup.Option>
          ))}
        </div>
      </HeroIconsRadioGroup>
      {fieldErrors?.message && <p className='mt-2 text-sm text-red-600' id={errorId}>{fieldErrors.message as string}</p>}
    </div>
  )
}
