import { GoBackButton, ButtonPrimary } from '../../../../components/ui/buttons'
import { Input, Textarea } from '../../../../components/ui/inputs'
import { PageTitle } from '../../../../components/ui/pages'
import paths from '../../../../utils/paths'

const CreateSubmissionPage = () => {
  return (
    <>
      <GoBackButton href={paths.patient.home} />

      <PageTitle title='New submission'/>

      <form className='space-y-6 lg:w-1/2'>
        <Input 
          label='Title' 
          type='text' 
          name='title'
          placeholder='Hepatic infarction'
          autoFocus    
        />

        <Textarea 
          label='Symptoms' 
          name='symptoms'
          placeholder='Stomach and abdominal pain, cramps and fever'
          rows={6}
        />

        <ButtonPrimary className='w-max'>Send submission</ButtonPrimary>
      </form>
    </>
  )
}

export default CreateSubmissionPage