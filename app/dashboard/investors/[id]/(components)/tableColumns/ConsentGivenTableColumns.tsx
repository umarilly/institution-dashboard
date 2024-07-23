"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

export type ConsentGivenTableColumns = {
  id: string
  operationId: string
  age: string
  claims: string
  rules: string
  requiredData: string
  verificationResult: string
}

export const consentGivenTableColumns: ColumnDef<ConsentGivenTableColumns>[] = [
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
    accessorKey: "claims",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Claims
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-color-primary">
          {row.original.claims}
        </p>
      )
    }
  },
  {
    accessorKey: "rules",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Rules
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-color-primary">
          {row.original.rules}
        </p>
      )
    }
  },
  {
    accessorKey: "requiredData",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Required Data
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.original.requiredData}
        </p>
      )
    }
  },
  {
    accessorKey: "verificationResult",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Verification Result
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className={`flex text-xs justify-center items-center text-color-primary w-fit font-medium rounded-3xl px-3 py-2 ${row.original.verificationResult === "Approved" ? "bg-[#D4F8D3]" : "bg-[#FBE7E9]"}`}>
          {row.original.verificationResult === "Approved" ? <div className="flex w-fit justify-center items-center gap-2"><Check className="w-4 h-4" /> Approved</div> : <div className="flex w-fit gap-2  justify-center items-center"><X className="w-4 h-4" /> Denied</div>}
        </div>
      )
    }
  },
  {
    accessorKey: "Action",
    header: ({ column }) => {
      return (
        <p className="font-bold">

        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <Button className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-fit rounded-xl" size="lg">
          Revoke
        </Button>
      )
    }
  }
]