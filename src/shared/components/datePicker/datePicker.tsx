import { useEffect, useState } from 'react'

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import ru from 'date-fns/locale/ru'
import { DateRange } from 'react-day-picker'

import { Typography } from '..'
import { cn } from '../../lib/utils'
import { Popover, PopoverContent, PopoverTrigger, Calendar, CalendarButton } from '../ui'

import { CalendarDark, CalendarLight } from '@/shared/assets'

type Props = {
  mode: 'single' | 'range'
  errorMessage?: string
  lang?: string
  setResultDate: React.Dispatch<React.SetStateAction<Date | DateRange | undefined>>
  defaultMonth?: Date
  label?: string
}

export function DatePicker({
  mode,
  errorMessage,
  setResultDate,
  lang,
  defaultMonth,
  label,
  ...props
}: Props) {
  const baseDate = defaultMonth || new Date()
  const [date, setDate] = useState<Date>()
  const [range, setRange] = useState<DateRange>()
  const isSelected = date || range
  const locale = lang === 'ru' ? ru : undefined

  useEffect(() => {
    if (date) {
      setResultDate(date)
    } else if (range && range.to) {
      setResultDate(range)
    }
  }, [setResultDate, date, range])

  return (
    <Popover>
      <label className="text-sm text-light-900 leading-relaxed">{label}</label>
      <PopoverTrigger asChild>
        <CalendarButton
          variant={'default'}
          className={cn(
            'min-w-[160px] w-full justify-between text-left gap-10 font-normal bg-dark-500 border-dark-300 rounded-none hover:text-light-100 group',
            !isSelected && 'text-light-900',
            errorMessage &&
              'data-[state=closed]:border-red-500 data-[state=closed]:text-red-500 border-[1px]'
          )}
        >
          {!isSelected && format(baseDate, 'dd/MM/yyyy')}
          {date
            ? format(date, 'dd/MM/yyyy')
            : range?.from &&
              `${format(range.from, 'dd/MM/yyyy')} ${
                range.to ? '- ' + format(range.to, 'dd/MM/yyyy') : ''
              }`}
          <CalendarDark className="group-data-[state=closed]:hidden" />
          <CalendarLight className="group-data-[state=open]:hidden" />
        </CalendarButton>
      </PopoverTrigger>
      {errorMessage && (
        <Typography variant="small_text" className="text-red-500 left-0">
          {errorMessage}
        </Typography>
      )}
      <PopoverContent className="w-auto p-0 dark">
        {mode === 'single' && (
          <Calendar
            mode={'single'}
            locale={locale}
            selected={date}
            onSelect={setDate}
            initialFocus
            className="dark bg-dark-500 border-dark-300"
            defaultMonth={defaultMonth}
            {...props}
          />
        )}
        {mode === 'range' && (
          <Calendar
            mode={'range'}
            locale={locale}
            selected={range}
            onSelect={setRange}
            initialFocus
            className="dark bg-dark-500 border-dark-300"
            defaultMonth={defaultMonth}
            {...props}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
