import React, { FC } from 'react'
import NextLink from "next/link"

interface Props {
    href: string;
    children: React.ReactNode;
}

export const Link: FC<Props> = ({ href, children }) => {
    return (
        <NextLink href={href} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {children}
        </NextLink>
    )
}
