"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeftArrow } from "@/svg-icons/SVGIcons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import IdentityCredentialIcon from "@/svg-icons/IdentityCredentialIcon";
import AccreditedCredentialIcon from "@/svg-icons/AccreditedCredentialIcon";
import { Switch } from "@/components/ui/switch";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import MySheet from "./(components)/MySheet";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

type DataType = {
  left: string;
  right: string;
}[];

const FUND_DATA = [
  { left: "Base currency for fund", right: "EUR" },
  { left: "Fund Inception Date", right: "June 10, 2020" },
  { left: "Main Blockchain", right: "Ethereum" },
  { left: "Fiscal year End", right: "30 June" },
  { left: "Total Net Assets", right: "$900M" },
];
const SALES_DATA = [
  { left: "Gross Expense Ratio", right: "0.89%" },
  { left: "Net Expense Ratio", right: "0.20%" },
  { left: "Maximum Initial Charge", right: "N/A" },
  { left: "CSDC", right: "N/A" },
  { left: "Total", right: "12b-1 Fee" },
];

const IDETITIFIER_DATA = [
  { left: "Ticker", right: "FOBXX" },
  { left: "Fund Number", right: "9001" },
  { left: "CUSIP Code", right: "3425675" },
];

export default function Home() {

  const router = useRouter()

  return (
    <div className="flex justify-center w-full px-[40px] py-[50px] gap-5">
      <Card className="max-w-[600px] w-[48%]">
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
              <p className="font-bold">ABC Business</p>
            </div>
          </CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 flex flex-col gap-[40px]">
          <div>
            <h5 className="text-[16px] font-semibold mb-5">Fund Information</h5>
            <div className="flex flex-col gap-3">
              <Items data={FUND_DATA} />
            </div>
          </div>
          <div>
            <h5 className="text-[16px] font-semibold mb-5">
              Sales Charges, Expenses, & Fees
            </h5>
            <div className="flex flex-col gap-3">
              <Items data={SALES_DATA} />
            </div>
          </div>
          <div>
            <h5 className="text-[16px] font-semibold mb-5">Identifiers</h5>
            <div className="flex flex-col gap-3">
              <Items data={IDETITIFIER_DATA} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-[600px] w-[48%] h-fit">
        <CardHeader>
          <h3 className="text-[16px] font-semibold text-[#111111]">
            Required credentials
          </h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <RequiredCredentials
            Icon={IdentityCredentialIcon}
            title="Identity Credential"
          />
          <RequiredCredentials
            Icon={AccreditedCredentialIcon}
            title="Accredited Investor Credential"
          />
        </CardContent>
      </Card>
    </div>
  );
}

const Items = ({ data }: { data: DataType }) => {
  return data.map((item, index) => (
    <div
      className="flex items-center justify-center text-[14px] font-medium gap-2.5"
      key={index}
    >
      <p className="text-[#8D96A9]">{item.left}</p>
      <div className="flex-grow border-t border-dashed border-gray-300"></div>
      <p className="text-[#373542] font-semibold">{item.right}</p>
    </div>
  ));
};

const RequiredCredentials = ({
  Icon,
  title,
}: {
  Icon: React.FunctionComponent;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl border-[1px] border-[#E8E8E8]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-full bg-[#E4EDFF80]">
            <Icon />
          </div>
          <p className="text-[16px] font-semibold">{title}</p>
        </div>
        <div className="flex items-center gap-5">
          <Switch />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                className="px-3 py-2 rounded-lg bg-[#E4EDFF] text-[#3E4772]"
              >
                Manager
              </Button>
            </SheetTrigger>
            <MySheet title={title} />
          </Sheet>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
    </div>
  );
};
