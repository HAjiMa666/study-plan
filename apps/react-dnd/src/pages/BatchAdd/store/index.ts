import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

interface BatchAddStore {
  currentDutyStartTime: string;
  groupsTime: { date: Dayjs | null }[];
  hasCircle: boolean;
  templateEndTime: Dayjs | null;
  addGroups: (curIndex: number) => void;
  setGroupsTime: (currentWeek: number, groupTime: Dayjs) => any;
  deleteGroupsTime: (currentWeek: string) => any;
  setCurrentDutyStartTime: (currentDutyStartTime: string) => any;
  // updateGroupPreIndex: (index: number, value: number) => any;
  setBatchAddData: (field, data: any) => any;
}

export const useBatchAddStore = create<BatchAddStore>()((set) => ({
  groupsTime: [],
  currentDutyStartTime: dayjs().format('YYYY-MM-DD'),
  hasCircle: false,
  templateEndTime: null,
  setBatchAddData: (field, data) => {
    set((state) => ({
      ...state,
      [field]: data,
    }));
  },
  setGroupsTime: (currentWeek, date) => {
    set((state) => {
      const newGroupsTime: any = [...state.groupsTime];
      newGroupsTime[currentWeek] = { date };
      return {
        groupsTime: newGroupsTime,
      };
    });
  },
  addGroups: (curIndex: number) => {
    set((state) => {
      const isHaveIndex = state.groupsTime[curIndex];
      const newGroupsTime: any = [...state.groupsTime];
      // 本条数据
      const tempData = newGroupsTime[curIndex - 1];
      console.log('isHave', isHaveIndex, tempData);
      if (isHaveIndex) {
        // 新增数据
        newGroupsTime[curIndex - 1] = {
          date: tempData?.date,
        };
        // 把本条数据压入最新的数据
        newGroupsTime.push({
          date: tempData?.date?.add(2, 'week'),
        });
        return {
          groupsTime: newGroupsTime,
        };
      }
      newGroupsTime.push({
        date: dayjs(tempData?.date).add(1, 'week'),
      });
      return {
        groupsTime: newGroupsTime,
      };
    });
  },
  deleteGroupsTime: (index) => {
    set((state) => {
      const newGroupsTime = [...state.groupsTime];
      newGroupsTime.splice(Number(index), 1);
      return {
        groupsTime: newGroupsTime,
      };
    });
  },
  setCurrentDutyStartTime: (currentDutyStartTime) => {
    set(() => ({
      currentDutyStartTime: currentDutyStartTime,
    }));
  },
}));
