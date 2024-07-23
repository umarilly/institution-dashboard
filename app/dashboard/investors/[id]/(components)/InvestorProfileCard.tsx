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

export default function InvestorProfileCard({ params }: { params: { id: string } }) {

  const router = useRouter();

  return (
    <Card className="w-full max-w-[325px] xl:max-w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-5">
            <div className="flex justify-center items-center w-fit h-fit p-2 hover:cursor-pointer rounded-lg hover:bg-color-tertiary" onClick={() => router.back()}>
              <LeftArrow />
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-bold">John Jan Doe</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-6 flex flex-col gap-[40px]">
        <div>
          <h5 className="text-[16px] font-semibold mb-5">Profile Info</h5>
          <div className="flex flex-col gap-2 text-sm">
            <div className=" flex justify-between items-center">
              <p className="text-color-secondary">First Name</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
              <p className="font-semibold">John Jan</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-color-secondary">Last Name</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
              <p className="font-semibold">Doe</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-color-secondary">Residence</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
              <p className="font-semibold">Flag</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-color-secondary">Nationality</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
              <p className="font-semibold">Flag</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-color-secondary">Business</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
              <p className="font-semibold">Yes</p>
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-[16px] font-semibold mb-5">
            Wallet Info
          </h5>
          <div className="flex flex-col gap-2 text-sm">
            <div className=" flex justify-between items-center">
              <p className="text-color-secondary">Wallet Address</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
              <p className="font-semibold">John Jan</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-color-secondary">Investor Status</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>
              <p className="font-semibold">Retail Investor</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-color-secondary">Status</p>
              <div className="flex-grow border-t border-dashed border-gray-300 mx-4"></div>

              {/* todo: update bg color change based on value here */}
              <div className={`flex justify-center items-center text-color-primary w-fit font-medium rounded-3xl px-3 py-1 bg-[#FFF0BB]`}>
                Expired
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-full text-base rounded-xl" size="lg" onClick={() => console.log("Re-verification")}>Re-verification</Button>
      </CardFooter>
    </Card>
  )
}