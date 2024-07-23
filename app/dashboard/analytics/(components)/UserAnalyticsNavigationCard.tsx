"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChainIcon } from "@/svg-icons/ChainIcon"
import { OffchainIcon } from "@/svg-icons/OffchainIcon"
import { useState } from "react";
import UsersTable from "./UsersTable";

export default function UserAnalyticsNavigationCard() {

  const [selectedTab, setSelectedTab] = useState<
    "ACCEPTED" | "REJECTED"
  >("ACCEPTED");

  const TABS: { label: string, value: "ACCEPTED" | "REJECTED", icon: any }[] = [
    { label: "Accepted Users", value: "ACCEPTED", icon: <ChainIcon /> },
    { label: "Rejected Users", value: "REJECTED", icon: <OffchainIcon /> }
  ]

  return (
    <Card className="w-full max-w-full">
      <CardHeader className="p-0 border-b">
        <div className="flex">
          {
            TABS.map((tab) => (
              <div
                key={tab.value}
                className={`flex flex-grow items-center justify-center gap-2 p-4 hover:cursor-pointer ${selectedTab === tab.value ? "border-b-2 border-color-primaryHover text-color-primary" : "text-color-secondary"
                  }`}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.icon}
                <p className="text-sm font-semibold">{tab.label}</p>
              </div>
            ))
          }
        </div>
      </CardHeader>

      <CardContent className="mx-0 px-0 flex flex-col gap-[40px]">
        <UsersTable tab={selectedTab} />
        {/* {selectedTab === "ACCEPTED" && <UsersTable />}
        {selectedTab === "REJECTED" && <UsersTable />} */}
      </CardContent>
    </Card>
  )
}