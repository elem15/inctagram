import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Input, InputProps } from '@/shared/components/input'

export type ControlledInputProps<TFieldsValues extends FieldValues> = {
  name: FieldPath<TFieldsValues>
  control: Control<TFieldsValues>
} & Omit<InputProps, 'onChange' | 'value' | 'id'>

export const ControlledInput = <TFieldValues extends FieldValues>({
  name,
  control,
  error,
  ...restProps
}: ControlledInputProps<TFieldValues>) => {
  const { field } = useController({
    name,
    control,
  })

  return <Input {...restProps} {...field} error={error} id={name} />
}


