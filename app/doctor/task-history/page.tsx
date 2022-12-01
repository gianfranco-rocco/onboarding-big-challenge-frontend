'use client'

import React from 'react'
import { Badge } from '../../../components/ui/badges'
import { Link } from '../../../components/ui/buttons'
import { IColumn, IPagination, IRow, Table } from '../../../components/ui/tables'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { badge } from '../../../utils'
import paths from '../../../utils/paths'
import { ISubmission } from '../../../interfaces'
import { useMySubmissions } from '../../../hooks'

const { doctor } = paths

const columns: IColumn[] = [
  { field: 'submissionTitle', name: 'submission title', className: 'font-bold' },
  { field: 'patientName', name: 'patient name', className: 'font-bold' }, 
  { field: 'createdAt', name: 'created at' }, 
  { 
    field: 'status', 
    name: 'status',
    renderCell: (row: IRow) => <Badge type={badge.typeBasedOnStatus(row.status)} className='capitalize'>{row.status.replace('_', ' ')}</Badge>
  },
  { 
    field: 'view', 
    renderCell: (row: IRow) => <Link href={doctor.submission.replace(':id', row.id)}>View more</Link>
  }
]

const TaskHistoryPage = () => {
  const { get: params } = useSearchParams()
  const router = useRouter()

  const page = Number(params('page') || 1)

  const [rows, setRows] = useState<IRow[]>([])
  const [pagination, setPagination] = useState<IPagination>()

  useEffect(() => {
    const getSubmissions = async () => {
      const { data, links, meta } = await useMySubmissions(page)

      setRows(data.map(({ id, title, patient, created_at, status }: ISubmission) => ({
        id,
        submissionTitle: title,
        patientName: patient.name,
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
  
  const handlePagination = (page: number) => {
    router.push(`${doctor.taskHistory}?page=${page}`)
  }

  if (!pagination) {
    return <></>
  }

  return (
    <Table 
      columns={columns} 
      rows={rows} 
      pagination={pagination} 
      handlePagination={handlePagination} 
    />
  )
}

export default TaskHistoryPage