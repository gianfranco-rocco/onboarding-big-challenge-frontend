import React, { FC } from 'react'
import { ISubmission } from '../../../../interfaces';
import { SubmissionInfo, SubmissionSubtitle, SubmissionTitle } from '../../../../components/ui/submission';
import { ToastAlert } from '../../../../components/ui/alerts';
import { GoBackButton, DownloadButton } from '../../../../components/ui/buttons';
import { PageTitle } from '../../../../components/ui/pages';

const getSubmission = (id: number): ISubmission => ({
    id,
    title: 'Hepatic infarction',
    symptoms: 'Stomach and abdominal pain, cramps and fever',
    status: 'done',
    doctor: {
        id: 3,
        name: 'Gianfranco rocco',
        email: 'theresawebb@example.com',
        roles: [
            {
                name: 'patient'
            }
        ]
    },
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
        doctor,
        created_at
    } = submission

    return (
        <>
            <GoBackButton href='/patient/submissions' />

            <PageTitle
                title={<SubmissionTitle status={status}>{title}</SubmissionTitle>}
                subtitle={<SubmissionSubtitle user={doctor?.name} createdAt={created_at} />}
            />

            <SubmissionInfo submission={submission} />

            <div className='text-sm mt-6'>
                <label className='text-gray-500'>Prescription</label>
                {
                    status === 'done' 
                    ? <DownloadButton classNames='mt-2' fileName='Test.txt' fileUrl='https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg' /> 
                    : <ToastAlert type='secondary' classNames="mt-2">No prescription has been added yet</ToastAlert>
                }
            </div>

        </>
    )
}

export default SubmissionPage