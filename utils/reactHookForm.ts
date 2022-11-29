import { FormState, FieldValues } from 'react-hook-form';

export const getError = (name: string, formState: FormState<FieldValues>): string | undefined => {
    const { errors } = formState

    const foundErrors = errors[name] ?? {}

    return foundErrors?.message as string
}