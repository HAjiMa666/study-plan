import React, { FC, ReactNode, memo } from "react";
import c from "classnames";

import Card from "@/components/Card";

const overviewData = [
  {
    title: "今日收入",
    desc: "100 元",
  },
  {
    title: "今日支出",
    desc: "100 元",
  },
  {
    title: "本月收入",
    desc: "100 元",
  },
  {
    title: "本月支出",
    desc: "100 元",
  },
];

const DataOverview = memo(() => {
  return (
    <div className="flex justify-between">
      <Card cardTitle="今日收入" cardDescription="100元" />
      <Card cardTitle="今日收入" cardDescription="100元" />
      <Card cardTitle="今日收入" cardDescription="100元" />
      <Card cardTitle="今日收入" cardDescription="100元" />
    </div>
  );
});

export default DataOverview;
