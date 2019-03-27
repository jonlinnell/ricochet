export const zeroPad = n => (n < 10 ? `0${n}` : n)

export const formatDate = (rawDate) => {
  const date = new Date(rawDate)
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`
}
