import React, { FC } from 'react'
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

type ChildType = React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>

const createReactHookFormEl = (child: ChildType, form: UseFormReturn<FieldValues, any>) => 
    React.createElement(child.type, {
        ...{
            ...child.props,
            form,
            key: child.props.name,
        },
    })

const renderChildren = (children: React.ReactNode, form: UseFormReturn<FieldValues, any>): React.ReactNode => (
    React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child
        }

        const { children, name } = child.props

        if (children?.length) {
            return React.createElement(
                child.type, 
                {...{...child.props},
                children: renderChildren(children, form)
            })
        }

        if (name) {
            return createReactHookFormEl(child, form)
        }

        return child
    })
)

export interface BaseFormProps {
    children: React.ReactNode;
    classNames?: string;
    onSubmit: SubmitHandler<FieldValues>;
}

export const BaseForm: FC<BaseFormProps> = ({ children, classNames = '', onSubmit }) => {
    const form = useForm()

    return (
        <form className={`space-y-6 ${classNames}`} onSubmit={form.handleSubmit(onSubmit)} noValidate>
            {renderChildren(children, form)}
        </form>
    )
}
