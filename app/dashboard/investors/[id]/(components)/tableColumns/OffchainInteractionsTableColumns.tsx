"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OffchainInteractionsType = {
  id: string
  operationId: string
  age: string
  operation: string
  claim: string
}

export const offchainInteractionTableColumns: ColumnDef<OffchainInteractionsType>[] = [
  {
    accessorKey: "operationId",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Operation ID
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.original.operationId}
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
          {timeAgo(row.original.age)}
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
  {
    accessorKey: "claim",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Claim
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-color-primary">
          {row.original.claim}
        </p>
      )
    }
  },
]
