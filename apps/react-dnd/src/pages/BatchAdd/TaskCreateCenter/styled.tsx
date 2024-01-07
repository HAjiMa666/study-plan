import { css } from '@emotion/react';
import styled from '@emotion/styled';

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  width: 60vw;
  flex: 1;
`;
export const PersonDragWrapper = styled.div`
  flex-basis: 286px;
  flex-shrink: 0;
`;

export const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s ease-in-out;
  .ant-form-item {
    margin-bottom: 0;
  }
`;

export const box = css`
  width: 50px;
  height: 20px;
  text-align: center;
  line-height: 20px;
`;

export const TableHeadWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 54px;
  position: relative;
  background-color: #fafafa;
  border-bottom: 1px solid #d9d9d9;
`;

export const TableCell = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: 100%;
  font-size: 14px;
  color: #262626;
  font-weight: bolder;
  ${flexCenter}
  justify-content: start;
`;

export const FixedColumns = styled(TableCell)`
  position: sticky;
  right: 0;
  top: 0;
  bottom: 0;
  width: 80px;
  flex-shrink: 0;
  padding-left: 12px;
  box-shadow: -19px -1px 18px -12px rgba(105, 102, 105, 0.49);
  background-color: #fff;
`;

export const SingleGroupWrapper = styled.div`
  position: relative;
  padding-left: 84px;
`;

export const Line = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  background-color: red;
  height: 2px;
`;
