'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { AuthForm } from "../../../components/ui/forms"
import { Input } from "../../../components/ui/inputs"
import paths from "../../../utils/paths";

const ResetPasswordPage = () => {
  const { get: params } = useSearchParams();
  const router = useRouter();
  const { auth } = paths

  const email = params('email') || '';

  useEffect(() => {
    if (!email) {
      router.replace(auth.forgotPassword)
    }
  }, [email])

  return (
      <AuthForm title="Create a new password">
          <div>
            <Input
                label="Email address"
                name="email"
                type="email"
                defaultValue={email}
                autoComplete="email"
                required
                disabled
            />
          </div>

          <div>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                required
              />
            </div>

            <div>
              <Input
                label="Password confirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="********"
                required
              />
            </div>

          <ButtonPrimary type="submit">
              Reset password
          </ButtonPrimary>

          <div className="flex justify-center">
              <Link href={auth.login}>
                Log in
              </Link>
          </div>
      </AuthForm>
  )
}

export default ResetPasswordPage