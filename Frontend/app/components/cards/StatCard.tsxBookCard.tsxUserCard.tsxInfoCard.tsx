"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={`shadow-sm border rounded-xl ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>

        <Icon className="w-5 h-5 text-blue-500" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}

        {trend && (
          <p
            className={`text-xs mt-2 ${
              trend.isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend.isPositive ? "▲" : "▼"} {trend.value}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}