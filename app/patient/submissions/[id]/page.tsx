'use client'

import React, { useEffect, useState } from 'react'
import { ISubmission } from '../../../../interfaces';
import { SubmissionInfo, SubmissionSubtitle, SubmissionTitle } from '../../../../components/ui/submission';
import { ToastAlert } from '../../../../components/ui/alerts';
import { GoBackButton, DownloadButton } from '../../../../components/ui/buttons';
import { PageTitle } from '../../../../components/ui/pages';
import paths from '../../../../utils/paths';
import { useDownloadPrescription, useSubmission } from '../../../../hooks';
import { NextPage } from 'next';

interface Props {
    params: { id: string }
}

const SubmissionPage: NextPage<Props> = ({ params }: Props) => {
    const [submission, setSubmission] = useState<ISubmission>()

    useEffect(() => {
        const getSubmission = async () => {
            const submission = await useSubmission(Number(params.id))
      
            setSubmission(submission)
          }
      
          getSubmission()
    }, [])
    
    if (!submission) {
        return <></>
    }

    const {
        title,
        status,
        doctor,
        created_at
    } = submission

    const handlePrescriptionDownload = () => {
        useDownloadPrescription(submission.id)
    }

    return (
        <>
            <GoBackButton href={paths.patient.home} />

            <PageTitle
                title={<SubmissionTitle status={status}>{title}</SubmissionTitle>}
                subtitle={<SubmissionSubtitle user={doctor?.name} createdAt={created_at} />}
            />

            <SubmissionInfo submission={submission} />

            <div className='text-sm mt-6'>
                <label className='text-gray-500'>Prescription</label>
                {
                    status === 'done' 
                    ? <DownloadButton fileName={submission.prescription!} handleDownload={handlePrescriptionDownload} /> 
                    : <ToastAlert type='secondary' classNames="mt-2">No prescription has been added yet</ToastAlert>
                }
            </div>

        </>
    )
}

export default SubmissionPage