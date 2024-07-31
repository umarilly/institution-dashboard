"use client"
import { useState } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Spinner from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';
import BackdropGradientBlurBlob from '@/components/BackdropGradientBlurBlob';
import { useAuthStore } from '@/store/use-auth-store';
import { parsedErrorMessage } from '@/utils/error-message';
import { SaveSignUpInstitutionInfo } from '@/services/auth-service';

type Inputs = {
  code: string,
};

export default function ConfirmRegister() {

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const getAuthData = useAuthStore((state) => state.getAuthData);
  const setOnboardingStatus = useAuthStore((state) => state.setOnboardingStatus)
  const authData = getAuthData();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);
    try {

      const { isSignUpComplete, nextStep, userId } = await confirmSignUp({
        username: authData!.email!,
        confirmationCode: data.code,
      });

      if (nextStep.signUpStep === 'DONE') {
        const saveInstitutionInfoResponse = await SaveSignUpInstitutionInfo({
          email: authData!.email!,
          userId: authData!.userId!
        })
        setSuccessMessage("Success - OTP verification done");

        setTimeout(() => {
          if (saveInstitutionInfoResponse.data) {
            setOnboardingStatus(false)
            // cookieStore.set("onboardingStatus", "false")
            router.push("/auth/login");
          }
        }, 3000)
      }
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error Occurred",
        description: String(parsedErrorMessage(error)),
        className: "rounded-xl p-3"
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackdropGradientBlurBlob color="#e6e6fe" top="50px" left="50px" />
      <BackdropGradientBlurBlob color="#E8FFE4" bottom="50px" right="50px" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[480px]">
        <div className="px-8 py-8 border border-[#E8E8E8] rounded-[20px] shadow-md">
          <h1 className="text-[30px] font-bold mb-2">Confirm Signup</h1>

          <p className="mb-4 text-sm">Enter OTP (One-time-pin) code sent to your email to confirm singup.</p>

          <div id="form">
            <div>
              <label htmlFor="code" className="font-medium text-base">Code</label>
              <Input type="password" placeholder="******" id="code" className="mt-2 text-base rounded-[8px] h-10" {...register("code", { required: true })} />
              {errors.code && <span className="text-red-600 m-1 text-xs">Code is required</span>}
            </div>
          </div>

          {successMessage && <div className="text-green-600 mt-3 ml-2 text-sm font-semibold">{successMessage}</div>}

          <div className="mt-4" >
            <Button className="w-full h-10 rounded-[8px]" variant="default" disabled={loading}>
              {loading ? <Spinner /> : "Confirm"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
