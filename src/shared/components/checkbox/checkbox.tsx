import { FC } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  onChange?: (checked: boolean) => void
  disabled?: boolean
  checked?: boolean
  label?: string
  className?: string
  id?: string
}

export const SuperCheckbox: FC<CheckboxProps> = ({
  disabled = false,
  onChange,
  checked,
  label,
  className,
  id,
}) => {
  const classNames = {
    checkBoxBlock: clsx(s.checkBoxBlock, className),
    checkBox: clsx(s.checkboxRoot, checked && s.active),
  }

  return (
    <div className={classNames.checkBoxBlock}>
      <Checkbox.Root
        className={classNames.checkBox}
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon className={s.icon} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && (
        <label className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor={id}>
          <Typography variant={'regular_text_14'}>{label}</Typography>
        </label>
      )}
    </div>
  )
}
