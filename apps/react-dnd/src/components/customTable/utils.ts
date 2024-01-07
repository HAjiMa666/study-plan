import { Dayjs } from 'dayjs'

/**
 * 计算当前为第几周
 * diff为 0，则是第一周，以此类推
 */
export function getWeekNumber(startDate: Dayjs, dutyStartDate: Dayjs) {
  if (!startDate) return
  const firstWeekDay = startDate.weekday(0) // 当前周的周一
  const firstDutyWeekDay = dutyStartDate.weekday(0) // 当前值班开始时间的第一个周一
  const diffWeek = firstWeekDay.diff(firstDutyWeekDay, 'week') // 计算当前周与当前值班开始时间的第一个周一的周数差
  // console.log(
  //   'getWeekNumber',
  //   firstWeekDay.format('YYYY-MM-DD'),
  //   firstDutyWeekDay.format('YYYY-MM-DD'),
  // );
  return diffWeek + 1
}
