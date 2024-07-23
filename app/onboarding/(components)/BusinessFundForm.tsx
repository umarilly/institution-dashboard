import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RightArrow } from "@/svg-icons/SVGIcons";
import { Dispatch, SetStateAction, useState } from "react";
import { useOnBoardingFormStore } from "./OnBoarding";
import DatePicker from "@/components/ui/DatePicker";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OnBoardingStoreType } from "./type";

const COUNTRIES = [
  "Pakistan",
  "Afghanistan",
  "Bangladesh",
  "Bhutan",
  "China",
  "India",
  "USA",
  "UK",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Turkey",
  "Australia",
];

const INDUSTRIES = [
  "Agriculture",
  "Automotive",
  "Banking",
  "Construction",
  "Education",
  "Energy",
  "Fashion",
  "Healthcare",
];

const BusinessFundForm = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const businessFundForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.businessFundForm
  );
  const setBusinessFundForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.setBusinessFundForm
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...businessFundForm,
      ...{
        domicileIn: businessFundForm.domicileIn
          ? businessFundForm.domicileIn
          : COUNTRIES[0],
      },
      ...{
        typeOfIndustry: businessFundForm.typeOfIndustry
          ? businessFundForm.typeOfIndustry
          : INDUSTRIES[0],
      },
    },
  });

  function goBack() {
    // save state here before going back

    console.log("can't go back from here");
  }
  function goForward(data: any) {
    // save state here before going formward
    setBusinessFundForm(data);

    setSelected(2);
  }
  return (
    <>
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Business Fund</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium" htmlFor="businessName">
            Business name
          </label>
          <Input
            type="text"
            id="businessName"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter business name"
            {...register("businessName", { required: true })}
          />
          {errors.businessName && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="domicileIn">
            Domiciled in
          </label>
          <div id="domicileIn">
            <Controller
              control={control}
              name="domicileIn"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {COUNTRIES.map((country) => (
                      <SelectItem value={country} key={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div>
          <label className="font-medium" htmlFor="dateEstablished">
            Date established
          </label>
          <div id="dateEstablished">
            <Controller
              control={control}
              name="dateEstablished"
              render={({ field }) => (
                <DatePicker
                  placeholder="Select date"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div>
          <label className="font-medium" htmlFor="typeOfIndustry">
            Type of industry
          </label>
          <div id="typeOfIndustry">
            <Controller
              control={control}
              name="typeOfIndustry"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {INDUSTRIES.map((industry) => (
                      <SelectItem value={industry} key={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button style={{ background: "#E8E8E8" }} variant="secondary" onClick={goBack}>
          Cancel
        </Button>
        <Button className="flex gap-3" onClick={handleSubmit(goForward)}>
          <p>Next</p>
          <RightArrow />
        </Button>
      </div>
    </>
  );
};

export default BusinessFundForm;
