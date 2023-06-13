export const getTime = (): string => {
  let date = new Date()
  let hours = date.getHours()
  if (hours >= 6 && hours < 9) {
    return '早上'
  } else if (hours >= 9 && hours < 12) {
    return '上午'
  } else if (hours >= 12 && hours < 15) {
    return '中午'
  } else if (hours >= 15 && hours < 18) {
    return '下午'
  } else if (hours >= 18 && hours < 23) {
    return '晚上'
  } else {
    return '凌晨'
  }
}
