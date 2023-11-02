import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CheckboxProps, SuperCheckbox } from '@/shared/components'

type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onCheckedChange' | 'checked' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: ControlledInputProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  return <SuperCheckbox checked={value} onCheckedChange={onChange} {...restProps} />
}
