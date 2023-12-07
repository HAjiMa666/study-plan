import Link from "next/link";
import React, { FC, memo } from "react";

type MenuItemProps = {
  name: string;
  path: string;
};

const MenuItem: FC<MenuItemProps> = memo((props) => {
  const { name, path } = props;
  return (
    <Link href={path}>
      <div className="h-12 bg-slate-600 hover:bg-slate-800 rounded-xl flex justify-center items-center m-2 transition-all">
        {name}
      </div>
    </Link>
  );
});

export default MenuItem;
