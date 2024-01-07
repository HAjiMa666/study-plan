import styled from "@emotion/styled";
import { css } from "@emotion/css";

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  .ant-form-item {
    margin-bottom: 0;
  }
`;

export const container = css``;

export const containerOver = css`
  .ant-select-selector {
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const box = css`
  width: 50px;
  height: 20px;
  border: 1px dashed #000;
  text-align: center;
  line-height: 20px;
`;
