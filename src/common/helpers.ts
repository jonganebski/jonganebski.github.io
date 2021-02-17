export const formatDate = (dateString: string) => {
  const targetDate = new Date(dateString).getTime()
  const today = Date.now()
  const timeLapse = today - targetDate
  if (timeLapse < 0) {
    return "Future Event"
  }
  const oneDay = 1000 * 60 * 60 * 24
  const oneWeek = oneDay * 7
  if (timeLapse < oneDay) {
    return "Today"
  } else if (timeLapse < oneWeek) {
    const lapseInDays = Math.floor(timeLapse / oneDay)
    return `${lapseInDays} day${1 < lapseInDays ? "s" : ""} ago`
  } else {
    return new Date(dateString).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }
}
