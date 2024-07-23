"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useAuthUser from "@/hooks/use-auth-user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FundInformationCard() {

  const user = useAuthUser();

  const router = useRouter();

  const routeToFunds = () => {
    router.push("/dashboard/funds");
  }

  return (<Card className="w-full max-w-[400px] xl:max-w-full">
    <CardHeader>
      <CardTitle className="font-bold">Fund information</CardTitle>
    </CardHeader>

    <CardContent className="">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <p className="ml-4">{user && user.email}</p>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <div className=" flex justify-between items-center">
          <p className="text-color-secondary">Base currency for fund</p>
          <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
          <p className="font-semibold">EUR</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-color-secondary">Fund Inception Date</p>
          <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
          <p className="font-semibold">June 10, 2020</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-color-secondary">Fiscal year End</p>
          <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
          <p className="font-semibold">30 June</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-color-secondary">Total Net Assets</p>
          <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
          <p className="font-semibold">$900M</p>
        </div>

      </div>
    </CardContent>
    <CardFooter>
      <Button className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-full rounded-xl" size="lg" onClick={routeToFunds}>View more fund details</Button>
    </CardFooter>
  </Card>)
}