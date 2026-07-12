"use client";

import React from "react";
import {
  LineChart as ReLineChart,
  Line,
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

export default function LineChart({
  title = "Line Chart",
  data,
  color = "#10b981",
}: Props) {
  return (
    <div className="w-full h-[320px] bg-white p-4 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height="85%">
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}