import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { Form } from "../../../components/ui/forms/Form"
import { Input } from "../../../components/ui/inputs"

const ForgotPasswordPage = () => {
    return (
        <Form title="Restore your password">
            <div>
                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="johndoe@email.com"
                    required
                />
            </div>

            <ButtonPrimary type="submit">
                Send password recovery email
            </ButtonPrimary>

            <div className="flex justify-center">
                <Link href="/auth/login">
                  Log in
                </Link>
            </div>
        </Form>
    )
  }
  
  export default ForgotPasswordPage