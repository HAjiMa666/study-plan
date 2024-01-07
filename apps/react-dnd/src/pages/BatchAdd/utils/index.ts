import { history } from '@umijs/max';
import dayjs, { Dayjs } from 'dayjs';

/**
 * 计算当前为第几周
 * diff为 0，则是第一周，以此类推
 */
export function getWeekNumber(startDate: Dayjs, dutyStartDate: Dayjs) {
  if (!startDate) return;
  const firstWeekDay = startDate.weekday(0); // 当前周的周一
  const firstDutyWeekDay = dutyStartDate.weekday(0); // 当前值班开始时间的第一个周一
  const diffWeek = firstWeekDay.diff(firstDutyWeekDay, 'week'); // 计算当前周与当前值班开始时间的第一个周一的周数差
  // console.log(
  //   'getWeekNumber',
  //   firstWeekDay.format('YYYY-MM-DD'),
  //   firstDutyWeekDay.format('YYYY-MM-DD'),
  // );
  return diffWeek + 1;
}

/**
 * 处理批量创建任务的数据
 * @param allTemp 批量任务数据
 * @param type pass是用于保存的时候传给后端的 recover 是用于后端传递给前端的时候还原成前端所需要的
 * @returns 处理过后的数据
 */
export function handleBatchAddTaskData(allTemp: any, type: 'pass' | 'recover') {
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm';
  let result, passBodyData, recoverBodyData;
  if (type === 'pass') {
    passBodyData = {
      dateList: allTemp?.map((item) => {
        const detailList = item.singleTemp?.map((singleTask) => {
          return {
            belongUserIds: singleTask?.belongUserIds?.person.map(
              (item) => item.userId,
            ),
            chargeUserIds: singleTask?.chargeUserIds?.person.map(
              (item) => item.userId,
            ),
            startTime: singleTask?.time?.[0]?.format(timeFormat),
            endTime: singleTask?.time?.[1]?.format(timeFormat),
            startDate: singleTask?.date?.[0]?.format(dateFormat),
            endDate: singleTask?.date?.[1]?.format(dateFormat),
            dutyContent: singleTask.dutyContent,
            remark: singleTask.remark,
            dutySiteName: singleTask.dutySiteName?.name,
            dutySiteId: singleTask.dutySiteName?.id,
          };
        });
        return {
          dateIndex: item.dateIndex,
          dateStart: item.dateStart,
          detailList: detailList,
          dateEnd: item.dateEnd,
        };
      }),
      id: history.location.query?.schedulId,
    };
  }

  if (type === 'recover') {
    recoverBodyData = {
      allTemp: allTemp?.dateList?.map((item) => ({
        singleTemp: item?.detailList?.map((singleTask) => ({
          belongUserIds: {
            dpt: [],
            person: singleTask?.belongUserList?.map((itey) => ({
              userId: itey.id,
              userName: itey.name,
            })),
          },
          chargeUserIds: {
            dpt: [],
            person: singleTask?.chargeUserList?.map((itey) => ({
              userId: itey.id,
              userName: itey.name,
            })),
          },
          time: [
            dayjs(`${singleTask.startDate} ${singleTask.startTime}`),
            dayjs(`${singleTask.endDate} ${singleTask.endTime}`),
          ],
          date: [dayjs(singleTask.startDate), dayjs(singleTask.endDate)],
          dutyContent: singleTask.dutyContent,
          remark: singleTask.remark,
          dutySiteName: {
            name: singleTask?.dutySiteName,
            id: singleTask?.dutySiteId,
          },
        })),
        dateEnd: item.dateEnd,
        dateIndex: item.dateIndex,
        dateStart: item.dateStart,
      })),
      hasCycle: allTemp.hasCycle,
      templateEndTime: allTemp.templateEndTime,
      templateStartTime: allTemp.templateStartTime,
      templateId: allTemp.templateId,
    };
  }

  if (type === 'pass') result = passBodyData;
  if (type === 'recover') result = recoverBodyData;
  return result;
}
