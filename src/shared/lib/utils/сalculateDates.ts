export const calculateDates = (period: number) => {
  let days: Date

  if (period === 1) {
    const oneDayLater = new Date()

    oneDayLater.setDate(oneDayLater.getDate() + period)
    days = oneDayLater
  } else if (period === 7) {
    const oneWeekLater = new Date()

    oneWeekLater.setDate(oneWeekLater.getDate() + period)
    days = oneWeekLater
  } else {
    const oneMonthLater = new Date()

    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1)
    days = oneMonthLater
  }

  return days
}
