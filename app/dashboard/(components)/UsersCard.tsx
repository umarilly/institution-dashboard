"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default function UsersCard() {

  return (<Card className="w-full max-w-[400px] xl:max-w-full">
    <CardHeader>
      <CardTitle className="font-bold">Users</CardTitle>
    </CardHeader>

    <CardContent className="">

      <div className="flex flex-col gap-2">
        <div className=" flex justify-between">
          <p className="font-semibold">John Doe</p>
          <p className="text-color-secondary">ADMINISTRATOR</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">John Doe</p>
          <p className="text-color-secondary">ADMINISTRATOR</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">John Doe</p>
          <p className="text-color-secondary">ADMINISTRATOR</p>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-full rounded-xl" size="lg">Manage Users</Button>
    </CardFooter>
  </Card>)
}