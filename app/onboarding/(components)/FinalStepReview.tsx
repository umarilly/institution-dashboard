"use client";

import SidebarCircularIcons from "@/components/ui/SidebarCircularIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bag, Dollar, FinanceBook, Fund, RightArrow, User } from "@/svg-icons/SVGIcons";
import React, { Dispatch, SetStateAction } from "react";
import { useOnBoardingFormStore } from "./OnBoarding";
import { OnBoardingStoreType } from "./type";
import { baseURL } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";
import { useAuthStore } from "@/store/use-auth-store";
import * as onboardingServices from "@/services/onboarding-service";

const FinalStepReview = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const businessFundForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.businessFundForm
  );
  const financialInformationForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.financialInformationForm
  );
  const fundManagerForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.fundManagerForm
  );
  const fundDocumentsForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.fundDocumentsForm
  );
  const baseCurrencyForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.baseCurrencyForm
  );

  const [loader, setLoader] = React.useState<boolean>(false);
  const { toast } = useToast();

  const getAuthData = useAuthStore((state) => state.getAuthData);
  const authData = getAuthData();

  async function submitForm() {
    try {
      setLoader(true);

      if (
        !authData?.email ||
        !fundDocumentsForm.memorandum ||
        !fundDocumentsForm.factsheet ||
        !fundDocumentsForm.license
      )
        return;
      //store the fundDocumentsForm in S3 and get the URL
      const responseData = await onboardingServices.GetPresignedUrls(
        authData.email,
        fundDocumentsForm.memorandum.name,
        fundDocumentsForm.factsheet.name,
        fundDocumentsForm.license.name
      );
      if (responseData.error) {
        throw new Error(responseData.message);
      }

      console.log("responseData.data", responseData.data);
      await Promise.all([
        await fetch(responseData.data.memoranumPresignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/pdf",
          },
          body: fundDocumentsForm.memorandum,
        }),
        await fetch(responseData.data.factsheetPresignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/pdf",
          },
          body: fundDocumentsForm.factsheet,
        }),
        await fetch(responseData.data.licensePresignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/pdf",
          },
          body: fundDocumentsForm.license,
        }),
      ]);

      const response: Response = await fetch(`${baseURL}/institute/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData!.email!,
          ...businessFundForm,
          ...financialInformationForm,
          ...fundManagerForm,
          ...baseCurrencyForm,
        }),
      });
      const data: fetchResponseType<any> = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      toast({
        variant: "default",
        title: "Onboarding success",
        description: "you have successfully onboarded",
        duration: 2000,
      });

      setSelected(7);
    } catch (err: any) {
      console.log("Error : ", err);
      toast({
        variant: "destructive",
        description: err.message,
        duration: 3000,
      });
    } finally {
      setLoader(false);
    }
  }
  return (
    <section
      className="max-w-[720px] p-[50px] rounded-2xl bg-[#ffffff80] my-[120px] flex flex-col gap-10"
      style={{
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.04)",
        backdropFilter: "blur(10px)",
        border: "1px solid #E8E8E8",
      }}
    >
      {/* Top title */}
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Final Step: Review and Confirm</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      {/* Business information */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-3">
            <SidebarCircularIcons selected={true} svg={<Bag />} />
            <h3 className="text-[20px] font-medium">Business information</h3>
          </div>
          <Button
            variant="secondary"
            className="bg-[#3B82F650] hover:bg-[#3B82F670] text-black"
            onClick={() => setSelected(1)}
          >
            Edit details
          </Button>
        </div>
        <div>
          <label htmlFor="businessName">Business name</label>
          <Input
            readOnly={true}
            value={businessFundForm.businessName}
            type="text"
            id="businessName"
            className="mt-2 placeholder:text-[#E8E8E8]"
          />
        </div>
        <div>
          <label htmlFor="domicileIn">Domiciled in</label>
          <div id="domicileIn">
            <Input
              readOnly={true}
              contentEditable={false}
              value={businessFundForm.domicileIn}
              type="text"
              id="domicileIn"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="dateEstablished">Date established</label>
          <div id="dateEstablished">
            <Input
              readOnly={true}
              contentEditable={false}
              value={String(businessFundForm.dateEstablished).slice(4, 15)}
              type="text"
              id="dateEstablished"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="typeOfIndustry">Type of industry</label>
          <div id="typeOfIndustry">
            <Input
              readOnly={true}
              contentEditable={false}
              value={businessFundForm.typeOfIndustry}
              type="text"
              id="typeOfIndustry"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
      </div>
      {/* Financial information */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-3">
            <SidebarCircularIcons selected={true} svg={<FinanceBook />} />
            <h3 className="text-[20px] font-medium">Financial Information</h3>
          </div>
          <Button
            variant="secondary"
            className="bg-[#3B82F650] hover:bg-[#3B82F670] text-black"
            onClick={() => setSelected(2)}
          >
            Edit details
          </Button>
        </div>
        <div>
          <label htmlFor="totalAUM">Total AUM ( Across the Business )</label>
          <Input
            readOnly={true}
            contentEditable={false}
            value={financialInformationForm.totalAUM}
            type="text"
            id="totalAUM"
            className="mt-2 placeholder:text-[#E8E8E8]"
          />
        </div>
        <div>
          <label htmlFor="estimatedAUM">Estimated AUM for this Fund</label>
          <Input
            readOnly={true}
            contentEditable={false}
            value={financialInformationForm.estimatedAUM}
            type="text"
            id="estimatedAUM"
            className="mt-2 placeholder:text-[#E8E8E8]"
          />
        </div>
        <div>
          <label htmlFor="estimatedInvestors">Estimated Investors</label>
          <Input
            readOnly={true}
            contentEditable={false}
            value={financialInformationForm.estimatedInvestors}
            type="text"
            id="estimatedInvestors"
            className="mt-2 placeholder:text-[#E8E8E8]"
          />
        </div>
      </div>
      {/* Fund Manager Information */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-3">
            <SidebarCircularIcons selected={true} svg={<User />} />
            <h3 className="text-[20px] font-medium">Fund Manager Information</h3>
          </div>
          <Button
            variant="secondary"
            className="bg-[#3B82F650] hover:bg-[#3B82F670] text-black"
            onClick={() => setSelected(3)}
          >
            Edit details
          </Button>
        </div>
        <div>
          <label htmlFor="ownerName">Owner name</label>
          <Input
            readOnly={true}
            contentEditable={false}
            value={fundManagerForm.ownerName}
            type="text"
            id="ownerName"
            className="mt-2 placeholder:text-[#E8E8E8]"
          />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <div id="position">
            <Input
              readOnly={true}
              contentEditable={false}
              value={fundManagerForm.position}
              type="text"
              id="position"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="linkedInLink">LinkedIn link</label>
          <Input
            readOnly={true}
            contentEditable={false}
            value={fundManagerForm.linkedInLink}
            type="text"
            id="linkedInLink"
            className="mt-2 placeholder:text-[#E8E8E8]"
          />
        </div>
      </div>
      {/* Fund Documents */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-3">
            <SidebarCircularIcons selected={true} svg={<Fund />} />
            <h3 className="text-[20px] font-medium">Fund Documents</h3>
          </div>
          <Button
            variant="secondary"
            className="bg-[#3B82F650] hover:bg-[#3B82F670] text-black"
            onClick={() => setSelected(4)}
          >
            Edit details
          </Button>
        </div>
        <div>
          <label htmlFor="Memorandum">Memorandum</label>
          <InputFileButton
            fileName={
              fundDocumentsForm.memorandum
                ? minimzeLength(fundDocumentsForm.memorandum.name)
                : ""
            }
            fileSize={
              fundDocumentsForm.memorandum
                ? convertToMBString(fundDocumentsForm.memorandum.size)
                : ""
            }
          />
        </div>
        <div>
          <label htmlFor="factsheet">Factsheet</label>
          <InputFileButton
            fileName={
              fundDocumentsForm.factsheet
                ? minimzeLength(fundDocumentsForm.factsheet.name)
                : ""
            }
            fileSize={
              fundDocumentsForm.factsheet
                ? convertToMBString(fundDocumentsForm.factsheet.size)
                : ""
            }
          />
        </div>
        <div>
          <label htmlFor="license">License</label>
          <InputFileButton
            fileName={
              fundDocumentsForm.license
                ? minimzeLength(fundDocumentsForm.license.name)
                : ""
            }
            fileSize={
              fundDocumentsForm.license
                ? convertToMBString(fundDocumentsForm.license.size)
                : ""
            }
          />
        </div>
      </div>
      {/* Base currency */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-3">
            <SidebarCircularIcons selected={true} svg={<Dollar />} />
            <h3 className="text-[20px] font-medium">Base currency</h3>
          </div>
          <Button
            variant="secondary"
            className="bg-[#3B82F650] hover:bg-[#3B82F670] text-black"
            onClick={() => setSelected(5)}
          >
            Edit details
          </Button>
        </div>
        <div>
          <label htmlFor="baseCurrency">Base currency</label>
          <div id="baseCurrency">
            <Input
              readOnly={true}
              contentEditable={false}
              value={baseCurrencyForm.baseCurrency}
              type="text"
              id="baseCurrency"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="fundInceptionDate">Fund inception date</label>
          <div>
            <Input
              readOnly={true}
              contentEditable={false}
              value={String(baseCurrencyForm.fundInceptionDate).slice(4, 15)}
              type="text"
              id="fundInceptionDate"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="fiscalYearEnd">Fiscal year end</label>
          <div id="fiscalYearEnd">
            <Input
              readOnly={true}
              contentEditable={false}
              value={String(baseCurrencyForm.fiscalYearEnd)}
              type="text"
              id="fiscalYearEnd"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="administrator">Administrator</label>
          <div id="administrator">
            <Input
              readOnly={true}
              contentEditable={false}
              value={baseCurrencyForm.administrator}
              type="text"
              id="administrator"
              className="mt-2 placeholder:text-[#E8E8E8]"
            />
          </div>
        </div>
      </div>
      {/* Cancel and Procee button */}
      <div className="flex justify-between">
        <Button
          style={{ background: "#E8E8E8" }}
          variant="secondary"
          className="flex gap-3"
        >
          <p>Cancel onboarding</p>
        </Button>
        <Button className="flex gap-3" onClick={submitForm}>
          {loader ? (
            <Spinner />
          ) : (
            <>
              <p>Submit then proceed to KYC flow</p>
              <RightArrow />
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default FinalStepReview;

function InputFileButton({ fileName, fileSize }: { fileName: string; fileSize: string }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl border-[1px] border-[#E8E8E8] px-4 py-3 mt-2">
      <div className="flex gap-3">
        <div className="text-[#465668] text-[14px] flex flex-col justify-between">
          <p>{fileName}</p>
          <p>{fileSize}</p>
        </div>
      </div>
    </div>
  );
}

function convertToMBString(size: number) {
  if (size < 1048576) {
    return Math.floor(size / 1024) + "KB";
  }
  return Math.floor(size / 1024 / 1024) + "MB";
}

function minimzeLength(str: string) {
  if (str.length > 15) {
    return str.slice(0, 15) + "...";
  }
  return str;
}
