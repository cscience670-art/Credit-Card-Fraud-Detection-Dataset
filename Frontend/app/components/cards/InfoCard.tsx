"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  color?: "blue" | "green" | "red" | "yellow" | "gray";
}

export default function InfoCard({
  title,
  value,
  icon: Icon,
  description,
  color = "blue",
}: InfoCardProps) {
  const colors = {
    blue: "text-blue-500",
    green: "text-green-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
    gray: "text-gray-500",
  };

  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-gray-500">{title}</CardTitle>

        {Icon && <Icon className={`w-5 h-5 ${colors[color]}`} />}
      </CardHeader>

      <CardContent>
        <div className="text-xl font-bold">{value}</div>

        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}