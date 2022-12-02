import React, { FC } from 'react'
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'

type ChildType = React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>

type FormType = UseFormReturn<FieldValues, any>

export type ApiError = {
    [x: string]: string[]
}

const createReactHookFormEl = (child: ChildType, form: FormType, apiErrors?: ApiError) =>
  React.createElement(child.type, {
    ...{
      ...child.props,
      form,
      apiErrors,
      key: child.props.name
    }
  })

const renderChildren = (children: React.ReactNode, form: FormType, apiErrors?: ApiError): React.ReactNode => (
  React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child
    }

    const { children, name } = child.props

    if (children?.length) {
      return React.createElement(
        child.type,
        { ...{ ...child.props } },
        renderChildren(children, form, apiErrors))
    }

    if (name) {
      return createReactHookFormEl(child, form, apiErrors)
    }

    return child
  })
)

export interface BaseFormProps {
    children: React.ReactNode;
    classNames?: string;
    onSubmit: SubmitHandler<FieldValues>;
    apiErrors?: ApiError;
    defaultValues?: any;
}

export const Form: FC<BaseFormProps> = ({ children, classNames = '', onSubmit, apiErrors, defaultValues }) => {
  const form = useForm({
    defaultValues
  })

  return (
    <form className={`space-y-6 ${classNames}`} onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {renderChildren(children, form, apiErrors)}
    </form>
  )
}
