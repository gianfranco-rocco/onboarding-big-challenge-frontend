'use client'

import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { Form } from "../../../components/ui/forms/Form"
import { Input, IRadioOption, RadioGroup } from "../../../components/ui/inputs"

const userTypes: IRadioOption[] = [
  { id: 'patient', title: 'Patient', checked: true },
  { id: 'doctor', title: 'Doctor' },
]

const RegisterPage = () => {
  return (
        <Form title="Register"> 
            <div>
              <Input
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
              />
            </div>

            <div>
              <Input
                  label="Phone number"
                  name="phoneNumber"
                  type="text"
                  placeholder="(555) 555-1234"
                  required
              />
            </div>

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

            <RadioGroup options={userTypes} label={"Register as"} name={"type"} />

            <ButtonPrimary type="submit">
                Register
            </ButtonPrimary>

            <div className="flex justify-center">
                <Link href="/auth/login">
                    Already have an account?
                </Link>
            </div>
        </Form>
  )
}
  
export default RegisterPage