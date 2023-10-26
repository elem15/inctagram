import * as React from 'react'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  CalendarButton,
} from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CalendarButton
          variant={'default'}
          className={cn(
            'min-w-[160px] justify-between text-left font-normal bg-dark-500 border-dark-300 rounded-none hover:text-light-100 ',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? format(date, 'dd/MM/yyyy') : <span>{format(new Date(), 'dd/MM/yyyy')}</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </CalendarButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="dark bg-dark-500 border-dark-300"
        />
      </PopoverContent>
    </Popover>
  )
}
