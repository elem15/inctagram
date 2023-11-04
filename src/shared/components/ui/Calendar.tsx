import * as React from 'react'

import { isWeekend } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '../../lib/utils'

import { buttonVariants } from './CalendarButton'
export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale,
  ...props
}: CalendarProps) {
  function isWeekendDay(day: Date) {
    return isWeekend(day)
  }

  return (
    <DayPicker
      locale={locale}
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      modifiers={{
        outside: [isWeekendDay],
      }}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 text-light-100 capitalize',
        caption: 'flex justify-start pl-2 mb-5 mt-2 relative items-center',
        caption_label: 'text-base font-semibold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-9 w-9 bg-dark-100 p-0 hover:opacity-100 rounded-full'
        ),
        nav_button_previous: 'absolute right-10',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1 rounded-full',
        head_row: 'flex pb-2',
        head_cell: 'text-dark-100 w-9 font-normal text-1 rounded-full',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary-900  first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20 rounded-full',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary-900 active:border-primary-500 text-light-100 hover:bg-primary-700'
        ),
        day_selected: 'bg-primary-900 text-light-100 hover:bg-primary-700 rounded-full ',
        day_today: 'text-primary-500 !font-bold',
        day_outside: 'text-light-900',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_start: 'opacity-50 rounded-r-none hover:bg-primary-700',
        day_range_middle: 'focus:bg-primary-900 opacity-50 rounded-none bg-primary-900',
        day_range_end: 'opacity-50 rounded-l-none hover:bg-primary-700',
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
