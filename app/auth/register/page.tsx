'use client'

import { useState } from 'react';
import { ButtonPrimary, Link } from "../../../components/ui/buttons"
import { Form } from "../../../components/ui/forms/Form"
import { Input, IRadioOption, RadioGroup } from "../../../components/ui/inputs"
import paths from '../../../utils/paths';

const userTypes: IRadioOption[] = [
  { id: 'patient', name: 'Patient' },
  { id: 'doctor', name: 'Doctor' },
]

const RegisterPage = () => {
  const [selectedType, setSelectedType] = useState(userTypes[0])
  
  return (
        <Form
          title="Welcome to the doctor's app" 
          subtitle="Sign up to access unique features"
          classNames="lg:mx-auto lg:w-1/2"
        >
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <Input
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  autoFocus
              />

              <Input
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="johndoe@email.com"
                  required
              /> 
              
              <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
              />

              <Input
                  label="Repeat password"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="********"
                  required
              />
            </div>

            <RadioGroup 
              options={userTypes} 
              label="User type" 
              selected={selectedType}
              setSelected={setSelectedType}
            />

            <ButtonPrimary type="submit">
                Register
            </ButtonPrimary>

            <div className="flex justify-center">
                <Link href={paths.auth.login}>
                    Already have an account?
                </Link>
            </div>
        </Form>
  )
}
  
export default RegisterPage