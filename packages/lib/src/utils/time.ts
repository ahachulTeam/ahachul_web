import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export function getCurrentTime(date: string) {
  const d = new Date(date)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000

  if (diff < 60 * 1) {
    return '방금 전'
  }

  return formatDistanceToNow(d, { addSuffix: true, locale: ko })
}
