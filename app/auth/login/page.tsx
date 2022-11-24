'use client'

import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { Form } from "../../../components/ui/forms/Form"
import { Checkbox, Input } from "../../../components/ui/inputs"
import { FieldValues } from 'react-hook-form';
import { validations } from "../../../utils";

type FormValues = {
    email: string,
    password: string,
}

const LoginPage = () => {
    const onSubmit = (formData: FieldValues) => {
        const data = formData as FormValues
        console.log(data)
    }

    return (
        <Form 
            title="Welcome to the doctor's app" 
            subtitle='Log in to access unique features'
            classNames="sm:mx-auto sm:w-full sm:max-w-md"
            onSubmit={onSubmit}
        >
            <Input
                label="Email address"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="johndoe@example.com"
                validations={{
                    required: 'This field is required.',
                    validate: validations.validateEmail
                }}
            />

            <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="********"
                validations={{
                    required: 'This field is required.',
                    minLength: { value: 8, message: 'The password must have at least 8 characters.' },
                    maxLength: { value: 14, message: 'The password must not have more than 14 characters.' },
                }}
            />

            <div className="flex items-center justify-between">
                <Checkbox name="remember-me" label="Remember me" />

                <Link href="/auth/forgot-password">
                    Forgot your password?
                </Link>
            </div>

            <ButtonPrimary type="submit">
                Log in
            </ButtonPrimary>

            <div className="flex justify-center">
                <Link href="/auth/register">
                    Don't have an account yet?
                </Link>
            </div>
        </Form>
    )
  }
  
  export default LoginPage