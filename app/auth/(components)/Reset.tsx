"use client"
import { useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Spinner from "../../../components/ui/spinner";
import BackdropGradientBlurBlob from "../../../components/BackdropGradientBlurBlob";
import { useAuthStore } from "@/store/use-auth-store";
import { parsedErrorMessage } from "@/utils/error-message";

type Inputs = {
	password: string,
	confirmPassword: string,
};

export default function ResetForm() {

	const router = useRouter();
	const { toast } = useToast();

	const [loading, setLoading] = useState(false);


	const getAuthData = useAuthStore((state) => state.getAuthData);
	const setAuthData = useAuthStore((state) => state.setAuthData);

	const authData = getAuthData();

	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true);
		try {

			if (data.password !== data.confirmPassword) {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Passwords do not match",
					className: "rounded-xl p-3"
				})
				return;
			}

			await resetPassword({ username: authData!.email! });

			setAuthData({
				email: authData!.email!,
				password: data.password
			});

			router.push("/auth/confirmation");
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
					<h1 className="text-[40px] font-bold mb-10">Reset Password</h1>

					<div className="mb-10" id="form">
						<div >
							<label htmlFor="password1" className="font-medium">New Password</label>
							<Input type="password" placeholder="Password" id="password1" className="mt-4 text-base rounded-[10px] h-12" {...register("password", { required: true })} />
							{errors.password && <span className="text-red-600 m-1 text-xs">Password is required</span>}
						</div>
						<div className="my-8">
							<label htmlFor="password2" className="font-medium">Confirm Password</label>
							<Input type="password" placeholder="Password" id="password2" className="mt-4 text-base rounded-[10px] h-12" {...register("confirmPassword", { required: true })} />
							{errors.confirmPassword && <span className="text-red-600 m-1 text-xs">Confirmation Password is required</span>}
						</div>
					</div>

					<div>
						<Button className="w-full h-12 rounded-[10px]" variant="default" type="submit" disabled={loading}>
							{loading ? <Spinner /> : "Reset Password"}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
