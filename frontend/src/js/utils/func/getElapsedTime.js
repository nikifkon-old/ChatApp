// Get elapsed time since the last message was sent
export default function getElapsedTime(d) {
  const date = new Date(d)
  const now = new Date()

  if(now.getDate() === date.getDate()) {

    if(now.getHours() === date.getHours()) {
      return `${now.getMinutes() - date.getMinutes()} min.`
    } else {
      return `${now.getHours() - date.getHours()} hours`
    }
  }

  if(now.getYear() === date.getYear()) {

    if(now.getMonth() === date.getMonth()) {
      return `${now.getDate() - date.getDate()} days`
    } else {
      return `${now.getMonth() - date.getMonth()} months`
    }
  } else {
    return `${now.getYear() - date.getYear()} years`
  }
}
