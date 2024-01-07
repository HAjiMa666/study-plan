import { css } from '@emotion/react'
import styled from '@emotion/styled'

const cellCommonCss = css`
  width: 150px;
  height: 80px;
  font-size: 16px;
  line-height: 22px;
  padding: 14px;
  box-sizing: border-box;
`

export const CustomTableWrapper = styled.div`
  max-height: 400px;
  overflow: auto;
  /* transform: translateY(-474px); */
  /* transform: translateY(-58px); */
`

export const TableWrapper = styled.table`
  position: relative;
  border: 1px solid #f1f1f1;
  border-spacing: 0px;
  border-collapse: collapse;
  th,td,tr{
    margin: 0;
    padding: 0;
    border: 1px solid #D9D9D9;
  }
`

export const THeadWrapper = styled.thead``

export const TBodyWrapper = styled.tbody``

export const TRowWrapper = styled.tr`
`

export const THeaderWrapper = styled.div`
  ${cellCommonCss}
  width: 100%;
  font-weight: 500;
  color: #262626;
  background-color: #eeeeee;
  text-align: left;
`

export const TCellWrapper = styled.div<{ length?: number }>`
  ${cellCommonCss}
  display: flex;
  justify-content: center;
  align-items: center;
  height:${props => `${80 * props.length}px`};
  color: #595959;
  border-bottom: 1px solid #f1f1f1;
  border-collapse: collapse;
`

export const FixedHeadWrapper = styled.div`
  display: flex;
  max-width: 948px;
  overflow: auto;
  position: relative;
  z-index: 2;
  margin-right: 15px;
  &::-webkit-scrollbar {
    display: none;
  }

  .cell {
    ${cellCommonCss}
    font-weight: 500;
    flex-shrink: 0;
    color: #262626;
    height: 58px;
    background-color: #eeeeee;
    text-align: left;
  }
`

export const FixedLeftWrapper = styled.div`
  width: 150px;
  max-height: 330px;
  overflow: auto;
  position: absolute;
  z-index: 1;
  top: 124px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const FixedLeftCell = styled(TCellWrapper)`
  background-color: #fff;
`
