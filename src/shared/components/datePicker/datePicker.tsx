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
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </CalendarButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="dark" />
      </PopoverContent>
    </Popover>
  )
}
