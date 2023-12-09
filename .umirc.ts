import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/list", component: "list" },
    { path: "/gridDragDrop", component: "grid-drag-drop" },
  ],
  npmClient: "pnpm",
});
