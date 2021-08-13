import { Theme, useMediaQuery } from '@material-ui/core'

export function reorder<a>(
  oldArr: Array<a>,
  startIndex: number,
  endIndex: number
): Array<a> {
  let arr = oldArr.slice()
  const [removed] = arr.splice(startIndex, 1)
  arr.splice(endIndex, 0, removed)
  return arr
}

const MINUTE = 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  MONTH = DAY * 30,
  YEAR = DAY * 365

export function formatDateRelativeToNow(date: Date) {
  const secondsAgo = Math.round((+new Date() - +date) / 1000)
  let divisor = null
  let unit = null

  if (secondsAgo < MINUTE) {
    return secondsAgo + ' seconds ago'
  } else if (secondsAgo < HOUR) {
    ;[divisor, unit] = [MINUTE, 'minute']
  } else if (secondsAgo < DAY) {
    ;[divisor, unit] = [HOUR, 'hour']
  } else if (secondsAgo < WEEK) {
    ;[divisor, unit] = [DAY, 'day']
  } else if (secondsAgo < MONTH) {
    ;[divisor, unit] = [WEEK, 'week']
  } else if (secondsAgo < YEAR) {
    ;[divisor, unit] = [MONTH, 'month']
  } else {
    ;[divisor, unit] = [YEAR, 'year']
  }

  const count = Math.floor(secondsAgo / divisor)
  return `${count} ${unit}${count > 1 ? 's' : ''} ago`
}

export function useIsMobile(): boolean {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
}
