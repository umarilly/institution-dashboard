import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeftArrow, RightArrow } from "@/svg-icons/SVGIcons";
import { Dispatch, SetStateAction } from "react";
import { useOnBoardingFormStore } from "./OnBoarding";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OnBoardingStoreType, fundManagerFormType } from "./type";
import { Controller, useForm } from "react-hook-form";

const POSITIONS = ["CEO", "CFO", "COO", "CTO", "CIO", "CMO", "CDO", "CRO", "CPO"];

const FinancialInformationForm = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const fundManagerForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.fundManagerForm
  );
  const setFundManagerForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.setFundManagerForm
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...fundManagerForm,
      ...{
        position: fundManagerForm.position ? fundManagerForm.position : POSITIONS[0],
      },
    },
  });

  function goBack() {
    setFundManagerForm(watch() as fundManagerFormType);
    setSelected(2);
  }

  function goForward(data: any) {
    setFundManagerForm(data);
    setSelected(4);
  }

  return (
    <>
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Fund Manager Information</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium" htmlFor="ownerName">
            Owner name
          </label>
          <Input
            type="text"
            id="ownerName"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter owner name"
            {...register("ownerName", { required: true })}
          />
          {errors.ownerName && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="position">
            Position
          </label>
          <div id="position">
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {POSITIONS.map((position) => (
                      <SelectItem value={position} key={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div>
          <label className="font-medium" htmlFor="linkedInLink">
            LinkedIn link
          </label>
          <Input
            type="text"
            id="linkedInLink"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter LinkedIn link"
            {...register("linkedInLink", {
              required: "This field is required",
              validate: (value) =>
                /^https:\/\/linkedin\.com\/in\/[a-zA-Z0-9-]+$/.test(value) || /linkedin\.com\/in\/[a-zA-Z0-9-]+$/.test(value) ||
              "Invalid LinkedIn URL format. Please Enter: linkedin.com/in/username",
            })}
          />
          {errors.linkedInLink && (
            <span className="text-red-500 text-xs">
              {errors.linkedInLink.message}
            </span>
          )}
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