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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowIcon } from "@/svg-icons/ArrowIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SystemLogsCard() {

  const router = useRouter();
  const [previousTenLogs, setPreviousTenLogs] = useState<any>([]);

  const routeToSystemLogs = () => {
    router.push("/dashboard/system-logs");
  }

  useEffect(() => {
    setPreviousTenLogs([
      { icon: "https://github.com/shadcn.png", eventDispatcher: "System", event: "ZKP Requested", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "System", event: "ZKP Verified", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "System", event: "VC Reverification request sent", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "System", event: "New user onboarded", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "System", event: "User granted claims", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "System", event: "Revoke claims", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "Admin", event: "Added a Fund Manager", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "Fund Manager", event: "Requested report", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "Fund Manager", event: "Exported report", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
      { icon: "https://github.com/shadcn.png", eventDispatcher: "System", event: "ZKP verified", time: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` },
    ]);
  }, []);

  return (<Card className="w-full max-w-[400px] xl:max-w-full">
    <CardHeader>
      <CardTitle className="font-bold">System Logs</CardTitle>
    </CardHeader>

    <CardContent className="mt-6">

      {
        previousTenLogs.map((log:any, index:number) => (
          <div key={index}>
            <div className="flex justify-between items-center py-1">
              <div className="flex gap-2 w-fit items-center justify-center">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={log.icon} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <p className="text-color-secondary text-sm max-w-[70px]">{log.eventDispatcher}</p>

                <ArrowIcon className="mr-2" />
              </div>



              <p className="text-color-primary font-semibold text-sm max-w-[160px] w-fit ">{log.event}</p>
              <p className="text-color-secondary text-xs font-medium max-w-[70px] w-fit text-right">{log.time}</p>
            </div>

            <hr className="my-1 border-color-tertiary" />
          </div>
        ))
      }

    </CardContent>
    <CardFooter>
      <Button className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-full rounded-xl" size="lg" onClick={routeToSystemLogs}>View more system logs</Button>
    </CardFooter>
  </Card>)
}