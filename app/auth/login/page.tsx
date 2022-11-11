'use client'

import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { Form } from "../../../components/ui/forms/Form"
import { Checkbox, Input } from "../../../components/ui/inputs"

const LoginPage = () => {
    return (
        <Form title="Log in to your account">
            <div>
                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                />
            </div>

            <div>
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                />
            </div>

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