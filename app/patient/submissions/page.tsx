'use client'

import React, { useState, useEffect } from 'react'
import { Badge } from '@components/ui/badges'
import { Link } from '@components/ui/buttons'
import { IColumn, IPagination, IRow, Table } from '@components/ui/tables'
import { badge, paths } from '@utils'
import { ISelectOption, Select } from '@components/ui/inputs'
import { useMySubmissions } from '@hooks'
import { ISubmission } from '@interfaces'
import { SubmissionStatus } from '@types';

const { patient } = paths

const columns: IColumn[] = [
  { field: 'submissionTitle', name: 'submission title', className: 'font-bold' },
  { field: 'doctorAssigned', name: 'doctor assigned', className: 'font-bold' },
  { field: 'createdAt', name: 'created at' },
  {
    field: 'status',
    name: 'status',
    renderCell: (row: IRow) => <Badge type={badge.typeBasedOnStatus(row.status)} className='capitalize'>{row.status.replace('_', ' ')}</Badge>
  },
  {
    field: 'view',
    renderCell: (row: IRow) => <Link href={patient.submission.replace(':id', row.id)}>View more</Link>
  }
]

const submissionStatuses: ISelectOption[] = [
  { id: '', name: 'All submissions' },
  { id: 'pending', name: 'Pending' },
  { id: 'in_progress', name: 'In progress' },
  { id: 'done', name: 'Done' }
]

const SubmissionsPage = () => {
  const [rows, setRows] = useState<IRow[]>([])
  const [pagination, setPagination] = useState<IPagination>()
  const [status, setStatus] = useState<SubmissionStatus>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getSubmissions = async () => {
      const { data, links, meta } = await useMySubmissions(page, status)

      setRows(data.map(({ id, title, doctor, created_at, status }: ISubmission) => ({
        id,
        submissionTitle: title,
        doctorAssigned: doctor?.name,
        createdAt: created_at,
        status
      })))

      setPagination({
        links,
        meta
      })
    }

    getSubmissions()
  }, [page, status])

  const handleSubmissionStatusChange = (selected: ISelectOption) => {
    setStatus(selected.id as SubmissionStatus)
  }

  if (!pagination) {
    return <></>
  }

  return (
    <>
      <div className='flex justify-end'>
        <div className='sm:w-64 w-full'>
          <Select options={submissionStatuses} handleChange={handleSubmissionStatusChange} />
        </div>
      </div>

      <Table
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPage={setPage}
      />
    </>
  )
}

export default SubmissionsPage
