import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeftArrow, RightArrow } from "@/svg-icons/SVGIcons";
import { Dispatch, SetStateAction } from "react";
import { useOnBoardingFormStore } from "./OnBoarding";
import DatePickerBaseCurrency from "@/components/ui/DatePickerBaseCurrency";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OnBoardingStoreType, baseCurrencyFormType } from "./type";
import { Controller, useForm } from "react-hook-form";

const CURRENCIES = ["USD", "PKR", "EUR", "GBP", "AED", "SAR", "QAR", "TRY", "AUD"];

const ADMINISTRATORS = [
  "Administrator 1",
  "Administrator 2",
  "Administrator 3",
  "Administrator 4",
];

const FinancialInformationForm = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const baseCurrencyForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.baseCurrencyForm
  );
  const setBaseCurrencyForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.setBaseCurrencyForm
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...baseCurrencyForm,
      baseCurrency: baseCurrencyForm.baseCurrency
        ? baseCurrencyForm.baseCurrency
        : CURRENCIES[0],
      administrator: baseCurrencyForm.administrator
        ? baseCurrencyForm.administrator
        : ADMINISTRATORS[0],
    },
  });

  function goBack() {
    setBaseCurrencyForm(watch() as unknown as baseCurrencyFormType);
    setSelected(4);
  }

  function goForward(data: any) {
    setBaseCurrencyForm(data);
    setSelected(6);
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) {
      return "";
    } 
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Base Currency</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium" htmlFor="baseCurrency">
            Base currency
          </label>
          <div id="baseCurrency">
            <Controller
              control={control}
              name="baseCurrency"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {CURRENCIES.map((currency) => (
                      <SelectItem value={currency} key={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div>
          <label className="font-medium" htmlFor="fundInceptionDate">
            Fund inception date
          </label>
          <div id="fundInceptionDate">
            <Controller
              control={control}
              name="fundInceptionDate"
              render={({ field }) => (
                <DatePickerBaseCurrency
                  placeholder="Select date"
                  value={field.value}
                  onChange={(date) => field.onChange(formatDate(date))}
                />
              )}
            />
          </div>
        </div>
        <div>
          <label className="font-medium" htmlFor="fiscalYearEnd">
            Fiscal year end
          </label>
          <div id="fiscalYearEnd">
            <Controller
              control={control}
              name="fiscalYearEnd"
              render={({ field }) => (
                <DatePickerBaseCurrency
                  placeholder="Select date"
                  value={field.value}
                  onChange={(date) => field.onChange(formatDate(date))}
                />
              )}
            />
          </div>
        </div>
        <div>
          <label className="font-medium" htmlFor="administrator">
            Administrator
          </label>
          <div id="administrator">
            <Controller
              control={control}
              name="administrator"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {ADMINISTRATORS.map((administrator) => (
                      <SelectItem value={administrator} key={administrator}>
                        {administrator}
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
        <Button
          style={{ background: "#E8E8E8" }}
          variant="secondary"
          className="flex gap-3"
          onClick={goBack}
        >
          <LeftArrow />
          <p>Back</p>
        </Button>
        <Button className="flex gap-3" onClick={handleSubmit(goForward)}>
          <p>Next</p>
          <RightArrow />
        </Button>
      </div>
    </>
  );
};

export default FinancialInformationForm;
