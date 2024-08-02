"use client";
import { useState } from "react";
import BusinessFundForm from "./BusinessFundForm";
import FinancialInformationForm from "./FinancialInformationForm";
import SideBar from "./SideBar";
import FundManagerForm from "./FundManagerForm";
import FundDocumentsForm from "./FundDocumentsForm";
import { create } from "zustand";
import BaseCurrencyForm from "./BaseCurrencyForm";
import {
  OnBoardingStoreType,
  baseCurrencyFormType,
  businessFundFormType,
  financialInformationFormType,
  fundDocumentsFormType,
  fundManagerFormType,
} from "./type";
import FinalStepReview from "./FinalStepReview";
import GenerateEnvironmentID from "./GenerateEnvironmentID";

// CREATING ZUSTAND STORE FOR ONBOARDING FORM
// TODO: refactor and move it to separate `store` directory
export const useOnBoardingFormStore = create<OnBoardingStoreType>()((set) => ({
  businessFundForm: {
    businessName: "",
    domicileIn: "",
    dateEstablished: "",
    typeOfIndustry: "",
  },
  financialInformationForm: {
    totalAUM: 0,
    estimatedAUM: 0,
    estimatedInvestors: 0,
  },
  fundManagerForm: {
    ownerName: "",
    position: "",
    linkedInLink: "",
  },
  fundDocumentsForm: {
    memorandum: null,
    factsheet: null,
    license: null,
  },
  baseCurrencyForm: {
    baseCurrency: "",
    fundInceptionDate: "",
    fiscalYearEnd: "",
    administrator: "",
  },
  setBusinessFundForm: (form: businessFundFormType) =>
    set(() => ({ businessFundForm: form })),
  setFinancialInformationForm: (form: financialInformationFormType) =>
    set(() => ({ financialInformationForm: form })),
  setFundManagerForm: (form: fundManagerFormType) =>
    set(() => ({ fundManagerForm: form })),
  setFundDocumentsForm: (form: fundDocumentsFormType) =>
    set(() => ({ fundDocumentsForm: form })),
  setBaseCurrencyForm: (form: baseCurrencyFormType) =>
    set(() => ({ baseCurrencyForm: form })),
}));

const OnBoarding = () => {
  const [selected, setSelected] = useState(1);
  return selected === 7 ? (
    <div className="flex justify-center bg-[#F8FAFC] min-h-[100vh]">
      <GenerateEnvironmentID setSelected={setSelected} />
    </div>
  ) : selected === 6 ? (
    <div className="flex justify-center bg-[#F8FAFC]">
      <FinalStepReview setSelected={setSelected} />
    </div>
  ) : (
    <main className="flex items-center">
      <SideBar selected={selected} />
      <div className="w-[77%] h-screen flex items-center justify-center px-[100px] py-[80px] text-black bg-[#ffffff80]">
        <div className="flex flex-col gap-[40px] max-w-[800px]">
          {selected === 1 ? (
            <BusinessFundForm setSelected={setSelected} />
          ) : selected === 2 ? (
            <FinancialInformationForm setSelected={setSelected} />
          ) : selected === 3 ? (
            <FundManagerForm setSelected={setSelected} />
          ) : selected === 4 ? (
            <FundDocumentsForm setSelected={setSelected} />
          ) : selected === 5 ? (
            <BaseCurrencyForm setSelected={setSelected} />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default OnBoarding;