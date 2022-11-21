import React, { FC } from 'react'
import NextLink from "next/link"

interface Props {
    href: string;
    target: React.HTMLAttributeAnchorTarget;
    download?: boolean;
    children: React.ReactNode;
}

export const Link: FC<Props> = ({ href, target, download, children }) => {
    return (
        <NextLink href={href} target={target} download={download} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {children}
        </NextLink>
    )
}
