import React, { FC } from 'react'
import { FieldError as RHFFieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface Props {
    id: string;
    fieldErrors: RHFFieldError | Merge<RHFFieldError, FieldErrorsImpl<any>> | undefined;
}

export const FieldError: FC<Props> = ({ id, fieldErrors }) => {
    if (!fieldErrors?.message) return null

    return <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>{fieldErrors.message as string}</p>
}
