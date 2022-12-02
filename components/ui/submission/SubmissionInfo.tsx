import React, { FC } from 'react'
import { ISubmission } from '@interfaces'
import { Information } from '@components/ui/sections'

interface Props {
    submission: ISubmission;
}

export const SubmissionInfo: FC<Props> = ({ submission }) => {
    const { patient, symptoms } = submission

    return (
        <>
            <div className='flex text-sm'>
                <Information label='Email address' classNames='w-1/2'>
                    {patient.email}
                </Information>

                <Information label='Phone number' classNames='w-1/2'>
                    {patient.info?.phone}
                </Information>
            </div>

            <Information label='Other info' classNames='mt-6'>
                {patient.info?.info}
            </Information>

            <Information label='Symptoms' classNames='mt-6'>
                {symptoms}
            </Information>
        </>
    )
}
