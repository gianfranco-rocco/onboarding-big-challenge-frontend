'use client'

import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { Form } from "../../../components/ui/forms/Form"
import { Checkbox, Input } from "../../../components/ui/inputs"

const LoginPage = () => {
    return (
        <Form 
            title="Welcome to the doctor's app" 
            subtitle='Log in to access unique features'
            classNames="sm:mx-auto sm:w-full sm:max-w-md"
        >
            <Input
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="johndoe@example.com"
                required
            />

            <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="********"
                required
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