"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Bookmark, DollarSign } from "lucide-react";

type Stats = {
  totalBooks: number;
  totalUsers: number;
  totalBorrowed: number;
  totalFines: number;
};

interface Props {
  data: Stats;
}

export default function StatsOverview({ data }: Props) {
  const stats = [
    {
      title: "Books",
      value: data.totalBooks,
      icon: BookOpen,
    },
    {
      title: "Users",
      value: data.totalUsers,
      icon: Users,
    },
    {
      title: "Borrowed",
      value: data.totalBorrowed,
      icon: Bookmark,
    },
    {
      title: "Fines",
      value: data.totalFines,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, i) => (
        <Card key={i} className="shadow-sm border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-gray-500">
              {item.title}
            </CardTitle>
            <item.icon className="w-5 h-5 text-blue-500" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}