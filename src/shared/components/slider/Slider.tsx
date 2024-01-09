import { ComponentPropsWithoutRef, CSSProperties, FC, ReactNode } from 'react'

import * as Slider from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './Slider.module.scss'

import { Typography } from '@/shared/components'

type Props = {
  onChange: (values: number[]) => void
  onValueCommit?: (value: number[]) => void
  rangerLabel?: string
  values: number[]
  className?: string
  style?: CSSProperties
}
export const SliderDemo: FC<Props> = ({
  onChange,
  onValueCommit,
  rangerLabel,
  values,

  className,
  style,
}) => {
  return (
    <>
      <Typography variant={'regular_text_14'}>{rangerLabel}</Typography>
      <form className={s.ranger}>
        <Slider.Root
          className={clsx(s.SliderRoot, className)}
          defaultValue={[1, 50]}
          max={3}
          min={1}
          onValueChange={onChange}
          onValueCommit={onValueCommit}
          step={0.1}
          value={values}
          style={style}
        >
          <Slider.Track className={s.SliderTrack}>
            <Slider.Range className={s.SliderRange} />
          </Slider.Track>
          <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
        </Slider.Root>
      </form>
    </>
  )
}
