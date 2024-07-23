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
import { AcceptedUsers } from "@/svg-icons/AcceptedUsers";
import { RejectedUsers } from "@/svg-icons/RejectedUsers";
import { NewUsers } from "@/svg-icons/NewUsers";
import { LoggedInUsers } from "@/svg-icons/LoggedInUsers";
import BackdropGradientBlurBlob from "../../../components/BackdropGradientBlurBlob";
import { useRouter } from "next/navigation";

export default function OverviewCard() {

  const router = useRouter();

  const routeToAnalytics = () => {
    router.push("/dashboard/analytics");
  }

  return (<Card className="w-full max-w-[900px] xl:max-w-full">
    <CardHeader >
      <div className="flex justify-between items-center" >
        <h1 className="font-bold text-2xl">Overview</h1>
        <Button className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-fit text-base rounded-xl" size="lg" onClick={routeToAnalytics}>View analytics</Button>
      </div>
    </CardHeader>

    <CardContent className="">
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">

        <div className="flex flex-col justify-between h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl">
          <p className="font-semibold text-color-primary text-[40px] leading-none">100k+</p>

          <div className="flex justify-between items-baseline h-fit">
            <p className="text-color-secondary font-medium">Accepted Users</p>

            <AcceptedUsers />
          </div>
        </div>

        <div className="flex flex-col justify-between  h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl relative overflow-hidden">
          <p className="font-semibold text-color-primary text-[40px] leading-none">100k+</p>

          <div className="flex justify-between items-baseline">
            <p className="text-color-secondary font-medium">Rejected Users</p>

            <RejectedUsers className="z-[1]" />
          </div>

          <div className="w-[200px] h-[180px] absolute -right-16 -bottom-16" style={{
            borderRadius: '263px',
            background: 'radial-gradient(50% 50% at 50% 50%, #FFE0E0 0%, #F8FAFC 100%)',
            backdropFilter: 'blur(74.01068115234375px)',
            zIndex: 0
          }}></div>
        </div>

        <div className="flex flex-col justify-between h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl relative overflow-hidden">
          <p className="font-semibold text-color-primary text-[40px] leading-none">100k+</p>

          <div className="flex justify-between items-baseline">
            <p className="text-color-secondary font-medium">New Users</p>

            <NewUsers className="z-[1]" />
          </div>


          <div className="w-[200px] h-[180px] absolute -right-16 -bottom-16" style={{
            borderRadius: '263px',
            background: 'radial-gradient(50% 50% at 50% 50%, #FFF2CC 0%, #F8FAFC 100%)',
            backdropFilter: 'blur(74.01068115234375px)',
            zIndex: 0
          }}></div>
        </div>

        <div className="flex flex-col justify-between h-[120px] p-4 bg-color-tertiary bg-opacity-20 rounded-xl relative overflow-hidden">
          <p className="font-semibold text-color-primary text-[40px] leading-none">100k+</p>

          <div className="flex justify-between items-baseline">
            <p className="text-color-secondary font-medium">Logged In Users</p>

            <LoggedInUsers className="z-[1]" />
          </div>

          <div className="w-[200px] h-[180px] absolute -right-16 -bottom-16" style={{
            borderRadius: '263px',
            background: 'radial-gradient(50% 50% at 50% 50%, #E8FFE4 0%, #F8FAFC 100%)',
            backdropFilter: 'blur(74.01068115234375px)',
            zIndex: 0
          }}></div>
        </div>
      </div>
    </CardContent>

  </Card>)
}