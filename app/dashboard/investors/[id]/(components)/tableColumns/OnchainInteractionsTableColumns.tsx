
"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OnchainInteractionsType = {
  id: string
  txHash: string
  age: string
  from: string
  to: string
  operation: string
}

export const onchainInteractionTableColumns: ColumnDef<OnchainInteractionsType>[] = [
  {
    accessorKey: "txHash",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Txn Hash
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.original.txHash}
        </p>
      )
    }
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Age
        </p>
      )
    },
    cell: ({ row }) => {
      function timeAgo(utcTime: string): string {
        const now = new Date();
        const past = new Date(utcTime);
        const diffMs = now.getTime() - past.getTime();

        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        const days = diffDays > 0 ? `${diffDays} days ` : '';
        const hrs = diffHours > 0 ? `${diffHours} hrs ` : '';
        const mins = diffMinutes > 0 ? `${diffMinutes} mins ` : '';
        const secs = diffSeconds > 0 ? `${diffSeconds} secs ` : '';

        return `${days}${hrs}${mins}${secs}ago`.trim();
      }

      return (
        <p className="font-medium">
          {timeAgo(row.original.age)} days
        </p>
      )
    }
  },
  {
    accessorKey: "from",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          From
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-color-primary">
          {row.original.from}
        </p>
      )
    }
  },
  {
    accessorKey: "to",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          To
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-color-primary">
          {row.original.to}
        </p>
      )
    }
  },
  {
    accessorKey: "operation",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Operation
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-color-primary">
          {row.original.operation}
        </p>
      )
    }
  },
]