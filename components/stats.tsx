import React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import NumberTicker from "./ui/number-ticker"

export interface StatItem {
  label: string
  value: string | number
  icon?: React.ReactNode
  description?: string
}

interface StatsProps {
  items: StatItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function Stats({ items, columns = 3, className }: StatsProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex flex-row gap-5 items-center">
              {item.icon && (
                <div className="text-muted-foreground">{item.icon}</div>
              )}
              <div className="text-3xl font-black">
                <NumberTicker value={Number(item.value)} direction="up" />
              </div>
            </CardTitle>
            <CardDescription>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
