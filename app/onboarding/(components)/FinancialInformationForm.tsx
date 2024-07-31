import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeftArrow, RightArrow } from "@/svg-icons/SVGIcons";
import { Dispatch, SetStateAction } from "react";
import { useOnBoardingFormStore } from "./OnBoarding";
import { useForm } from "react-hook-form";
import { OnBoardingStoreType, financialInformationFormType } from "./type";

const FinancialInformationForm = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const financialInformationForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.financialInformationForm
  );
  const setFinancialInformationForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.setFinancialInformationForm
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: financialInformationForm });

  function goBack() {
    // save state here before going back
    setFinancialInformationForm(watch() as financialInformationFormType);

    setSelected(1);
  }
  function goForward(data: any) {
    // save state here before going formward
    setFinancialInformationForm(data);

    setSelected(3);
  }

  return (
    <>
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Financial Information</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium" htmlFor="totalAUM">
            Total AUM ( Across the Business )
          </label>
          <Input
            type="number"
            id="totalAUM"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter amount"
            {...register("totalAUM", { required: true })}
          />
          {errors.totalAUM && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="estimatedAUM">
            Estimated AUM for this Fund
          </label>
          <Input
            type="number"
            id="estimatedAUM"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter amount"
            {...register("estimatedAUM", { required: true })}
          />
          {errors.estimatedAUM && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="estimatedInvestors">
            Estimated Investors
          </label>
          <Input
            type="number"
            id="estimatedInvestors"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter amount"
            {...register("estimatedInvestors", { required: true })}
          />
          {errors.estimatedInvestors && (
            <span className="text-red-500 text-xs">This field is required</span>
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
