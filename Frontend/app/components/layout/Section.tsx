"use client";

import React from "react";

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export default function Section({
  title,
  description,
  children,
  className,
  actions,
}: SectionProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      {/* Header */}
      {(title || actions) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>

          {actions && <div>{actions}</div>}
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-xl border shadow-sm p-4">
        {children}
      </div>
    </section>
  );
}