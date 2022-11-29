'use client'

import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { api } from '../../../api'
import { ButtonPrimary, GoBackButton } from '../../../components/ui/buttons'
import { BaseForm } from '../../../components/ui/forms'
import { Input, Textarea } from '../../../components/ui/inputs'
import { PageTitle } from '../../../components/ui/pages'
import { validations } from '../../../utils'
import paths from '../../../utils/paths'
import axios from 'axios';
import { toast } from 'react-toastify'
import { config } from '../../../utils/toast'

interface FormValues {
  phoneNumber: string;
  weight: string;
  height: string;
  symptoms: string;
}

const PatientProfilePage = () => {
  const [errors, setErrors] = useState({})

  const onSubmit = async (formData: FieldValues) => {
    try {
      await api.post('/info', {...formData} as FormValues, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
        }
      })
  
      toast.success('Information updated successfully.', config)

      setErrors({})
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data.errors || {})
      } else {
        toast.error('Something went wrong while attempting to update your information.', config)
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

      <BaseForm 
        classNames='md:w-1/2 w-full flex flex-col gap-6' 
        onSubmit={onSubmit}
        apiErrors={errors}
      >
        <Input 
          label='Phone number'
          name='phone'
          placeholder='(406) 555-0121'
          validations={{
            required: 'This field is required.',
            // validate: validations.validatePhoneNumber
          }}
        />

        <div className='flex gap-2'>
          <Input 
            label='Weight'
            name='weight'
            placeholder='80'
            validations={{
              required: 'This field is required.',
              validate: validations.validateInt,
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
      </BaseForm>
    </>
  )
}

export default PatientProfilePage