import * as React from 'react'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Calendar } from '@/shared/components/ui/Calendar'
import { CalendarButton } from '@/shared/components/ui/CalendarButton'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/Popover'
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
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
