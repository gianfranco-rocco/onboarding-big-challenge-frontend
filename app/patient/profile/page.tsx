import React from 'react'
import { ButtonPrimary, GoBackButton } from '../../../components/ui/buttons'
import { Input, SelectOption, Textarea } from '../../../components/ui/inputs'
import { PageTitle } from '../../../components/ui/pages'
import paths from '../../../utils/paths'

const weightOptions: SelectOption[] = [
  { id: 'kg', name: 'kg', placeholder: '80' },
  { id: 'lb', name: 'lb', placeholder: '180' },
]

const heightOptions: SelectOption[] = [
  { id: 'cm', name: 'cm', placeholder: '180' },
  { id: "ft/in", name: "ft/in", placeholder: "5'8" },
]

const PatientProfilePage = () => {
  return (
    <>
      <GoBackButton href={paths.patient.home} />

      <PageTitle
        title='Information'
        subtitle='You need to complete your profile before adding a submission'
      />

      <form className='md:w-1/2 w-full flex flex-col gap-6'>
        <Input 
          label='Phone number'
          name='phoneNumber'
          type='tel'
          placeholder='(406) 555-0121'
        />

        <div className='flex gap-2'>
          <Input 
            label='Weight'
            name='weight'
            selectOptions={weightOptions}
          />

          <Input 
            label='Height'
            name='height'
            selectOptions={heightOptions}
          />
        </div>

        <Textarea 
          label='Other info'
          name='otherInfo'
          rows={6}
          placeholder='Partial excision (craterization, saucerization, or diaphysectomy) bone (eg, osteomyelitis); proximal or middle phalanx of finger'
        />

        <ButtonPrimary className='md:w-max w-full'>Update profile</ButtonPrimary>
      </form>
    </>
  )
}

export default PatientProfilePage