"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, Mail } from "lucide-react";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "librarian" | "user";
  avatarUrl?: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function UserCard({
  id,
  name,
  email,
  role = "user",
  avatarUrl,
  onView,
  onEdit,
}: UserCardProps) {
  return (
    <Card className="rounded-xl border shadow-sm hover:shadow-md transition">
      <CardContent className="p-4 flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <img src={avatarUrl} className="w-full h-full object-cover" />
          ) : (
            <User className="text-gray-400" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-semibold flex items-center gap-2">
            {name}
            {role === "admin" && <Shield className="w-4 h-4 text-red-500" />}
          </h3>

          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="w-3 h-3" /> {email}
          </p>

          <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
            {role}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {onView && (
            <Button size="sm" variant="outline" onClick={() => onView(id)}>
              View
            </Button>
          )}

          {onEdit && (
            <Button size="sm" variant="outline" onClick={() => onEdit(id)}>
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}