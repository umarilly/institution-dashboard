"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ColumnDef } from "@tanstack/react-table"

export type UsersTableColumnsType = {
  id: string
  username: string
  type: string
  dateRegistered: string
}

export const usersTableColumns: ColumnDef<UsersTableColumnsType>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          User Name
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-start items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-medium">
            {row.original.username}
          </p>
        </div>
      )
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Type
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-color-primary py-1 px-3 rounded-2xl bg-color-tertiary w-fit">
          {row.original.type}
        </div>
      )
    }
  },
  {
    accessorKey: "dateRegistered",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Date Registered
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {new Date(row.original.dateRegistered).toDateString() + ", " + new Date(row.original.dateRegistered).toLocaleTimeString()}
        </p>
      )
    }
  },
]
