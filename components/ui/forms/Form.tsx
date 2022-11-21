import Image from 'next/image';
import React, { FC } from 'react'

interface Props {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
}

export const Form: FC<Props> = ({ title, subtitle, children }) => {
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

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6">
                        {children}
                    </form>
                </div>
            </div>
        </>
    )
}
