"use client"

import { InvestorsDataTable } from "@/components/ui/investors-data-table";
import { onchainInteractionTableColumns } from "./../tableColumns/OnchainInteractionsTableColumns";
import { usePathname, useRouter } from "next/navigation";

export default function OnchainInteractionsTable() {
  const data: any = [{
    id: "1",
    txHash: "0x000ds4535436792435451",
    age: "2023-10-04T08:23:00Z",
    from: "0xAuth1",
    to: "0xAuth[0x000...5451]",
    operation: "Claim"
  },
  {
    id: "2",
    txHash: "0x000ds4535436792435452",
    age: "2023-10-04T07:55:00Z",
    from: "0xAuth2",
    to: "0xAuth[0x000...5452]",
    operation: "Read"
  },
  {
    id: "3",
    txHash: "0x000ds4535436792435453",
    age: "2023-10-04T10:00:00Z",
    from: "0xAuth3",
    to: "0xAuth[0x000...5453]",
    operation: "Write"
  },
  {
    id: "4",
    txHash: "0x000ds4535436792435454",
    age: "2023-10-04T09:15:00Z",
    from: "0xAuth4",
    to: "0xAuth[0x000...5454]",
    operation: "Claim"
  },
  {
    id: "5",
    txHash: "0x000ds4535436792435455",
    age: "2023-10-04T11:45:00Z",
    from: "0xAuth5",
    to: "0xAuth[0x000...5455]",
    operation: "Transfer"
  },
  {
    id: "6",
    txHash: "0x000ds4535436792435456",
    age: "2023-10-03T13:30:00Z",
    from: "0xAuth6",
    to: "0xAuth[0x000...5456]",
    operation: "Read"
  },
  {
    id: "7",
    txHash: "0x000ds4535436792435457",
    age: "2023-10-04T05:20:00Z",
    from: "0xAuth7",
    to: "0xAuth[0x000...5457]",
    operation: "Write"
  },
  {
    id: "8",
    txHash: "0x000ds4535436792435458",
    age: "2023-10-04T12:00:00Z",
    from: "0xAuth8",
    to: "0xAuth[0x000...5458]",
    operation: "Transfer"
  },
  {
    id: "9",
    txHash: "0x000ds4535436792435459",
    age: "2023-10-03T16:45:00Z",
    from: "0xAuth9",
    to: "0xAuth[0x000...5459]",
    operation: "Claim"
  },
  {
    id: "10",
    txHash: "0x000ds4535436792435460",
    age: "2023-10-04T06:05:00Z",
    from: "0xAuth10",
    to: "0xAuth[0x000...5460]",
    operation: "Read"
  }]

  const onRowClickAction = (row: any) => {
    console.log(row)
  }

  return (
    <div className="">
      <InvestorsDataTable columns={onchainInteractionTableColumns} data={data} onRowClick={onRowClickAction} searchFilterText="txHash" />
    </div>
  )
}