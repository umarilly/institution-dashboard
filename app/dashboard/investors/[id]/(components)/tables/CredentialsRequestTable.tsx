"use client"

import { InvestorsDataTable } from "@/components/ui/investors-data-table";
import { credentialsRequestTableColumns } from "./../tableColumns/CredentialsRequestTableColumns";
import { usePathname, useRouter } from "next/navigation";

export default function CredentialsRequestTable() {
  const data: any = [{
    id: "1",
    operationId: "0x000ds4535436792435451",
    claimRequested: "Identity",
    requiredDetails: "First name, Last name",
    proofShortForm: "eyJhbGciOiJFUzI1NksifQ.eyJjaXJjdWl0X2lk...",
    verificationResult: "Success"
  },
  {
    id: "2",
    operationId: "0x000ds4535436792435452",
    claimRequested: "Health",
    requiredDetails: "Date of birth, Health ID",
    proofShortForm: "eyJhbGciOiJFUzI2NksifQ.eyJjaXJjdWl0X2lp...",
    verificationResult: "Pending"
  },
  {
    id: "3",
    operationId: "0x000ds4535436792435453",
    claimRequested: "Education",
    requiredDetails: "Degree, University",
    proofShortForm: "eyJhbGciOiJFUzI3NksifQ.eyJjaXJjdWl0X2lq...",
    verificationResult: "Failed"
  },
  {
    id: "4",
    operationId: "0x000ds4535436792435454",
    claimRequested: "Finance",
    requiredDetails: "Account number, Bank name",
    proofShortForm: "eyJhbGciOiJFUzI8NksifQ.eyJjaXJjdWl0X2lr...",
    verificationResult: "Success"
  },
  {
    id: "5",
    operationId: "0x000ds4535436792435455",
    claimRequested: "Employment",
    requiredDetails: "Employee ID, Company name",
    proofShortForm: "eyJhbGciOiJFUzI9NksifQ.eyJjaXJjdWl0X2ls...",
    verificationResult: "Pending"
  },
  {
    id: "6",
    operationId: "0x000ds4535436792435456",
    claimRequested: "Insurance",
    requiredDetails: "Policy number, Provider",
    proofShortForm: "eyJhbGciOiJFUzI0NksifQ.eyJjaXJjdWl0X2lt...",
    verificationResult: "Success"
  },
  {
    id: "7",
    operationId: "0x000ds4535436792435457",
    claimRequested: "Travel",
    requiredDetails: "Passport number, Visa",
    proofShortForm: "eyJhbGciOiJFUzI3NksifQ.eyJjaXJjdWl0X2lu...",
    verificationResult: "Failed"
  },
  {
    id: "8",
    operationId: "0x000ds4535436792435458",
    claimRequested: "Legal",
    requiredDetails: "Lawyer ID, Case number",
    proofShortForm: "eyJhbGciOiJFUzI1NksifQ.eyJjaXJjdWl0X2lv...",
    verificationResult: "Success"
  },
  {
    id: "9",
    operationId: "0x000ds4535436792435459",
    claimRequested: "Security",
    requiredDetails: "Access level, Security ID",
    proofShortForm: "eyJhbGciOiJFUzI6NksifQ.eyJjaXJjdWl0X2lp...",
    verificationResult: "Pending"
  },
  {
    id: "10",
    operationId: "0x000ds4535436792435460",
    claimRequested: "Education",
    requiredDetails: "Student ID, Graduation year",
    proofShortForm: "eyJhbGciOiJFUzI5NksifQ.eyJjaXJjdWl0X2lq...",
    verificationResult: "Success"
  }]

  const onRowClickAction = (row: any) => {
    console.log(row)
  }

  return (
    <div className="">
      <InvestorsDataTable columns={credentialsRequestTableColumns} data={data} onRowClick={onRowClickAction} searchFilterText="operationId" />
    </div>
  )
}