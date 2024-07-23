"use client"

import { Button } from "@/components/ui/button"
import { DownloadIcon } from "@/svg-icons/DownloadIcon"
import { RefreshIcon } from "@/svg-icons/RefreshIcon"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, X, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import { RightArrow } from "@/svg-icons/SVGIcons"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SystemLogs = {
  id: string
  eventBy: string
  eventType: string
  details: string
  date: string
}

export const systemLogsTableColumns: ColumnDef<SystemLogs>[] = [
  {
    accessorKey: "activity",
    header: ({ column }) => {
      return (
        <div
          // variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold flex items-center"
        >
          Activity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row, cell }) => {
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-color-secondary">{row.original.eventBy}</div>
          <RightArrow />
          <div className="font-semibold text-color-primary">{row.original.eventType}</div>
        </div>
      )
    }
  },
  {
    accessorKey: "details",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Details
        </p>
      )
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Date
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="">{new Date(row.original.date).toDateString() + ", " + new Date(row.original.date).toLocaleTimeString()}</div>
        </div>
      )
    }
  },
]
