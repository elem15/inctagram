import { useForm } from 'react-hook-form'

import { IAuthInput } from '@/shared/types'
import { CreateNewPasswordWidget } from '@/widgets/createNewPassword'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const CreateNewPasswordPage = () => {
  const { register, handleSubmit, formState, getValues, setError } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  return (
    <div className="flex justify-center  items-center bg-dark-700">
      <CreateNewPasswordWidget register={register} getValues={getValues} formState={formState} />
    </div>
  )
}

CreateNewPasswordPage.getLayout = getHeaderLayout

export { CreateNewPasswordPage }
