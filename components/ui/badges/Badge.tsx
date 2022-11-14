import { FC } from "react";

export type BadgeType = 'normal' | 'success' | 'primary'

interface Props {
    type: BadgeType;
    children: React.ReactNode;
    className?: string;
}

const classNames = (type: BadgeType): string => {
    let classNames = ''

    switch(type) {
        case 'normal':
            classNames = 'bg-gray-100 text-gray-800'
            break
        case 'success':
            classNames = 'bg-green-100 text-green-800'
            break
        case 'primary':
            classNames = 'bg-blue-100 text-blue-800'
            break
    }
    
    return classNames;
}

export const Badge: FC<Props> = ({ type, children, className }) => {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${classNames(type)} ${className}`}>
            {children}
        </span>
    )
}  