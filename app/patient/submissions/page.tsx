'use client'

import React from 'react'
import { Badge } from '../../../components/ui/badges'
import { Link } from '../../../components/ui/buttons'
import { IColumn, IPagination, IRow, Table } from '../../../components/ui/tables'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { badge } from '../../../utils'
import { ISelectOption, Select } from '../../../components/ui/inputs'

const columns: IColumn[] = [
  { field: 'submissionTitle', name: 'submission title', className: 'font-bold' },
  { field: 'doctorAssigned', name: 'doctor assigned', className: 'font-bold' }, 
  { field: 'createdAt', name: 'created at' }, 
  { 
    field: 'status', 
    name: 'status',
    renderCell: (row: IRow) => <Badge type={badge.typeBasedOnStatus(row.status)} className='capitalize'>{row.status}</Badge>
  },
  { 
    field: 'view', 
    renderCell: (row: IRow) => <Link href={`/patient/submissions/${row.id}`}>View more</Link>
  }
]

const submissionStatuses: ISelectOption[] = [
  {
    id: '',
    name: 'All submissions'
  },
  {
    id: 'pending',
    name: 'Pending'
  },
  {
    id: 'in_progress',
    name: 'In progress'
  },
  {
    id: 'done',
    name: 'Done'
  },
]

const SubmissionsPage = () => {
  const { get: params } = useSearchParams()

  const router = useRouter()

  const [rows, setRows] = useState<IRow[]>([
    {
      id: 1,
      submissionTitle: 'Submission 1',
      doctorAssigned: 'Gianfranco Rocco',
      createdAt: '2022-10-10',
      status: 'pending',
    },
    {
      id: 2,
      submissionTitle: 'Submission 2',
      doctorAssigned: 'Gianfranco Rocco',
      createdAt: '2022-10-12',
      status: 'pending',
    },
  ])

  const currentPage = Number(params('page') || 1)

  const [pagination, setPagination] = useState<IPagination>({
    count: 2,
    total: 330,
    perPage: 15,
    currentPage: 1,
    totalPages: 8,
    links: {
      previous: 'asd',
      next: 'asd'
    }
  })

  useEffect(() => {
    setPagination(curr => ({
      ...curr,
      currentPage
    }))
  }, [currentPage])

  const handleSubmissionStatusChange = (selected: ISelectOption) => {
    console.log('selected', selected)
  }
  
  const handlePagination = (page: number) => {
    router.push(`/patient/submissions?page=${page}`)
  }

  return (
    <>
      <div className='flex justify-end'>
        <div className='sm:w-64 w-full'>
          <Select options={submissionStatuses} handleChange={handleSubmissionStatusChange} />
        </div>
      </div>
    
      <Table columns={columns} rows={rows} pagination={pagination} handlePagination={handlePagination} />
    </>
  )
}

export default SubmissionsPage