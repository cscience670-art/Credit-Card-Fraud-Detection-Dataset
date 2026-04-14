"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit, Trash } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  category?: string;
  coverUrl?: string;
  available?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function BookCard({
  id,
  title,
  author,
  category,
  coverUrl,
  available = true,
  onEdit,
  onDelete,
  onView,
}: BookCardProps) {
  return (
    <Card className="rounded-xl shadow-sm border hover:shadow-md transition">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Cover */}
          <div className="w-16 h-20 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <BookOpen className="text-gray-400" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{author}</p>

            {category && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {category}
              </span>
            )}

            <p
              className={`text-xs mt-1 ${
                available ? "text-green-600" : "text-red-500"
              }`}
            >
              {available ? "Available" : "Borrowed"}
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              {onView && (
                <Button size="sm" variant="outline" onClick={() => onView(id)}>
                  View
                </Button>
              )}

              {onEdit && (
                <Button size="sm" variant="outline" onClick={() => onEdit(id)}>
                  <Edit className="w-4 h-4" />
                </Button>
              )}

              {onDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}