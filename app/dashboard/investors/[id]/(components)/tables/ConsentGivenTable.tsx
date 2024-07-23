"use client"

import { InvestorsDataTable } from "@/components/ui/investors-data-table";
import { consentGivenTableColumns } from "./../tableColumns/ConsentGivenTableColumns";
import { usePathname, useRouter } from "next/navigation";

export default function ConsentGivenTable() {
  const data: any = [{
    id: "1",
    operationId: "0x000ds4535436792435451",
    age: "2023-10-04T08:23:00Z",
    claims: "Identity",
    rules: "0xAuth1",
    requiredData: "First name, Last name",
    verificationResult: "Approved"
  },
  {
    id: "2",
    operationId: "0x000ds4535436792435452",
    age: "2023-10-04T07:55:00Z",
    claims: "Health",
    rules: "0xAuth2",
    requiredData: "Date of birth, Health ID",
    verificationResult: "Pending"
  },
  {
    id: "3",
    operationId: "0x000ds4535436792435453",
    age: "2023-10-04T10:00:00Z",
    claims: "Education",
    rules: "0xAuth3",
    requiredData: "Degree, University",
    verificationResult: "Failed"
  },
  {
    id: "4",
    operationId: "0x000ds4535436792435454",
    age: "2023-10-04T09:15:00Z",
    claims: "Finance",
    rules: "0xAuth4",
    requiredData: "Account number, Bank name",
    verificationResult: "Approved"
  },
  {
    id: "5",
    operationId: "0x000ds4535436792435455",
    age: "2023-10-04T11:45:00Z",
    claims: "Employment",
    rules: "0xAuth5",
    requiredData: "Employee ID, Company name",
    verificationResult: "Pending"
  },
  {
    id: "6",
    operationId: "0x000ds4535436792435456",
    age: "2023-10-03T13:30:00Z",
    claims: "Insurance",
    rules: "0xAuth6",
    requiredData: "Policy number, Provider",
    verificationResult: "Approved"
  },
  {
    id: "7",
    operationId: "0x000ds4535436792435457",
    age: "2023-10-04T05:20:00Z",
    claims: "Travel",
    rules: "0xAuth7",
    requiredData: "Passport number, Visa",
    verificationResult: "Failed"
  },
  {
    id: "8",
    operationId: "0x000ds4535436792435458",
    age: "2023-10-04T12:00:00Z",
    claims: "Legal",
    rules: "0xAuth8",
    requiredData: "Lawyer ID, Case number",
    verificationResult: "Approved"
  },
  {
    id: "9",
    operationId: "0x000ds4535436792435459",
    age: "2023-10-03T16:45:00Z",
    claims: "Security",
    rules: "0xAuth9",
    requiredData: "Access level, Security ID",
    verificationResult: "Pending"
  },
  {
    id: "10",
    operationId: "0x000ds4535436792435460",
    age: "2023-10-04T06:05:00Z",
    claims: "Education",
    rules: "0xAuth10",
    requiredData: "Student ID, Graduation year",
    verificationResult: "Approved"
  }]

  const onRowClickAction = (row: any) => {
    console.log(row)
  }

  return (
    <div className="">
      <InvestorsDataTable columns={consentGivenTableColumns} data={data} onRowClick={onRowClickAction} searchFilterText="operationId" />
    </div>
  )
}