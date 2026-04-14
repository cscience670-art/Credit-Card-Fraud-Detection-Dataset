"use client";

import React from "react";
import MainLayout from "./MainLayout";

interface DashboardLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export default function DashboardLayout({
  children,
  header,
}: DashboardLayoutProps) {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Optional Header Section */}
        {header && (
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            {header}
          </div>
        )}

        {/* Dashboard Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </MainLayout>
  );
}