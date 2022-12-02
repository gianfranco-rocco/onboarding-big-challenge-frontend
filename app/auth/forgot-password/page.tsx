'use client'

import { useState } from "react"
import { FieldValues } from "react-hook-form"
import { toast } from "react-toastify"
import { api } from "@api"
import { ButtonPrimary, Link } from "@components/ui/buttons"
import { AuthForm } from "@components/ui/forms"
import { Input } from "@components/ui/inputs"
import { paths, validations, api as apiUtils, toast as toastUtils } from "@utils"

interface FormValues {
    email: string;
}

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false)

    const onSubmit = async (formData: FieldValues) => {
        const { email } = formData as FormValues

        setLoading(true)

        toast.promise(
            api.post('/forgot-password', {
                email
            }),
            {
                pending: 'Validating credentials, please wait...',
                success: {
                    render({ data }) {
                        setLoading(false)
                        return `${data?.data.message || data?.data.status}`
                    }
                },
                error: {
                    render({ data }) {
                        setLoading(false)
                        return apiUtils.getErrorMessage(data)
                    }
                },
            }, toastUtils.config
        )
    }

    return (
        <AuthForm 
            title="Restore your password"
            onSubmit={onSubmit}
            classNames="sm:mx-auto sm:w-full sm:max-w-md"
        >
            <Input
                label="Email address"
                name="email"
                autoComplete="email"
                placeholder="johndoe@example.com"
                validations={{
                    required: 'This field is required.',
                    validate: validations.validateEmail
                }}
            />

            <ButtonPrimary type="submit" disabled={loading}>
                Send password recovery email
            </ButtonPrimary>

            <div className="flex justify-center">
                <Link href={paths.auth.login}>
                  Log in
                </Link>
            </div>
        </AuthForm>
    )
  }
  
  export default ForgotPasswordPage