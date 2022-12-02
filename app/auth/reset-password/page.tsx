'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonPrimary, Link } from '@components/ui/buttons'
import { AuthForm } from '@components/ui/forms'
import { Input } from '@components/ui/inputs'
import { paths, api as apiUtils, toast as toastUtils, validations } from '@utils'
import { FieldValues } from 'react-hook-form'
import { api } from '@api'
import { toast } from 'react-toastify'

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}

const ResetPasswordPage = () => {
  const { get: params } = useSearchParams()
  const router = useRouter()
  const { auth } = paths

  const email = params('email') || ''
  const token = params('token') || ''

  const [loading, setLoading] = useState(false)

  const onSubmit = async (formData: FieldValues) => {
    setLoading(true)

    const { email, password, token } = formData as FormValues

    try {
      const { status } = await api.post('/reset-password', {
        email,
        password,
        token
      })

      toast.success(status, toastUtils.config)

      return router.replace(paths.auth.login)
    } catch (err) {
      toast.error(apiUtils.getErrorMessage(err), toastUtils.config)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!email || !token) {
      router.replace(auth.forgotPassword)
    }
  }, [email])

  return (
    <AuthForm
      title='Create a new password'
      classNames='sm:mx-auto sm:w-full sm:max-w-md'
      onSubmit={onSubmit}
      defaultValues={{
        email,
        token
      }}
    >
      <Input name='token' hidden />

      <Input
        label='Email address'
        name='email'
        type='email'
        autoComplete='email'
        disabled
        validations={{
          required: 'This field is required.',
          validate: validations.validateEmail
        }}
      />

      <Input
        label='Password'
        name='password'
        type='password'
        placeholder='********'
        validations={validations.passwordValidations}
      />

      <Input
        label='Repeat password'
        name='passwordConfirmation'
        type='password'
        match='password'
        noMatchMessage="Passwords don't match"
        placeholder='********'
        validations={validations.passwordValidations}
      />

      <ButtonPrimary type='submit' disabled={loading}>
        Reset password
      </ButtonPrimary>

      <div className='flex justify-center'>
        <Link href={auth.login}>
          Log in
        </Link>
      </div>
    </AuthForm>
  )
}

export default ResetPasswordPage
