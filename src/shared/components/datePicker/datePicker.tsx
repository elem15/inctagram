import * as React from 'react'

import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '../../lib/utils'
import { Popover, PopoverContent, PopoverTrigger, Calendar, CalendarButton } from '../ui'

import { CalendarDark, CalendarLight } from '@/shared/assets'

type Props = {
  mode: 'single' | 'range'
}

export function DatePicker({ mode }: Props) {
  const today = new Date()
  const [date, setDate] = React.useState<Date>()
  const [range, setRange] = React.useState<DateRange | undefined>()
  const isSelected = date || range

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CalendarButton
          variant={'default'}
          className={cn(
            'min-w-[160px] justify-between text-left gap-10 font-normal bg-dark-500 border-dark-300 rounded-none hover:text-light-100 group',
            !isSelected && 'text-muted-foreground'
          )}
        >
          {!date && !range && format(today, 'dd/MM/yyyy')}
          {date
            ? format(date, 'dd/MM/yyyy')
            : range?.from &&
              `${format(range.from, 'dd/MM/yyyy')} - ${
                range.to ? format(range.to, 'dd/MM/yyyy') : ''
              }`}
          <CalendarDark className="group-data-[state=closed]:hidden" />
          <CalendarLight className="group-data-[state=open]:hidden" />
        </CalendarButton>
      </PopoverTrigger>
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
