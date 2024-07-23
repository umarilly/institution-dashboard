
"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ColumnDef } from "@tanstack/react-table"
import { Check, EyeIcon, X } from "lucide-react"

export type CredentialsRequestType = {
  id: string
  operationId: string
  claimRequested: string
  requiredDetails: string
  proofShortForm: string
  verificationResult: string
}

export const credentialsRequestTableColumns: ColumnDef<CredentialsRequestType>[] = [
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
    accessorKey: "claimRequested",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Claim Requested
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-color-primary">
          {row.original.claimRequested}
        </p>
      )
    }
  },
  {
    accessorKey: "requiredDetails",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Required Details
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.original.requiredDetails}
        </p>
      )
    }
  },
  {
    accessorKey: "proofShortForm",
    header: ({ column }) => {
      return (
        <p className="font-bold">
          Proof in short form
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex justify-center items-center w-fit rounded-xl bg-white border font-medium border-color-tertiary px-3 py-1.5 gap-2">
                <EyeIcon /> <p>Show full proof</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[180px] text-wrap break-words flex flex-col !p-2">
              <p className="!m-2">{row.original.proofShortForm}</p>

              <div className="flex justify-center items-center w-full">
                <Button className="!m-2 !p-2 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-full rounded-xl" size="sm">
                  Verify Proof
                </Button>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <div className={`flex text-xs justify-center items-center text-color-primary w-fit font-medium rounded-3xl px-3 py-2 ${row.original.verificationResult === "Success" ? "bg-[#D4F8D3]" : "bg-[#FBE7E9]"}`}>
          {row.original.verificationResult === "Success" ? <div className="flex w-fit justify-center items-center gap-2"><Check className="w-4 h-4" /> Success</div> : <div className="flex w-fit gap-2  justify-center items-center"><X className="w-4 h-4" /> Rejected</div>}
        </div>
      )
    }
  },
]
