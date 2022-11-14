import React from 'react'
import { Badge, BadgeType } from '../../../components/ui/badges'
import { Link } from '../../../components/ui/buttons'
import { IColumn, IRow, Table } from '../../../components/ui/tables'

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

const rows: IRow[] = [
  // {
  //   id: 1,
  //   submissionTitle: 'Submission 1',
  //   patientName: 'Gianfranco Rocco',
  //   createdAt: '2022-10-10',
  //   status: 'pending',
  // },
  // {
  //   id: 2,
  //   submissionTitle: 'Submission 2',
  //   patientName: 'Gianfranco Rocco',
  //   createdAt: '2022-10-12',
  //   status: 'pending',
  // },
]

const SubmissionsPage = () => {
  return (
    <Table columns={columns} rows={rows} />
  )
}

export default SubmissionsPage