'use client'

import React, { useState, useEffect } from 'react'
import { Badge } from '@components/ui/badges'
import { Link } from '@components/ui/buttons'
import { IColumn, IPagination, IRow, Table } from '@components/ui/tables'
import { badge, paths } from '@utils'
import { ISubmission } from '@interfaces'
import { useMySubmissions } from '@hooks'

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
  const [rows, setRows] = useState<IRow[]>([])
  const [pagination, setPagination] = useState<IPagination>()
  const [page, setPage] = useState(1)

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

  if (!pagination) {
    return <></>
  }

  return (
    <Table
      columns={columns}
      rows={rows}
      pagination={pagination}
      setPage={setPage}
    />
  )
}

export default TaskHistoryPage
