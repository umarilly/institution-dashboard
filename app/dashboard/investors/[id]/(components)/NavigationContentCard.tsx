"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeftArrow } from "@/svg-icons/SVGIcons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChainIcon } from "@/svg-icons/ChainIcon";
import { OffchainIcon } from "@/svg-icons/OffchainIcon";
import { CredsIcon } from "@/svg-icons/CredsIcon";
import { GuardIcon } from "@/svg-icons/GuardIcon";
import InvestorsListTable from "@/app/dashboard/(components)/InvestorsListTable/InvestorsListTable";
import OnchainInteractionsTable from "./tables/OnchainInteractionsTable";
import OffchainInteractionsTable from "./tables/OffchainInteractionsTable";
import CredentialsRequestTable from "./tables/CredentialsRequestTable";
import ConsentGivenTable from "./tables/ConsentGivenTable";

export default function NavigationContentCard({ params }: { params: { id: string } }) {

  const [selectedTab, setSelectedTab] = useState<
    "ONCHAIN" | "OFFCHAIN" | "CREDENTIALS" | "CONSENT"
  >("ONCHAIN");

  const TABS: { label: string, value: "ONCHAIN" | "OFFCHAIN" | "CREDENTIALS" | "CONSENT", icon: any }[] = [
    { label: "Onchain Interactions", value: "ONCHAIN", icon: <ChainIcon /> },
    { label: "Offchain Interactions", value: "OFFCHAIN", icon: <OffchainIcon /> },
    { label: "Credentials Requests", value: "CREDENTIALS", icon: <CredsIcon /> },
    { label: "Consent Given", value: "CONSENT", icon: <GuardIcon /> },
  ]

  return (
    <Card className="w-full max-w-[1015px] xl:max-w-full">
      {/* Tabbar */}
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
        {selectedTab === "ONCHAIN" && <OnchainInteractionsTable />}
        {selectedTab === "OFFCHAIN" && <OffchainInteractionsTable />}
        {selectedTab === "CREDENTIALS" && <CredentialsRequestTable />}
        {selectedTab === "CONSENT" && <ConsentGivenTable />}
      </CardContent>
    </Card>
  )
}