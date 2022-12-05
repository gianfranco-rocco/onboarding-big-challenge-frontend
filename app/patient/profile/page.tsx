'use client'

import React, { useContext, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { ButtonPrimary, GoBackButton } from '@components/ui/buttons'
import { Form } from '@components/ui/forms'
import { Input, Textarea } from '@components/ui/inputs'
import { PageTitle } from '@components/ui/pages'
import { validations, paths, toast as toastUtils } from '@utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '@context/auth'
import { IPatientInfo } from '@interfaces'

const PatientProfilePage = () => {
  const [errors, setErrors] = useState({})

  const { user, updatePatientInfo } = useContext(AuthContext)

  const toastConfig = toastUtils.config

  const onSubmit = async (formData: FieldValues) => {
    try {
      await updatePatientInfo(formData as IPatientInfo)

      toast.success('Information updated successfully.', toastConfig)

      setErrors({})
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data.errors || {})
      } else {
        toast.error('Something went wrong while attempting to update your information.', toastConfig)
      }
    }
  }

  return (
    <>
      <GoBackButton href={paths.patient.home} />

      <PageTitle
        title='Information'
        subtitle='You need to complete your profile before adding a submission'
      />

      <Form
        classNames='md:w-1/2 w-full flex flex-col gap-6'
        onSubmit={onSubmit}
        apiErrors={errors}
        defaultValues={{
          phone: user?.info?.phone,
          height: user?.info?.height,
          weight: user?.info?.weight,
          info: user?.info?.info
        }}
      >
        <Input
          label='Phone number'
          name='phone'
          placeholder='(406) 555-0121'
          validations={{
            required: 'This field is required.',
            validate: validations.validatePhoneNumber
          }}
        />

        <div className='flex gap-2'>
          <Input
            label='Weight'
            name='weight'
            placeholder='80'
            validations={{
              required: 'This field is required.',
              validate: validations.validateInt
            }}
          />

          <Input
            label='Height'
            name='height'
            placeholder='170'
            validations={{
              required: 'This field is required.',
              validate: validations.validateInt
            }}
          />
        </div>

        <Textarea
          label='Other info'
          name='info'
          rows={6}
          placeholder='Partial excision (craterization, saucerization, or diaphysectomy) bone (eg, osteomyelitis); proximal or middle phalanx of finger'
          validations={{
            required: 'This field is required.'
          }}
        />

        <ButtonPrimary className='md:w-max w-full' type='submit'>Update profile</ButtonPrimary>
      </Form>
    </>
  )
}

export default PatientProfilePage
