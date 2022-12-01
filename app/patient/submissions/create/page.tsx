'use client'

import { GoBackButton, ButtonPrimary } from '../../../../components/ui/buttons'
import { Form } from '../../../../components/ui/forms'
import { Input, Textarea } from '../../../../components/ui/inputs'
import { PageTitle } from '../../../../components/ui/pages'
import paths from '../../../../utils/paths'
import { FieldValues } from 'react-hook-form';
import { api } from '../../../../api'
import { api as apiUtils } from '../../../../utils'
import { toast } from 'react-toastify'
import { config } from '../../../../utils/toast'
import { useRouter } from 'next/navigation'

interface FormValues {
  title: string;
  symptoms: string;
}

const CreateSubmissionPage = () => {
  const router = useRouter()

  const onSubmit = async (formData: FieldValues) => {
    const { title, symptoms } = formData as FormValues

    try {
      await api.post('/submissions', {
        title, symptoms
      })

      router.replace(paths.patient.home)

      toast.success('Submission created successfully.', config)
    } catch (err) {
      toast.error(apiUtils.getErrorMessage(err), config)
    }
  }

  return (
    <>
      <GoBackButton href={paths.patient.home} />

      <PageTitle title='New submission'/>

      <Form classNames='lg:w-1/2' onSubmit={onSubmit}>
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
      </Form>
    </>
  )
}

export default CreateSubmissionPage