import { FC } from 'react';

interface IPaginationLinks {
    previous?: string;
    next?: string;
}

export interface IPagination {
    count: number;
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    links?: IPaginationLinks;
}

export type IHandlePagination = (page: number) => void;

interface Props {
    pagination: IPagination;
    handlePagination: IHandlePagination;
}

export const Pagination: FC<Props> = ({ pagination, handlePagination }) => {
    const {
        count,
        total,
        perPage,
        currentPage,
        links
    } = pagination;

    const showing = (currentPage - 1) * perPage;

    const prevPage = () => {
        handlePagination(currentPage - 1)
    }

    const nextPage = () => {
        handlePagination(currentPage + 1)
    }

    return (
        <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{showing === 0 ? 1 : showing}</span> to <span className="font-medium">{count}</span> of{' '}
                    <span className="font-medium">{total}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                {links?.previous && <button
                    onClick={prevPage}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>}
                {links?.next && <button
                    onClick={nextPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>}
            </div>
        </nav>
    )
}
