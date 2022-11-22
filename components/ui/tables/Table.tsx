import { FC } from "react";
import { IHandlePagination, IPagination, Pagination } from "./Pagination";

export interface IRow {
    [key: string]: any;
}

export interface IColumn {
    field: string;
    name?: string;
    renderCell?: (rows: IRow) => React.ReactNode;
    className?: string;
}

interface Props {
    columns: IColumn[];
    rows: IRow[];
    noRowsText?: string;
    pagination?: IPagination;
    handlePagination: IHandlePagination;
}
  
export const Table: FC<Props> = ({ columns, rows, noRowsText, pagination, handlePagination }) => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full align-middle border rounded-lg">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns.map(column => (
                                            <th key={column.field} scope="col" className="p-3 text-left text-sm font-semibold text-gray-900">
                                                {column.name?.toUpperCase()}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {
                                        rows.length
                                        ? rows.map((row: IRow, index: number) => (
                                            <tr key={index} className={index % 2 === 0 ? undefined : 'bg-gray-50'}>
                                                {columns.map((column: IColumn) => (
                                                    <td key={column.field} className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${column.className || ''}`}>
                                                        {column?.renderCell ? column.renderCell(row) : row[column.field]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                        : (
                                            <tr>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{noRowsText || 'No results found'}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            {(pagination && pagination.count > 0) && <Pagination pagination={pagination} handlePagination={handlePagination} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
  