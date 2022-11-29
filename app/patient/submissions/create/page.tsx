'use client'

import { GoBackButton, ButtonPrimary } from '../../../../components/ui/buttons'
import { BaseForm } from '../../../../components/ui/forms'
import { Input, Textarea } from '../../../../components/ui/inputs'
import { PageTitle } from '../../../../components/ui/pages'
import paths from '../../../../utils/paths'
import { FieldValues } from 'react-hook-form';
import { api } from '../../../../api'
import Cookies from 'js-cookie'

interface FormValues {
  title: string;
  symptoms: string;
}

const CreateSubmissionPage = () => {
  const onSubmit = async (formData: FieldValues) => {
    const { title, symptoms } = formData as FormValues

    const res = await api.post('/submissions', {
      title, symptoms
    }, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('XSRF-TOKEN')}`
      }
    })
    
    console.log(res)
  }

  return (
    <>
      <GoBackButton href={paths.patient.home} />

      <PageTitle title='New submission'/>

      <BaseForm classNames='lg:w-1/2' onSubmit={onSubmit}>
        <Input 
          label='Title' 
          type='text' 
          name='title'
          placeholder='Hepatic infarction'
          autoFocus
          validations={{
            required: 'This field is required.'
          }}
        />

        <Textarea 
          label='Symptoms' 
          name='symptoms'
          placeholder='Stomach and abdominal pain, cramps and fever'
          rows={6}
          validations={{
            required: 'This field is required.',
          }}
        />

        <ButtonPrimary className='w-max' type='submit'>Send submission</ButtonPrimary>
      </BaseForm>
    </>
  )
}

export default CreateSubmissionPage