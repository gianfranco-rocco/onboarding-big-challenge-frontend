'use client'

import React from 'react'
import { Badge } from '../../../components/ui/badges'
import { Link } from '../../../components/ui/buttons'
import { IColumn, IPagination, IRow, Table } from '../../../components/ui/tables'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { badge } from '../../../utils'
import { ISelectOption, Select } from '../../../components/ui/inputs'
import paths from '../../../utils/paths'
import { useMySubmissions } from '../../../hooks/useMySubmissions';
import { ISubmission } from '../../../interfaces/submission';

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
  { id: 'done', name: 'Done' },
]

const SubmissionsPage = () => {
  const { get: params } = useSearchParams()
  const router = useRouter()

  const page = Number(params('page') || 1)

  const [rows, setRows] = useState<IRow[]>([])
  const [pagination, setPagination] = useState<IPagination>()

  useEffect(() => {
    const getSubmissions = async () => {
      const { data, links, meta } = await useMySubmissions(page)

      setRows(data.map(({id, title, doctor, created_at, status }: ISubmission) => ({
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
  }, [page])

  const handleSubmissionStatusChange = (selected: ISelectOption) => {

  }
  
  const handlePagination = (page: number) => {
    router.push(`${patient.home}?page=${page}`)
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
        handlePagination={handlePagination} 
      />
    </>
  )
}

export default SubmissionsPage