import { FC } from 'react';

export interface IPaginationLinks {
    prev: string | null;
    next: string | null;
    first: string;
    last: string;
}
export interface IPaginationMeta {
    count: number;
    total: number;
    per_page: number;
    current_page: number;
    totalPages: number;
    from: number | null;
    to: number | null;
    last_page: number;
    path: string;
}

export interface IPagination {
    links: IPaginationLinks;
    meta: IPaginationMeta;
}

export type IHandlePagination = (page: number) => void;

interface Props {
    pagination: IPagination;
    handlePagination: IHandlePagination;
}

export const Pagination: FC<Props> = ({ pagination, handlePagination }) => {
    const {
        meta: {
            count,
            total,
            current_page,
            from = 0,
            to = 0,
        },
        links: {
            prev,
            next
        },
    } = pagination;

    const prevPage = () => {
        handlePagination(current_page - 1)
    }

    const nextPage = () => {
        handlePagination(current_page + 1)
    }

    return (
        <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{' '}
                    <span className="font-medium">{total}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                {prev && <button
                    onClick={prevPage}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>}
                {next && <button
                    onClick={nextPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>}
            </div>
        </nav>
    )
}
