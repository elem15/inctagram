import * as React from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/shared/components/ui/CalendarButton'
import { cn } from '@/shared/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  function sunday(day: Date) {
    return day.getDay() === 0
  }
  function saturday(day: Date) {
    return day.getDay() === 6
  }

  return (
    <DayPicker
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      modifiers={{
        outside: [sunday, saturday],
      }}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-start pl-3 pt-1 relative items-center',
        caption_label: 'text-base font-semibold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-9 w-9 bg-dark-100 p-0 hover:opacity-100 rounded-full'
        ),
        nav_button_previous: 'absolute right-10',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1 rounded-full',
        head_row: 'flex',
        head_cell: 'text-muted-foreground w-9 font-normal text-[0.8rem] rounded-full',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20 rounded-full',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary-900'
        ),
        day_selected:
          'bg-primary-500 text-light-100 hover:bg-primary-900 hover:text-primary-foreground focus:bg-primary-500 border-4 border-primary-900 focus:rounded-full focus:text-light-100',
        day_today: 'text-primary-500',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_start: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground focus:bg-primary-500 opacity-50',
        day_range_end: 'text-muted-foreground opacity-50',
        day_hidden: 'text-muted-foreground opacity-50',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
