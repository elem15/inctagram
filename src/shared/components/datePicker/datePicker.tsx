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

type Props = {
  mode: 'single' | 'range'
}
type CalendarProps =
  | Date
  | {
      from: Date
      to: Date | undefined
    }

export function DatePicker({ mode }: Props) {
  const [date, setDate] = React.useState<CalendarProps>(new Date())

  const formatDate = (date: CalendarProps) => {
    return date instanceof Date
      ? format(date, 'dd/MM/yyyy')
      : `${format(date.from, 'dd/MM/yyyy')} - ${date.to ? format(date.to, 'dd/MM/yyyy') : ''}`
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CalendarButton
          variant={'default'}
          className={cn(
            'min-w-[160px] justify-between text-left gap-10 font-normal bg-dark-500 border-dark-300 rounded-none hover:text-light-100 ',
            !date && 'text-muted-foreground'
          )}
        >
          {formatDate(date)}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </CalendarButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark">
        <Calendar
          mode={mode}
          selected={date}
          onSelect={setDate}
          initialFocus
          className="dark bg-dark-500 border-dark-300"
        />
      </PopoverContent>
    </Popover>
  )
}
