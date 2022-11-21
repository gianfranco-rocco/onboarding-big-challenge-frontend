'use client'

import React, { FC, useState } from 'react'
import { ISubmission } from '../../../../interfaces';
import { SubmissionInfo, SubmissionSubtitle, SubmissionTitle } from '../../../../components/ui/submission';
import { ToastAlert } from '../../../../components/ui/alerts';
import { GoBackButton, ButtonPrimary, FileUploadButton, DownloadButton } from '../../../../components/ui/buttons';
import { PageTitle } from '../../../../components/ui/pages';

const getSubmission = (id: number): ISubmission => ({
    id,
    title: 'Hepatic infarction',
    symptoms: 'Stomach and abdominal pain, cramps and fever',
    status: 'in_progress',
    doctor: null,
    patient: {
        id: 3,
        name: 'Theresa Webb',
        email: 'theresawebb@example.com',
        info: {
            weight: '2',
            height: '170',
            info: 'Partial excision (craterization, saucerization, or diaphysectomy) bone (eg, osteomyelitis); proximal or middle phalanx of finger',
            phone: '(406) 555-0121'
        },
        roles: [
            {
                name: 'patient'
            }
        ]
    },
    created_at: '3/2/22'
})

interface Props {
    params: { id: string }
}

const SubmissionPage: FC<Props> = ({ params }) => {
    const submission = getSubmission(Number(params.id))

    const {
        title,
        status,
        patient,
        created_at
    } = submission
    const [prescription, setPrescription] = useState(null)

    const isPending = status === 'pending'
    const isDone = status === 'done'

    const [showAlert, setShowAlert] = useState(isPending)

    const handlePrescriptionUpload = () => {

    }

    return (
        <>
            <GoBackButton href={submission.status === 'pending' ? '/doctor/submissions' : '/doctor/task-history'} />

            <PageTitle
                title={<SubmissionTitle status={status}>{title}</SubmissionTitle>}
                subtitle={<SubmissionSubtitle user={patient.name} createdAt={created_at} />}
                button={!isDone && <ButtonPrimary>{isPending ? 'Accept submission' : 'Finish submission'}</ButtonPrimary>}
            />

            <SubmissionInfo submission={submission} />

            <div className='text-sm mt-6'>
                <label className='text-gray-500'>Prescription</label>
                {
                    isDone 
                    ? <DownloadButton fileName='Test.txt' fileUrl='https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg' /> 
                    : <FileUploadButton label='Prescription' disabled={isPending} handleFileUpload={handlePrescriptionUpload} />
                }
            </div>

            {isPending && <ToastAlert show={showAlert} setShow={setShowAlert} type='primary'>Accept this submission to add a prescription</ToastAlert>}
        </>
    )
}

export default SubmissionPage