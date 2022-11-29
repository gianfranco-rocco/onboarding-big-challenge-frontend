import React, { FC } from 'react'
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

type ChildType = React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>

type Form = UseFormReturn<FieldValues, any>

export type ApiError = {
    [x: string]: string[]
}

const createReactHookFormEl = (child: ChildType, form: Form, apiErrors?: ApiError) => 
    React.createElement(child.type, {
        ...{
            ...child.props,
            form,
            apiErrors,
            key: child.props.name,
        },
    })

const renderChildren = (children: React.ReactNode, form: Form, apiErrors?: ApiError): React.ReactNode => (
    React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child
        }

        const { children, name } = child.props

        if (children?.length) {
            return React.createElement(
                child.type, 
                {...{...child.props},
                children: renderChildren(children, form, apiErrors)
            })
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
}

export const BaseForm: FC<BaseFormProps> = ({ children, classNames = '', onSubmit, apiErrors }) => {
    const form = useForm()

    return (
        <form className={`space-y-6 ${classNames}`} onSubmit={form.handleSubmit(onSubmit)} noValidate>
            {renderChildren(children, form, apiErrors)}
        </form>
    )
}
