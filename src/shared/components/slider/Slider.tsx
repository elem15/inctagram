import { FC } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './Slider.module.scss'

import { Typography } from '@/shared/components'

type Props = {
  onChange: (values: number[]) => void
  onValueCommit?: (value: number[]) => void
  rangerLabel?: string
  values: number[]
}
export const SliderDemo: FC<Props> = ({ onChange, onValueCommit, rangerLabel, values }) => {
  return (
    <>
      <Typography variant={'regular_text_14'}>{rangerLabel}</Typography>
      <form className={s.ranger}>
        <Slider.Root
          className={s.SliderRoot}
          defaultValue={[1, 50]}
          max={3}
          min={1}
          onValueChange={onChange}
          onValueCommit={onValueCommit}
          step={0.1}
          value={values}
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
