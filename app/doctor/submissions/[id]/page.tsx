import { NextPage } from 'next';
import React from 'react'

interface Props {
    params: { id: string };
}

const SubmissionPage: NextPage<Props> = ({ params }) => {
    return (
        <div>SubmissionPage</div>
    )
}

export default SubmissionPage