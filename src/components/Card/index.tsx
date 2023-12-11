import React, { FC, ReactNode, memo } from "react";
import c from "classnames";

import ZhangMu from "../../../public/assets/icons/zhangmu.svg";
import Image from "next/image";

type CardProps = {
  cardTitle: ReactNode;
  cardDescription: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = memo((props) => {
  const { cardTitle, cardDescription, className } = props;
  return (
    <div className={c("card w-72 bg-base-100 shadow-xl", className)}>
      <div className="flex">
        <ZhangMu fill="#fff" width={80} className="mx-4" />
        <div className={c("card-body pl-0")}>
          <h2 className={c("card-title")}>{cardTitle}</h2>
          <p>{cardDescription}</p>
        </div>
      </div>
    </div>
  );
});

export default Card;
