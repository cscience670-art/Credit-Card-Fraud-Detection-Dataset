"use client";

import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DataItem = {
  name: string;
  value: number;
};

interface Props {
  title?: string;
  data: DataItem[];
  color?: string;
}

export default function BarChart({
  title = "Bar Chart",
  data,
  color = "#3b82f6",
}: Props) {
  return (
    <div className="w-full h-[320px] bg-white p-4 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height="85%">
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}