import { UsersDataTable } from "@/components/ui/users-data-table"
import { usersTableColumns } from "./UsersTableColumns"

export default function UsersTable({ tab }: {
  tab: "ACCEPTED" | "REJECTED"
}) {
  const data: any = [
    {
      id: "1",
      username: "John Doe",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T08:23:00Z"
    },
    {
      id: "2",
      username: "Jane Doe",
      type: "Accredited Investor",
      dateRegistered: "2023-10-04T07:55:00Z"
    },
    {
      id: "3",
      username: "John Smith",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T10:00:00Z"
    },
    {
      id: "4",
      username: "Jane Smith",
      type: "Accredited Investor",
      dateRegistered: "2023-10-04T09:15:00Z"
    },
    {
      id: "5",
      username: "John Doe",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T11:45:00Z"
    },
    {
      id: "6",
      username: "Jane Doe",
      type: "Accredited Investor",
      dateRegistered: "2023-10-03T13:30:00Z"
    },
    {
      id: "7",
      username: "John Smith",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T05:20:00Z"
    },
    {
      id: "8",
      username: "Jane Smith",
      type: "Accredited Investor",
      dateRegistered: "2023-10-04T12:00:00Z"
    },
    {
      id: "9",
      username: "John Doe",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T08:23:00Z"
    },
    {
      id: "10",
      username: "Jane Doe",
      type: "Accredited Investor",
      dateRegistered: "2023-10-04T07:55:00Z"
    },
    {
      id: "11",
      username: "John Smith",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T10:00:00Z"
    },
    {
      id: "12",
      username: "Jane Smith",
      type: "Accredited Investor",
      dateRegistered: "2023-10-04T09:15:00Z"
    },
    {
      id: "13",
      username: "John Doe",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T11:45:00Z"
    },
    {
      id: "14",
      username: "Jane Doe",
      type: "Accredited Investor",
      dateRegistered: "2023-10-03T13:30:00Z"
    },
    {
      id: "15",
      username: "John Smith",
      type: "Qualified Investor",
      dateRegistered: "2023-10-04T05:20:00Z"
    },
    {
      id: "16",
      username: "Jane Smith",
      type: "Accredited Investor",
      dateRegistered: "2023-10-04T12:00:00Z"
    },
  ]

  const onRowClickAction = (row: any) => {
    console.log(row)
  }

  return (
    <div className="">
      <UsersDataTable columns={usersTableColumns} data={data} onRowClick={onRowClickAction} searchFilterText="username" />
    </div>
  )
}