'use client'

import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { AuthForm } from "../../../components/ui/forms"
import { Input, IRadioOption, RadioGroup } from "../../../components/ui/inputs"
import paths from '../../../utils/paths';
import { FieldValues } from 'react-hook-form';
import { UserType } from '../../../interfaces';
import { validations } from '../../../utils';
import { useContext, useState } from 'react';
import { AuthContext } from "../../../context/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { position, updateConfig } from "../../../utils/toast";

const userTypes: IRadioOption[] = [
  { id: 'patient', name: 'Patient' },
  { id: 'doctor', name: 'Doctor' },
]

export type RegisterFormValues = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  type: UserType
}

const RegisterPage = () => {
  const { register } = useContext(AuthContext)

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (formData: FieldValues) => {
    setLoading(true)

    const toastId = toast.loading('Signing up, please wait...', {
      position
    })

    const { success, message, user } = await register(formData as RegisterFormValues)

    const toastOptions = updateConfig
    toastOptions.render = message
    toastOptions.type = 'error'
    toastOptions.pauseOnHover = false

    if (success) {
      toastOptions.render = 'Successful sign up, redirecting to home page.'
      toastOptions.type = 'success'

      setTimeout(() => {
        router.replace(paths[user!.roles[0].name].home)
      }, 3000);
    } else {
      setLoading(false)
    }

    toast.update(toastId, toastOptions)
  }

  return (
        <AuthForm
          title="Welcome to the doctor's app" 
          subtitle="Sign up to access unique features"
          classNames="lg:mx-auto lg:w-1/2"
          onSubmit={onSubmit}
        >
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <Input
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  autoFocus
                  validations={{
                    required: 'This field is required.',
                    validate: validations.validateAlpha
                  }}
              />

              <Input
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="johndoe@email.com"
                  validations={{
                    required: 'This field is required.',
                    validate: validations.validateEmail
                  }}
              /> 
              
              <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="********"
                  validations={{
                    required: 'This field is required.',
                    minLength: { value: 8, message: 'The password must have at least 8 characters.' },
                    maxLength: { value: 14, message: 'The password must not have more than 14 characters.' },
                  }}
              />

              <Input
                  label="Repeat password"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="********"
                  validations={{
                    required: 'This field is required.',
                    minLength: { value: 8, message: 'The password must have at least 8 characters.' },
                    maxLength: { value: 14, message: 'The password must not have more than 14 characters.' },
                  }}
              />
            </div>

            <RadioGroup 
              options={userTypes} 
              label="User type" 
              name='type'
              validations={{
                required: 'One option must be selected.'
              }}
            />

            <ButtonPrimary type="submit" disabled={loading}>
                Register
            </ButtonPrimary>

            <div className="flex justify-center">
                <Link href={paths.auth.login}>
                    Already have an account?
                </Link>
            </div>
        </AuthForm>
  )
}
  
export default RegisterPage