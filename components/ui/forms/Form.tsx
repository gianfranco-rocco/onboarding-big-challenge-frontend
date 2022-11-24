'use client'

import Image from 'next/image';
import React, { FC } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

interface Props {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    classNames?: string;
    onSubmit: SubmitHandler<FieldValues>;
}

export const Form: FC<Props> = ({ title, subtitle, children, classNames = '', onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <>
            {
                title && 
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <Image
                        className="mx-auto"
                        src="https://lightit.io/images/Logo_purple.svg"
                        alt="Light-it"
                        width={120}
                        height={36}
                    />
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                    {subtitle && <h3 className='text-sm mt-4'>{subtitle}</h3>}
                </div>
            }

            <div className={`mt-8 ${classNames}`}>
                <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {React.Children.map(children, (child) => {
                            if (React.isValidElement(child) && child.props.name) {
                                return React.createElement(child.type, {
                                    ...{
                                        ...child.props,
                                        register: register,
                                        key: child.props.name,
                                        errors
                                    }
                                })
                            }
                            return child;
                        })}
                    </form>
                </div>
            </div>
        </>
    )
}
