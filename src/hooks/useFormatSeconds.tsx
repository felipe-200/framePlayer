// interface useFormatSecondsProps {
//   seconds: number
// }
export const useFormatSeconds = (seconds: number) => {
  let converted_seconds = 0
  if (typeof seconds === 'string') {
    converted_seconds = Number(seconds)
  }
  else if (typeof seconds === 'number') {
    converted_seconds = seconds
  }
  else {
    throw new Error('Seconds must be integer or string')
  }
  const minutes = Math.floor(converted_seconds / 60)
  const remaining_seconds = converted_seconds % 60
  const formatted_minutes_part = minutes.toString().padStart(2, '0')
  const formatted_seconds_part = remaining_seconds.toString().padStart(2, '0')

  return `${formatted_minutes_part}:${formatted_seconds_part}`
}