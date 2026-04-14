"use client";

import { useEffect, useState } from "react";

type ErrorType = "error" | "warning" | "info" | "success";

type Props = {
  type?: ErrorType;
  title?: string;
  message: string;
  duration?: number; // auto hide time
  onClose?: () => void;
};

export default function ErrorMessage({
  type = "error",
  title,
  message,
  duration,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(true);

  // ⏳ Auto hide
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  // 🎨 Styles per type
  const styles = {
    error: "bg-red-100 text-red-700 border-red-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
    success: "bg-green-100 text-green-700 border-green-400",
  };

  // 🎯 Icons
  const icons = {
    error: "⛔",
    warning: "⚠️",
    info: "ℹ️",
    success: "✅",
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg shadow-sm transition-all animate-fade-in ${styles[type]}`}
    >
      {/* Icon */}
      <div className="text-xl">{icons[type]}</div>

      {/* Content */}
      <div className="flex-1">
        {title && <h4 className="font-bold">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>

      {/* Close */}
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="text-sm opacity-60 hover:opacity-100"
      >
        ✖
      </button>
    </div>
  );
}