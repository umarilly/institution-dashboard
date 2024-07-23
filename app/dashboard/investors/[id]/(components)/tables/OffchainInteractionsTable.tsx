"use client"

import { InvestorsDataTable } from "@/components/ui/investors-data-table";
import { offchainInteractionTableColumns } from "./../tableColumns/OffchainInteractionsTableColumns";


export default function OffchainInteractionsTable() {
  const data: any = [{
    id: "1",
    operationId: "0x000ds4535436792435451",
    age: "2023-10-04T08:23:00Z",
    operation: "VC Generation",
    claim: "Identity"
  },
  {
    id: "2",
    operationId: "0x000ds4535436792435452",
    age: "2023-10-04T07:55:00Z",
    operation: "Data Provision",
    claim: "Health"
  },
  {
    id: "3",
    operationId: "0x000ds4535436792435453",
    age: "2023-10-04T10:00:00Z",
    operation: "Service Access",
    claim: "Education"
  },
  {
    id: "4",
    operationId: "0x000ds4535436792435454",
    age: "2023-10-04T09:15:00Z",
    operation: "Authentication",
    claim: "Security"
  },
  {
    id: "5",
    operationId: "0x000ds4535436792435455",
    age: "2023-10-04T11:45:00Z",
    operation: "Data Verification",
    claim: "Finance"
  },
  {
    id: "6",
    operationId: "0x000ds4535436792435456",
    age: "2023-10-03T13:30:00Z",
    operation: "VC Generation",
    claim: "Identity"
  },
  {
    id: "7",
    operationId: "0x000ds4535436792435457",
    age: "2023-10-04T05:20:00Z",
    operation: "Service Access",
    claim: "Travel"
  },
  {
    id: "8",
    operationId: "0x000ds4535436792435458",
    age: "2023-10-04T12:00:00Z",
    operation: "Data Provision",
    claim: "Insurance"
  },
  {
    id: "9",
    operationId: "0x000ds4535436792435459",
    age: "2023-10-03T16:45:00Z",
    operation: "Data Verification",
    claim: "Employment"
  },
  {
    id: "10",
    operationId: "0x000ds4535436792435460",
    age: "2023-10-04T06:05:00Z",
    operation: "Authentication",
    claim: "Legal"
  }]

  const onRowClickAction = (row: any) => {
    console.log(row)
  }

  return (
    <div className="">
      <InvestorsDataTable columns={offchainInteractionTableColumns} data={data} onRowClick={onRowClickAction} searchFilterText="operationId" />
    </div>
  )
}