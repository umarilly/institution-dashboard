import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeftArrow, RightArrow } from "@/svg-icons/SVGIcons";
import { Dispatch, SetStateAction, use } from "react";
import { useOnBoardingFormStore } from "./OnBoarding";
import DatePicker from "@/components/ui/DatePicker";

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
const FISCAL_YEARS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
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
      ...{
        baseCurrency: baseCurrencyForm.baseCurrency
          ? baseCurrencyForm.baseCurrency
          : CURRENCIES[0],
      },
      ...{
        fiscalYearEnd: baseCurrencyForm.fiscalYearEnd
          ? baseCurrencyForm.fiscalYearEnd
          : FISCAL_YEARS[0],
      },
      ...{
        administrator: baseCurrencyForm.administrator
          ? baseCurrencyForm.administrator
          : ADMINISTRATORS[0],
      },
    },
  });

  function goBack() {
    // save state here before going back
    setBaseCurrencyForm(watch() as baseCurrencyFormType);

    setSelected(4);
  }
  function goForward(data: any) {
    // save state here before going formward
    setBaseCurrencyForm(data);

    setSelected(6);
  }

  return (
    <>
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Base Currency</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
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
          <div>
            <Controller
              control={control}
              name="fundInceptionDate"
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
          <label className="font-medium" htmlFor="fiscalYearEnd">
            Fiscal year end
          </label>
          <div id="fiscalYearEnd">
            <Controller
              control={control}
              name="fiscalYearEnd"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {FISCAL_YEARS.map((fiscalYear) => (
                      <SelectItem value={fiscalYear} key={fiscalYear}>
                        {fiscalYear}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
