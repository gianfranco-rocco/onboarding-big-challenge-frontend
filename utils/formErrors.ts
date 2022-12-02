import { reactHookForm } from '@utils'
import { FormState, FieldValues } from 'react-hook-form'
import { ApiError } from '@components/ui/forms'

export const getMessage = (
  name: string,
  formState: FormState<FieldValues>,
  apiErrors?: ApiError
): string => {
  let errorMsg = reactHookForm.getError(name, formState)

  if (!errorMsg && apiErrors && Object.keys(apiErrors).length > 0) {
    const fieldApiErrors = apiErrors[name]

    errorMsg = fieldApiErrors?.length > 0 ? fieldApiErrors[0] : ''
  }

  return errorMsg as string
}
