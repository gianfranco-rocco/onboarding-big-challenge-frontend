'use client'

import React from 'react'
import { Badge } from '../../../components/ui/badges'
import { Link } from '../../../components/ui/buttons'
import { IColumn, IPagination, IRow, Table } from '../../../components/ui/tables'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { badge } from '../../../utils'
import paths from '../../../utils/paths'

const { doctor } = paths

const columns: IColumn[] = [
  { field: 'submissionTitle', name: 'submission title', className: 'font-bold' },
  { field: 'patientName', name: 'patient name', className: 'font-bold' }, 
  { field: 'createdAt', name: 'created at' }, 
  { 
    field: 'status', 
    name: 'status',
    renderCell: (row: IRow) => <Badge type={badge.typeBasedOnStatus(row.status)} className='capitalize'>{row.status}</Badge>
  },
  { 
    field: 'view', 
    renderCell: (row: IRow) => <Link href={doctor.submission.replace(':id', row.id)}>View more</Link>
  }
]

const SubmissionsPage = () => {
  const { get: params } = useSearchParams()
  const router = useRouter()

  const [rows, setRows] = useState<IRow[]>([
    {
      id: 1,
      submissionTitle: 'Submission 1',
      patientName: 'Gianfranco Rocco',
      createdAt: '2022-10-10',
      status: 'pending',
    },
    {
      id: 2,
      submissionTitle: 'Submission 2',
      patientName: 'Gianfranco Rocco',
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
  
  const handlePagination = (page: number) => {
    router.push(`${doctor.home}?page=${page}`)
  }

  return <Table columns={columns} rows={rows} pagination={pagination} handlePagination={handlePagination} />
}

export default SubmissionsPage