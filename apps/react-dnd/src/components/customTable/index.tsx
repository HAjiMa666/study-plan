import { Space } from 'antd-mobile'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import { FC, memo, useEffect, useMemo, useRef } from 'react'
import { getWeekNumber } from './utils'
import { columns, data } from './config'
import {
  CustomTableWrapper,
  FixedHeadWrapper,
  FixedLeftCell,
  FixedLeftWrapper,
  TBodyWrapper,
  TCellWrapper,
  THeadWrapper,
  THeaderWrapper,
  TRowWrapper,
  TableWrapper
} from './style'

// interface CustomTableProps {
//   // data: any
//   // dutyStartTime: any
// }

const CustomTable = memo(props => {
  const tableRef = useRef<any>(null)
  const headYRef = useRef<any>(null)
  const LeftXRef = useRef<any>(null)
  // const { data, dutyStartTime } = props
  const dutyStartTime = data?.dutyStartDate

  const dataWeek = useMemo(() => {
    const value = data?.dataList?.map(item => item.detailList)?.flat()
    const week = value?.map((item: any) => {
      console.log('ccc', item?.dateStart, dutyStartTime, value)
      const curWeek = getWeekNumber(
        dayjs(item?.dateStart),
        dayjs(dutyStartTime)
      )
      return curWeek
    })
    return week
  }, [data, dutyStartTime])

  useEffect(() => {
    const tableEle = tableRef.current
    const headEle = headYRef.current
    const leftEle = LeftXRef.current
    if (!tableEle || !headEle) return
    const handleScroll = (e: any) => {
      const tableScrollLeft = e.target?.scrollLeft
      const tableScrollTop = e.target?.scrollTop
      headEle.scrollLeft = tableScrollLeft
      leftEle.scrollTop = tableScrollTop
    }
    tableRef.current.addEventListener('scroll', handleScroll)
    return () => {
      if (!tableEle) return
      tableEle.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* <FixedHeadWrapper ref={headYRef}>
        {columns.map(item => {
          return (
            <div
              key={item.title}
              className="cell"
              style={{ width: item.width, height: 55 }}
            >
              {item.title}
            </div>
          )
        })}
      </FixedHeadWrapper> */}
      {/* <THeaderWrapper
        style={{
          position: 'absolute',
          top: 71,
          left: 0,
          zIndex: 3,
          height: 54
        }}
      >
        日期
      </THeaderWrapper> */}
      {/* <FixedLeftWrapper ref={LeftXRef}>
        {data?.dataList?.map(group => {
          return group.detailList?.map((item, index) => {
            const lastDataWeek = dataWeek[index - 1]
            let firstRow: number | null = null
            if (!lastDataWeek || lastDataWeek !== dataWeek[index])
              firstRow = dataWeek[index]
            if (firstRow) {
              const groupLength = dataWeek?.filter?.(
                item => item === firstRow
              )?.length
              console.log('groupLength', groupLength, dataWeek, firstRow)
              return (
                <FixedLeftCell
                  key={nanoid()}
                  length={groupLength}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Space direction="vertical">
                    <div>第{firstRow}周</div>
                    <div>
                      {dayjs(item.startDate).weekday(0)?.format('MM.DD')}-
                      {dayjs(item.startDate).weekday(6)?.format('MM.DD')}
                    </div>
                  </Space>
                </FixedLeftCell>
              )
            } else return null
          })
        })}
      </FixedLeftWrapper> */}
      <CustomTableWrapper ref={tableRef}>
        <TableWrapper>
          <THeadWrapper>
            <TRowWrapper>
              {columns.map(item => {
                return (
                  <th key={item.title}>
                    <THeaderWrapper
                      style={{
                        width: item.width,
                        height: 56
                        // transform: 'translateY(1px)'
                      }}
                    >
                      {item.title}
                    </THeaderWrapper>
                  </th>
                )
              })}
            </TRowWrapper>
          </THeadWrapper>
          <TBodyWrapper>
            {data?.dataList?.map(group => {
              return group.detailList?.map(item => {
                return (
                  <TRowWrapper key={nanoid()}>
                    {columns.map(column => {
                      console.log('column', item[column.dataIndex])
                      if (column.dataIndex === 'chargeUserList') {
                        return (
                          <td key={column.dataIndex}>
                            <TCellWrapper>
                              {item[column.dataIndex]
                                ?.map(item => item.name)
                                ?.join(',')}
                            </TCellWrapper>
                          </td>
                        )
                      }
                      if (column.dataIndex === 'time') {
                        console.log('item', item)
                        return (
                          <td key={column.dataIndex}>
                            <TCellWrapper style={{ width: column.width }}>
                              <Space direction="vertical">
                                <div>
                                  {dayjs(item.startDate)?.format('YYYY/MM/DD')}-
                                  {dayjs(item.endDate)?.format('YYYY/MM/DD')}
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                  {dayjs(
                                    `${item.startDate} ${item.startTime}`
                                  )?.format('HH:mm')}
                                  -
                                  {dayjs(
                                    `${item.endDate} ${item.endTime}`
                                  )?.format('HH:mm')}
                                </div>
                              </Space>
                            </TCellWrapper>
                          </td>
                        )
                      }
                      return (
                        <td key={column.dataIndex}>
                          <TCellWrapper>{item[column.dataIndex]}</TCellWrapper>
                        </td>
                      )
                    })}
                  </TRowWrapper>
                )
              })
            })}
          </TBodyWrapper>
        </TableWrapper>
      </CustomTableWrapper>
    </>
  )
})

export default CustomTable
