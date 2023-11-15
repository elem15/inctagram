import { useEffect, useState } from 'react'

// eslint-disable-next-line import/no-duplicates
import { format, isValid } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import ru from 'date-fns/locale/ru'
import Link from 'next/link'
import { DateRange } from 'react-day-picker'

import { Typography } from '..'
import { cn } from '../../lib/utils'
import { Popover, PopoverContent, PopoverTrigger, Calendar, CalendarButton } from '../ui'

import { CalendarDark, CalendarLight } from '@/shared/assets'

type Props = {
  mode: 'single' | 'range'
  errorMessage?: string
  errorLinkHref?: string
  errorLinkMessage?: string
  lang?: string
  setResultDate: React.Dispatch<React.SetStateAction<Date | DateRange | undefined>>
  defaultMonth?: Date
  label?: string
}

export function DatePicker({
  mode,
  errorMessage,
  errorLinkHref = '#',
  errorLinkMessage,
  setResultDate,
  lang,
  defaultMonth,
  label,
  ...props
}: Props) {
  const [date, setDate] = useState<Date>()
  const [range, setRange] = useState<DateRange>()
  const baseDate = date || defaultMonth || new Date()
  const [dateValue, setDateValue] = useState('')
  const isSelected = date || range
  const locale = lang === 'ru' ? ru : undefined

  useEffect(() => {
    if (date) {
      setResultDate(date)
      setDateValue(format(date, 'yyyy-MM-dd'))
    } else if (range && range.to) {
      setResultDate(range)
    }
  }, [setResultDate, date, range])

  useEffect(() => {
    const date = new Date(dateValue)

    isValid(date) && setDate(date)
  }, [dateValue])

  useEffect(() => {
    !date && defaultMonth && setDateValue(format(defaultMonth, 'yyyy-MM-dd'))
  }, [date, defaultMonth])

  return (
    <div>
      <label className="text-sm text-light-900 leading-relaxed">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <CalendarButton
            variant={'default'}
            className={cn(
              'min-w-[160px] w-full justify-between text-left gap-10 font-normal bg-dark-500 border-dark-300 rounded-none hover:text-light-100 group',
              !isSelected && 'text-light-900',
              errorMessage &&
                'data-[state=closed]:border-danger-500 data-[state=closed]:text-danger-500 border-[1px]'
            )}
          >
            {baseDate && (
              <input
                type="date"
                placeholder="yyyy-dd-mm"
                value={dateValue}
                onChange={e => setDateValue(e.target.value)}
                className="bg-dark-500 border-dark-500 text-base outline-none"
              />
            )}
            {range?.from &&
              `${format(range.from, 'dd/MM/yyyy')} ${
                range.to ? '- ' + format(range.to, 'dd/MM/yyyy') : ''
              }`}
            <CalendarDark className="group-data-[state=closed]:hidden" />
            <CalendarLight className="group-data-[state=open]:hidden" />
          </CalendarButton>
        </PopoverTrigger>
        {errorMessage && (
          <Typography variant="small_text" className="text-danger-500 left-0">
            {errorMessage}
            {errorLinkMessage && (
              <Link className="underline" href={errorLinkHref}>
                {errorLinkMessage}
              </Link>
            )}
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
              defaultMonth={date}
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
    </div>
  )
}
