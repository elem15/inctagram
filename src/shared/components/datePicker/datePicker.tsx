import * as React from 'react'

import { format } from 'date-fns'
import { CalendarDays, CalendarRange, CalendarSearch } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Typography } from '..'
import { cn } from '../../lib/utils'
import { Popover, PopoverContent, PopoverTrigger, Calendar, CalendarButton } from '../ui'

type Props = {
  mode: 'single' | 'range'
  errorMessage?: string
  getDate: (date: Date | DateRange) => typeof date
}

export function DatePicker({ mode, errorMessage, getDate }: Props) {
  const today = new Date()
  const [date, setDate] = React.useState<Date>()
  const [range, setRange] = React.useState<DateRange>()
  const isSelected = date || range
  const CalendarIcon = mode === 'range' ? CalendarRange : CalendarDays

  React.useEffect(() => {
    if (date) {
      getDate(date)
    } else if (range && range.to) {
      getDate(range)
    }
  }, [getDate, date, range])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CalendarButton
          variant={'default'}
          className={cn(
            'min-w-[160px] w-full justify-between text-left gap-10 font-normal bg-dark-500 border-dark-300 rounded-none hover:text-light-100 group',
            !isSelected && 'text-muted-foreground',
            errorMessage &&
              'data-[state=closed]:border-red-500 data-[state=closed]:text-red-500 border-[1px]'
          )}
        >
          {!isSelected && format(today, 'dd/MM/yyyy')}
          {date
            ? format(date, 'dd/MM/yyyy')
            : range?.from &&
              `${format(range.from, 'dd/MM/yyyy')} - ${
                range.to ? format(range.to, 'dd/MM/yyyy') : ''
              }`}
          <CalendarSearch className="group-data-[state=closed]:hidden" />
          <CalendarIcon className="group-data-[state=open]:hidden" />
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
            selected={date}
            onSelect={setDate}
            initialFocus
            className="dark bg-dark-500 border-dark-300"
          />
        )}
        {mode === 'range' && (
          <Calendar
            mode={'range'}
            selected={range}
            onSelect={setRange}
            initialFocus
            className="dark bg-dark-500 border-dark-300"
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
