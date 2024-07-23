"use client"
import { useState } from "react";
import { confirmResetPassword } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Spinner from "../../../components/ui/spinner";
import { useToast } from "../../../components/ui/use-toast";
import BackdropGradientBlurBlob from "../../../components/BackdropGradientBlurBlob";
import { useAuthStore } from "@/store/use-auth-store";
import { parsedErrorMessage } from "@/utils/error-message";

type Inputs = {
	otp: string,
};

export default function TwoFAForm() {
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const { toast } = useToast();

	const getAuthData = useAuthStore((state) => state.getAuthData);
	const authData = getAuthData();

	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true);
		try {
			await confirmResetPassword({
				username: authData!.email!,
				confirmationCode: data.otp,
				newPassword: authData!.password!,
			});

			router.push("/auth/login");

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
			<BackdropGradientBlurBlob color="#f0efff" top="50px" left="50px" />
			<BackdropGradientBlurBlob color="#ffe6e6" bottom="50px" right="50px" />

			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] m-4">
				<div className="p-10 border border-[#E8E8E8] rounded-[20px] shadow-md bg-white">
					<h1 className="text-[40px] font-bold mb-5">Two-Factor Authentication</h1>

					<p className="mb-10">Enter OTP (One-time-pin) code sent to your email to proceed with password reset.</p>

					<div className="mb-10" id="form">
						<div>
							<label htmlFor="otp" className="font-medium">OTP</label>
							<Input type="password" placeholder="******" id="otp" className="mt-4 text-base rounded-[10px] h-12" {...register("otp", { required: true })} />
							{errors.otp && <span className="text-red-600 m-1 text-xs">OTP Code is required</span>}
						</div>
					</div>

					<Button className="w-full h-12 rounded-[10px]" variant="default" disabled={loading}>
						{loading ? <Spinner /> : "Confirm"}
					</Button>
				</div>
			</form>
		</>
	);
}
