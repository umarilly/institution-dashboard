"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SystemLogsDataTable } from "@/components/ui/system-logs-data-table";
import { systemLogsTableColumns } from "./SystemLogsTableColumns";

export default function Home() {
  const data: any = [
    {
      id: "1",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 123 for franklin website",
      date: "2023-10-04T08:23:00Z"
    },
    {
      id: "2",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 124 for franklin website",
      date: "2023-10-04T07:55:00Z"
    },
    {
      id: "3",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 125 for franklin website",
      date: "2023-10-04T10:00:00Z"
    },
    {
      id: "4",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 126 for franklin website",
      date: "2023-10-04T09:15:00Z"
    },
    {
      id: "5",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 127 for franklin website",
      date: "2023-10-04T11:45:00Z"
    },
    {
      id: "6",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 128 for franklin website",
      date: "2023-10-03T13:30:00Z"
    },
    {
      id: "7",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 129 for franklin website",
      date: "2023-10-04T05:20:00Z"
    },
    {
      id: "8",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 130 for franklin website",
      date: "2023-10-04T12:00:00Z"
    },
    {
      id: "9",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 131 for franklin website",
      date: "2023-10-04T08:23:00Z"
    },
    {
      id: "10",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 132 for franklin website",
      date: "2023-10-04T07:55:00Z"
    },
    {
      id: "11",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 133 for franklin website",
      date: "2023-10-04T10:00:00Z"
    },
    {
      id: "12",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 134 for franklin website",
      date: "2023-10-04T09:15:00Z"
    },
    {
      id: "13",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 135 for franklin website",
      date: "2023-10-04T11:45:00Z"
    },
    {
      id: "14",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 136 for franklin website",
      date: "2023-10-03T13:30:00Z"
    },
    {
      id: "15",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 137 for franklin website",
      date: "2023-10-04T05:20:00Z"
    },
    {
      id: "16",
      eventBy: "System",
      eventType: "ZKP Requested",
      details: "ZKP Requested for user with ID 138 for franklin website",
      date: "2023-10-04T12:00:00Z"
    }
  ]

  const onRowClickAction = (row: any) => {
    console.log(row)
  }

  return (
    <div className="m-10">
      <Card className="w-full max-w-[1360px] xl:max-w-full">
        <CardHeader className="pb-0">
          <CardTitle className="font-bold">System Logs</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <SystemLogsDataTable columns={systemLogsTableColumns} data={data} onRowClick={onRowClickAction} searchFilterText="details" />
        </CardContent>

      </Card>
    </div>
  );
}
