"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InvestorsListTable from "./InvestorsListTable"

export default function InvestorsTableCard() {

  return (<Card className="w-full max-w-[900px] xl:max-w-full">
    <CardHeader className="pb-0">
      <CardTitle className="font-bold">Investors</CardTitle>
    </CardHeader>

    <CardContent className="p-0">
      <InvestorsListTable />
    </CardContent>

  </Card>
  )
}

