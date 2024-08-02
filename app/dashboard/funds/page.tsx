"use client";
import { useBusinessFunds } from "@/hooks/business-funds-fetch";
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
import MySheet from "./(components)/MySheet";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

type DataType = {
  left: string;
  right: string;
}[];

const formatDateDateEstablished = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};

const formatDateInception = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  return `${month}, ${day}`;
};

export default function Home() {
  const router = useRouter();
  const { data: business, isLoading: loading, isError: error } = useBusinessFunds();

  const Fund_Information: DataType = [
    {
      left: "Business Name",
      right: business ? business.business_name : "", 
    },
    { left: "Domiciled In", 
      right: business ? business.domiclied_in : "", 
    },
    { left: "Date Established", 
      right: business && business.date_established ? formatDateDateEstablished(business.date_established) : "", 
    },
    { left: "Industry Type",
      right: business ? business.industry_type : "", 
    },
  ];

  const Financial_Information: DataType = [
    {
      left: "Total AUM",
      right: business ? business.total_aum : "", 
    },
    { left: "Estimated AUM for this Fund", 
      right: business ? business.fund_estimated_aum : "", 
    },
    { left: "Estimated Investors", 
      right: business ? business.estimated_investors : "", 
    },
  ];

  const Base_Currency: DataType = [
    {
      left: "Base Currency",
      right: business ? business.base_currency : "", 
    },
    { left: "Fund Inception Date", 
      right: business && business.fund_inception_date ? formatDateInception(business.fund_inception_date) : "", 
    },
    { left: "Fiscal Year End Date", 
      right: business ? business.fiscal_year_end_day : "", 
    },
    { left: "Fiscal Year End Month", 
      right: business ? business.fical_year_end_month : "", 
    },
    { left: "Administrator", 
      right: business ? business.administrator : "", 
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-start">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-start">
        <p> Error Loading settings data </p>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full px-[40px] py-[50px] gap-5">
      <Card className="max-w-[600px] w-[48%]">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-5 mb-2">
              <div className="flex justify-center items-center w-fit h-fit p-2 hover:cursor-pointer rounded-lg hover:bg-color-tertiary" onClick={() => router.back()}>
                <LeftArrow />
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold"> {business ? business.business_name : "Business Name" } </p>
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
              <Items data={Fund_Information} />
            </div>
          </div>
          <div>
            <h5 className="text-[16px] font-semibold mb-5">
              Financial Information
            </h5>
            <div className="flex flex-col gap-3">
              <Items data={Financial_Information} />
            </div>
          </div>
          <div>
            <h5 className="text-[16px] font-semibold mb-5">Base Currency</h5>
            <div className="flex flex-col gap-3">
              <Items data={Base_Currency} />
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