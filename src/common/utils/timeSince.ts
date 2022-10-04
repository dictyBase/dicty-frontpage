const timeSince = (date: string) => {
  const seconds = Math.floor((Date.now() - +new Date(date)) / 1000)

  let interval = Math.floor(seconds / 31_536_000)

  if (interval > 1) {
    return `${interval} years`
  }
  interval = Math.floor(seconds / 2_592_000)
  if (interval > 1) {
    return `${interval} months`
  }
  interval = Math.floor(seconds / 86_400)
  if (interval > 1) {
    return `${interval} days`
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return `${interval} hours`
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return `${interval} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}

export default timeSince
