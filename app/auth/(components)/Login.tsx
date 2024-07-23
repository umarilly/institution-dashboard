"use client"
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { resendSignUpCode, signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Spinner from "../../../components/ui/spinner";
import BackdropGradientBlurBlob from "../../../components/BackdropGradientBlurBlob";
import { useAuthStore } from "@/store/use-auth-store";
import { parsedErrorMessage } from "@/utils/error-message";
import { LoginInstitutionInfo } from "@/services/auth-service";

type Inputs = {
	email: string,
	password: string,
};

export default function LoginForm() {
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const { toast } = useToast();

	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

	const setAuthData = useAuthStore((state) => state.setAuthData);
	const setOnboardingStatus = useAuthStore((state) => state.setOnboardingStatus);

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true);
		let redirectLink = "/dashboard";

		try {
			const { isSignedIn, nextStep } = await signIn({
				username: data.email,
				password: data.password,
			});

			if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
				await resendSignUpCode({
					username: data.email,
				});

				setAuthData({
					email: data.email,
					password: ""
				});

				redirectLink = "/auth/confirm-signup";
			}

			const onboardingStatus = await LoginInstitutionInfo(data.email)

			if (onboardingStatus.error) {
				throw new Error(onboardingStatus.message)
			}

			if (!onboardingStatus.data.isOnboarded) {
				setOnboardingStatus(false);

				setAuthData({
					email: data.email,
					password: ""
				});

				redirectLink = "/onboarding";
			} else {
				setOnboardingStatus(true);
			}

			router.push(redirectLink);

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
			<BackdropGradientBlurBlob color="#ffe6e6" top="50px" left="50px" />
			<BackdropGradientBlurBlob color="#fff9e6" bottom="50px" right="50px" />
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] m-4">
				<div className="p-10 border border-[#E8E8E8] rounded-[20px] shadow-md bg-white">
					<h1 className="text-[40px] font-bold mb-10">Login</h1>

					<div className="" id="form">
						<div>
							<label htmlFor="email" className="font-medium">Email</label>
							<Input type="email" placeholder="Email" id="email" className="mt-4 text-base rounded-[10px] h-12" {...register("email", { required: true })} />
							{errors.email && <span className="text-red-600 m-1 text-xs">Email is required</span>}
						</div>
						<div className="mt-8">
							<label htmlFor="password" className="font-medium">Password</label>
							<Input type="password" placeholder="Password" id="password" className="mt-4 text-base rounded-[10px] h-12" {...register("password", { required: true })} />
							{errors.password && <span className="text-red-600 m-1 text-xs">Password is required</span>}
						</div>
					</div>

					<div className="flex justify-end my-4">
						<Link href="/auth/forgot-password">
							<p className="text-[#3E4772] font-semibold w-fit hover:cursor-pointer hover:underline">Forgot Password?</p>
						</Link>
					</div>

					<div className="">
						<Button className="w-full h-12 rounded-[10px]" variant="default" disabled={loading} type="submit">
							{loading ? <Spinner /> : "Login"}
						</Button>

						<Link href="/auth/register" >
							<Button className="w-full h-12 rounded-[10px] mt-4" variant="outline" disabled={loading} type="button">
								{loading ? <Spinner /> : "Register"}
							</Button>
						</Link>
					</div>
				</div>
			</form>
		</>
	);
}
