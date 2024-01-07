import { DatePicker } from 'antd';
import { FC, memo, useEffect, useMemo, useState } from 'react';

import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { useBatchAddStore } from '../../store';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'YYYY-MM-DD HH:mm';

interface RangeDatePickerProps {
  extraInfo: {
    startTime: any;
    setStartTime: any;
    currentGroupIndex: number;
    currentWeek: number;
    setPreIndex: any;
  };
  onChange?: (value: any) => void;
  value?: any;
}

const RangeDatePickerCpn: FC<RangeDatePickerProps> = memo(
  ({ extraInfo, onChange, value }) => {
    const { setStartTime, currentGroupIndex, currentWeek } = extraInfo;
    const { groupsTime, deleteGroupsTime, setGroupsTime } = useBatchAddStore(
      (state) => ({
        groupsTime: state.groupsTime,
        deleteGroupsTime: state.deleteGroupsTime,
        currentDutyStartTime: state.currentDutyStartTime,
        setGroupsTime: state.setGroupsTime,
      }),
    );
    const [calendarValue] = useState<[Dayjs | null, Dayjs | null]>(value);
    const [lastGroupTime, setLastGroupTime] = useState<any>(null);
    const [nextGroupTime, setNextGroupTime] = useState<any>(null);
    const handleDisabledDate: RangePickerProps['disabledDate'] = (current) => {
      const startGroupTime = groupsTime[currentGroupIndex]?.date;
      const today = startGroupTime ?? dayjs().startOf('d');
      // console.log('today', today);
      const weekStart = today.weekday(0);
      const weekEnd = today.weekday(6);
      const currentCalendarDate = current.startOf('d');
      const isBeforeWeekStart = currentCalendarDate < weekStart;
      const isAfterWeekEnd = currentCalendarDate > weekEnd;
      const isBeforeLastGroupEnd =
        lastGroupTime && currentCalendarDate <= lastGroupTime;
      const isAfterNextGroupEnd =
        nextGroupTime && currentCalendarDate >= nextGroupTime;
      const rule = startGroupTime
        ? isBeforeWeekStart || isAfterWeekEnd
        : isBeforeWeekStart || isBeforeLastGroupEnd || isAfterNextGroupEnd;
      return rule;
    };

    const exChangeDiffWeek = useMemo(() => {
      // 获取之前位置的开始时间
      const newPositionDate = value?.[0];
      // 获取当前位置的开始时间
      const curPositionDate = groupsTime[currentGroupIndex]?.date;

      const diffWeek =
        dayjs(newPositionDate?.format(dateFormat))
          ?.weekday(6)
          ?.diff(curPositionDate?.weekday(6)?.format(dateFormat), 'week') ?? 0;
      console.log('newPositionDate', {
        newPositionDate1: newPositionDate?.weekday(6),
        newPositionDate: dayjs(newPositionDate?.format(dateFormat))?.weekday(6),
        curPositionDate: curPositionDate?.format(dateFormat),
        currentGroupIndex,
        groupsTime,
        diffWeek,
        test: dayjs('2024-01-07')?.weekday(6)?.diff('2024-01-21', 'week'),
      });
      return diffWeek;
    }, [currentGroupIndex, groupsTime, value]);

    useEffect(() => {
      // value 变化 设置周数
      if (!value || !setStartTime) return;
      setStartTime(value[0]);
    }, [value, setStartTime]);

    return (
      <DatePicker.RangePicker
        disabledDate={handleDisabledDate}
        format={dateFormat}
        value={[
          value?.[0]?.add(-exChangeDiffWeek, 'week'),
          value?.[1]?.add(-exChangeDiffWeek, 'week'),
        ]}
        onOpenChange={(open) => {
          const lastDate =
            groupsTime?.[currentGroupIndex - 1]?.date?.format(dateFormat);
          const nextDate =
            groupsTime?.[currentGroupIndex + 1]?.date?.format(dateFormat);
          console.log('cccc', lastDate, nextDate);
          setLastGroupTime(lastDate ? dayjs(lastDate).weekday(6) : null);
          setNextGroupTime(nextDate ? dayjs(nextDate) : null);

          if (open && !calendarValue) {
            setStartTime(null);
          }
          if (!open && !calendarValue?.[1]) {
            setStartTime(null);
            deleteGroupsTime(String(currentWeek));
          }
        }}
        onCalendarChange={(dates, dateString) => {
          console.log('dates', dates, dateString);
          if (dates) {
            // setCalendarValue(dates);
            onChange?.(dates);
            setStartTime(dates[0]);
            setGroupsTime(
              currentGroupIndex,
              dayjs(dates[0]?.format(dateFormat)),
            );
          } else {
            onChange?.([null, null]);
            setStartTime(null);
            setGroupsTime(currentGroupIndex, null);
          }
        }}
      />
    );
  },
);

export default RangeDatePickerCpn;
