'use client'

import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { Form } from "../../../components/ui/forms/Form"
import { Checkbox, Input } from "../../../components/ui/inputs"
import { FieldValues } from 'react-hook-form';
import { validations } from "../../../utils";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { toast } from "react-toastify";
import { config } from "../../../utils/toast";
import { useRouter } from "next/navigation";
import paths from "../../../utils/paths";

type FormValues = {
    email: string,
    password: string,
}

const LoginPage = () => {
    const { login } = useContext(AuthContext)

    const router = useRouter()

    const onSubmit = async (formData: FieldValues) => {
        const { email, password } = formData as FormValues

        const { success, message, user } = await login(email, password)

        if (success) {
            router.replace(paths[user!.roles[0].name].home)
        } else {
            toast.error(message, config)
        }
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

                <Link href={paths.auth.forgotPassword}>
                    Forgot your password?
                </Link>
            </div>

            <ButtonPrimary type="submit">
                Log in
            </ButtonPrimary>

            <div className="flex justify-center">
                <Link href={paths.auth.register}>
                    Don't have an account yet?
                </Link>
            </div>
        </Form>
    )
  }
  
  export default LoginPage