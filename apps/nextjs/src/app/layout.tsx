import type { Metadata } from "next";
import { Inter } from "next/font/google";
import c from "classnames";
import "@/app/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";

import { MenuItem } from "@/components";
import { menu } from "../../config/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "记账",
  description: "简单记账",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" id="__next">
      <body className={c(inter.className, "bg-white", "flex")}>
        <StyledEngineProvider injectFirst>
          <div className="container h-screen w-48 bg-slate-950">
            <h1 className="m-4 text-center text-2xl">记账-后台</h1>
            {menu.map((item) => {
              return (
                <MenuItem name={item.name} path={item.path} key={item.path} />
              );
            })}
          </div>
          <div className="content p-6 flex-1">{children}</div>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
