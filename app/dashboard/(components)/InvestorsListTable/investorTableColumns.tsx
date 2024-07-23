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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Investors = {
  id: string
  name: string
  walletAddress: string
  investorType: string
  business: boolean
  residency: string
  nationality: string
  status: "Verified" | "Rejected" | "Expired"
}

export const investorTableColumns: ColumnDef<Investors>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-left items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {row.original.name}
        </div>

      )
    },
  },
  {
    accessorKey: "walletAddress",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Wallet Address
        </p>
      )
    }
  },
  {
    accessorKey: "investorType",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Type
        </p>
      )
    }
  },
  {
    accessorKey: "business",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Business
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className={`flex justify-center items-center text-color-primary w-fit font-medium rounded-3xl px-3 py-2 ${row.original.business === true ? "bg-[#D4F8D3]" : "bg-[#FBE7E9]"}`}>
          {row.original.business ? <div className="flex w-fit justify-center items-center gap-2"><Check className="w-4 h-4" /> Yes</div> : <div className="flex w-fit gap-2  justify-center items-center"><X className="w-4 h-4" /> No</div>}
        </div>
      )
    },
  },
  {
    accessorKey: "residency",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Residency
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex justify-center items-center w-fit">
                <Image src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${row.original.residency}.svg`} width={26} height={26} alt="flag" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.original.residency}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Nationality
        </p>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Status
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className={`flex justify-center items-center text-color-primary w-fit font-medium rounded-3xl px-3 py-2 ${row.original.status === "Rejected" ? "bg-[#FBE7E9]" : row.original.status === "Verified" ? "bg-[#e6efff]" : "bg-[#FFF0BB]"}`}>
          {row.original.status}
        </div>
      )
    },
  },
  {
    accessorKey: "refreshAccount",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Refresh Status
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <>
        {row.original.status==="Expired" && <div className="flex justify-center items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex justify-center items-center outline outline-1 outline-color-tertiary w-10 h-10 p-2 rounded-lg bg-white" onClick={(e) => {
                  e.stopPropagation()
                  console.log("refresh status account", row.original.id)
                }}>
                  <RefreshIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Re-verify</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>}
        </>
      )
    },
  },
  {
    accessorKey: "downloadAccount",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Download
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex justify-center items-center outline outline-1 outline-color-tertiary w-10 h-10 p-2 rounded-lg bg-white" onClick={(e) => {
                  e.stopPropagation()
                  console.log("download", row.original.id)
                }
                }>
                  <DownloadIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
