'use client'

import React, { FC, useEffect, useState } from 'react'
import { ISubmission } from '../../../../interfaces';
import { SubmissionInfo, SubmissionSubtitle, SubmissionTitle } from '../../../../components/ui/submission';
import { ToastAlert } from '../../../../components/ui/alerts';
import { GoBackButton, ButtonPrimary, FileUploadButton, DownloadButton } from '../../../../components/ui/buttons';
import { PageTitle } from '../../../../components/ui/pages';
import paths from '../../../../utils/paths';
import { useSubmission } from '../../../../hooks';
import { api } from '../../../../api';
import { api as apiUtils } from '../../../../utils';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { config } from '../../../../utils/toast';
import { SubmissionStatus } from '../../../../types';
interface Props {
    params: { id: string }
}

const SubmissionPage: FC<Props> = ({ params }) => {
    const [submission, setSubmission] = useState<ISubmission>()
    const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState<SubmissionStatus>('pending')
    const [prescription, setPrescription] = useState(null)

    useEffect(() => {
        const getSubmission = async () => {
            const submission = await useSubmission(Number(params.id))
      
            setSubmission(submission)

            setStatus(submission.status)

            setShowAlert(submission.status === 'pending')
          }
      
          getSubmission()
    }, [status])
    
    if (!submission) {
        return <></>
    }

    const {
        title,
        patient,
        created_at
    } = submission

    const { doctor } = paths

    const isPending = status === 'pending'
    const isInProgress = status === 'in_progress'
    const isDone = status === 'done'

    const handlePrescriptionUpload = () => {

    }

    const handleAcceptSubmission = async () => {
        try {
            await api.post(`/submissions/${submission.id}/assignments`, undefined, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
                }
            })

            setStatus('in_progress')

            toast.success('Submission accepted successfully.', config)
        } catch (err) {
            toast.error(apiUtils.getErrorMessage(err), config)
        }
    }

    const handleFinishSubmission = async () => {
        try {
            await api.post(`/finish/${submission.id}`, undefined, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
                }
            })

            setStatus('done')

            toast.success('Prescription submitted successfully.', config)
        } catch (err) {
            toast.error(apiUtils.getErrorMessage(err), config)
        }
    }

    return (
        <>
            <GoBackButton href={submission.status === 'pending' ? doctor.home : doctor.taskHistory} />

            <PageTitle
                title={<SubmissionTitle status={status}>{title}</SubmissionTitle>}
                subtitle={<SubmissionSubtitle user={patient.name} createdAt={created_at} />}
                button={
                    !isDone && 
                    <ButtonPrimary
                        onClick={isPending ? handleAcceptSubmission : handleFinishSubmission}
                        disabled={isInProgress && !prescription}
                    >
                        {isPending ? 'Accept submission' : 'Finish submission'}
                    </ButtonPrimary>
                }
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

            {isPending && <ToastAlert show={showAlert} setShow={setShowAlert} type='primary' classNames='mt-6'>Accept this submission to add a prescription</ToastAlert>}
        </>
    )
}

export default SubmissionPage