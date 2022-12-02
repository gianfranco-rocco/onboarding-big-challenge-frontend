'use client'

import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { ISubmission } from '../../../../interfaces';
import { SubmissionInfo, SubmissionSubtitle, SubmissionTitle } from '../../../../components/ui/submission';
import { ToastAlert } from '../../../../components/ui/alerts';
import { GoBackButton, ButtonPrimary, FileUploadButton, DownloadButton } from '../../../../components/ui/buttons';
import { PageTitle } from '../../../../components/ui/pages';
import paths from '../../../../utils/paths';
import { useDownloadPrescription, useSubmission } from '../../../../hooks';
import { api } from '../../../../api';
import { api as apiUtils } from '../../../../utils';
import { toast } from 'react-toastify';
import { config, position, updateConfig } from '../../../../utils/toast';
import { SubmissionStatus } from '../../../../types';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../../context/auth';
import axios from 'axios';
interface Props {
    params: { id: string }
}

const SubmissionPage: FC<Props> = ({ params }) => {
    const router = useRouter()

    const { user } = useContext(AuthContext)

    const [submission, setSubmission] = useState<ISubmission>()
    const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState<SubmissionStatus>('pending')
    const [prescription, setPrescription] = useState<File>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getSubmission = async () => {
            try {
                const submission = await useSubmission(Number(params.id))

                const isPending = submission.status === 'pending'

                if (!isPending && submission.doctor!.id !== user!.id) {
                    return router.replace(paths.doctor.home)
                }

                setSubmission(submission)
    
                setStatus(submission.status)
    
                setShowAlert(isPending)
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        return router.replace(paths.doctor.home)
                    }
                }
            }
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

    const handlePrescriptionUpload = (data: ChangeEvent<HTMLInputElement>) => {
        const files = data.target.files

        if (!files?.length) return null

        if (files.length > 1) toast.error('Only 1 (one) prescription can be submitted.', config)

        setPrescription(files[0])
    }

    const handleAcceptSubmission = async () => {
        try {
            await api.post(`/submissions/${submission.id}/assignments`)

            setStatus('in_progress')

            toast.success('Submission accepted successfully.', config)
        } catch (err) {
            toast.error(apiUtils.getErrorMessage(err), config)
        }
    }

    const handleFinishSubmission = async () => {
        setLoading(true)

        const toastId = toast.loading('Submitting prescription, please wait...', {
            position
        })

        const toastOptions = updateConfig

        try {
            const formData = new FormData()
            formData.append('uploadedFile', prescription!)

            await api.post(`/upload/${submission.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            await api.post(`/finish/${submission.id}`)

            setStatus('done')

            toastOptions.type = 'success'
            toastOptions.render = 'Prescription submitted successfully.'
        } catch (err) {
            toastOptions.type = 'error'
            toastOptions.render = apiUtils.getErrorMessage(err)
        }

        toast.update(toastId, toastOptions)

        setLoading(false)
    }

    const handlePrescriptionDownload = () => {
        useDownloadPrescription(submission.id)
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
                        disabled={(isInProgress && !prescription) || loading}
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
                    ? <DownloadButton fileName={submission.prescription!} handleDownload={handlePrescriptionDownload} /> 
                    : <FileUploadButton fileName={prescription?.name} disabled={isPending} handleFileUpload={handlePrescriptionUpload} />
                }
            </div>

            {isPending && <ToastAlert show={showAlert} setShow={setShowAlert} type='primary' classNames='mt-6'>Accept this submission to add a prescription</ToastAlert>}
        </>
    )
}

export default SubmissionPage