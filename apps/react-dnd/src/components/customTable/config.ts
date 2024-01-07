export const columns = [
  {
    title: '日期',
    dataIndex: 'date'
  },
  {
    title: '值班内容',
    dataIndex: 'dutyContent'
  },
  {
    title: '时间',
    dataIndex: 'time',
    width: 250
  },
  {
    title: '地点',
    dataIndex: 'dutySiteName'
  },
  {
    title: '组长',
    dataIndex: 'chargeUserList'
  },
  {
    title: '组员',
    dataIndex: 'belongUserName'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  }
]

export const data = {
  dutyName: '测试值班信息数据1123',
  dutyStartDate: '2024-01-04',
  dutyEndDate: '2024-01-05',
  dataList: [
    {
      dateStart: '2024-01-01',
      dateEnd: '2024-01-07',
      dateIndex: 1,
      detailList: [
        {
          startDate: '2024-01-01',
          endDate: '2024-01-06',
          startTime: '03:23',
          endTime: '08:23',
          dutyContent: '33333',
          dutySiteId: 716,
          dutySiteName: '2222TEST',
          belongUserId: 6078968,
          belongUserName: '迮瑷玲',
          chargeUserList: [
            {
              id: 6098975,
              name: '花开值班人'
            },
            {
              id: 6098974,
              name: '花开管理员'
            }
          ],
          remark: '2222'
        },
        {
          startDate: '2024-01-01',
          endDate: '2024-01-06',
          startTime: '03:23',
          endTime: '08:23',
          dutyContent: '33333',
          dutySiteId: 716,
          dutySiteName: '2222TEST',
          belongUserId: 6077254,
          belongUserName: '吴富贵',
          chargeUserList: [
            {
              id: 6098975,
              name: '花开值班人'
            },
            {
              id: 6098974,
              name: '花开管理员'
            }
          ],
          remark: '2222'
        }
      ]
    }
  ]
}
