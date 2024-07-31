"use client";
import Link from "next/link";
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { resendSignUpCode, signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "../../../components/ui/spinner";
import BackdropGradientBlurBlob from "../../../components/BackdropGradientBlurBlob";
import { useAuthStore } from "@/store/use-auth-store";
import { parsedErrorMessage } from "@/utils/error-message";
import { baseURL } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";

type Inputs = {
	email: string,
	password: string,
};

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const router = useRouter();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const setAuthData = useAuthStore((state) => state.setAuthData);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {

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
					password: "",
				});
				redirectLink = "/auth/confirm-signup";
			}

			const session = await fetchAuthSession();
			const accessToken = session.tokens!.accessToken.toString();
			console.log("Access Token : ", accessToken);

			const response = await axios.get(`${baseURL}/fund`, {
				headers: {
					Authorization: accessToken,
				},
			});

			if (response.data) {
				const data = response.data;
				console.log(data);

				if (data.data && data.data.business_info) {
					console.log("Business Info exists : ", data.data.business_info);
					console.log("Login Successfully");
					setSuccessMessage("Login Successfully - Redirecting to Dashboard");
					setTimeout(() => {
						router.push('/dashboard');
					}, 3000)

				} else {
					console.log("Business Info does not exist");
					console.log("Login Successfully");
					setSuccessMessage("Login Successfully - Redirecting to Onboarding");
					setTimeout(() => {
						router.push('/onboarding');
					}, 3000)
				}
			} else {
				console.log("No response data found");
				return null; 
			}

		} catch (error: unknown) {
			toast({
				variant: "destructive",
				title: "Error Occurred",
				description: String(parsedErrorMessage(error)),
				className: "rounded-xl p-3",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<BackdropGradientBlurBlob color="#ffe6e6" top="50px" left="50px" />
			<BackdropGradientBlurBlob color="#fff9e6" bottom="50px" right="50px" />
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[480px]">
				<div className="px-8 py-8 border border-[#E8E8E8] rounded-[20px] shadow-md bg-white">
					<h1 className="text-[34px] font-bold mb-5">Login</h1>

					<div className="h-auto" id="form">
						<div className="h-auto">
							<label htmlFor="email" className="font-medium text-base">
								Email
							</label>
							<Input
								type="email"
								placeholder="Email"
								id="email"
								className="mt-2 text-base rounded-[5px]"
								{...register("email", { required: true })}
							/>
						</div>
						{errors.email && (
							<div className="text-red-600 font-semibold mt-4 ml-2 text-sm">
								Email is required
							</div>
						)}
						<div className="h-auto mt-3">
							<label htmlFor="password" className="font-medium text-base">
								Password
							</label>
							<Input
								type="password"
								placeholder="Password"
								id="password"
								className="mt-2 text-base rounded-[5px]"
								{...register("password", { required: true })}
							/>
						</div>
						{errors.password && (
							<div className="text-red-600 font-semibold mt-4 ml-2 text-sm">
								Password is required
							</div>
						)}
					</div>

					<div className="flex justify-end my-3">
						<Link href="/auth/forgot-password">
							<p className="text-[#3E4772] font-semibold text-sm w-fit hover:cursor-pointer hover:underline">
								Forgot Password?
							</p>
						</Link>
					</div>

					<div className="mb-4">
						{successMessage && (
							<div className="text-green-600 font-semibold mt-4 ml-2 text-sm">
								{successMessage}
							</div>
						)}
					</div>

					<div>
						<Button
							className="w-full h-10 rounded-[8px]"
							variant="default"
							disabled={loading}
							type="submit"
						>
							{loading ? <Spinner /> : "Login"}
						</Button>

						<Link href="/auth/register">
							<Button
								className="w-full h-10 rounded-[8px] mt-4"
								variant="outline"
								disabled={loading}
								type="button"
							>
								Register
							</Button>
						</Link>
					</div>
				</div>
			</form>
		</>
	);
}