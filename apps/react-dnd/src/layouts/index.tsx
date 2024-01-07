import { ConfigProvider, Button } from "antd";
import { css } from "@emotion/css";
import { Link, Outlet } from "umi";

export default function Layout() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorLink: "#fff",
        },
      }}>
      <Button type="link">
        <Link to="/">React Dnd 拖拽 Demo</Link>
      </Button>
      <Button type="link">
        <Link to="/docs"> 项目例子</Link>
      </Button>
      <Button type="link">
        <Link to="/list">列表滚动例子</Link>
      </Button>
      <Button type="link">
        <Link to="/gridDragDrop">网格拖拽例子</Link>
      </Button>
      <div
        className={css`
          margin-top: 16px;
        `}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
