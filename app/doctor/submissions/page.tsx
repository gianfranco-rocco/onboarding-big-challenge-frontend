'use client'

import React from 'react'
import { Badge, BadgeType } from '../../../components/ui/badges'
import { Link } from '../../../components/ui/buttons'
import { IColumn, IPagination, IRow, Table } from '../../../components/ui/tables'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'

const badgeTypeBasedOnStatus = (status: string): BadgeType => {
  switch(status) {
    case 'pending':
      return 'primary'
    case 'in-progress':
      return 'success'
    case 'done':
    default:
      return 'normal'
  }
}

const columns: IColumn[] = [
  { field: 'submissionTitle', name: 'submission title', className: 'font-bold' },
  { field: 'patientName', name: 'patient name', className: 'font-bold' }, 
  { field: 'createdAt', name: 'created at' }, 
  { 
    field: 'status', 
    name: 'status',
    renderCell: (row: IRow) => <Badge type={badgeTypeBasedOnStatus(row.status)} className='capitalize'>{row.status}</Badge>
  },
  { 
    field: 'edit', 
    renderCell: (row: IRow) => <Link href={`/doctor/submissions/${row.id}`}>View</Link>
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
    router.push(`/doctor/submissions?page=${page}`)
  }

  return <Table columns={columns} rows={rows} pagination={pagination} handlePagination={handlePagination} />
}

export default SubmissionsPage