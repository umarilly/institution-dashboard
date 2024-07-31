"use client"
import Link from "next/link";
import { useState } from "react";
import { signUp } from "aws-amplify/auth";
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
	email: string,
	password: string,
};

export default function RegisterForm() {
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const router = useRouter();
	const { toast } = useToast();

	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

	const setAuthData = useAuthStore((state) => state.setAuthData);

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true);

		try {
			const { email, password } = data;
			const { isSignUpComplete, userId, nextStep } = await signUp({
				username: email,
				password,
				options: {
					userAttributes: {
						email,
					}
				}
			});
			if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
				setAuthData({
					email: data.email,
					password: "",
					userId
				});
				setSuccessMessage("Success - OTP sent to your email");
				setTimeout(() =>{
					router.push("/auth/confirm-register");
				},2000)
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
	};

	return (
		<>
			<BackdropGradientBlurBlob color="#e6e6fe" top="50px" left="50px" />
			<BackdropGradientBlurBlob color="#E8FFE4" bottom="50px" right="50px" />
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[480px]" >
				<div className="px-8 py-8 border border-[#E8E8E8] rounded-[20px] shadow-md bg-[white]">
					<h1 className="text-[34px] font-bold mb-5">Register</h1>

					<div id="form">
						<div className="h-auto" >
							<label htmlFor="email" className="font-medium text-base">Email</label>
							<Input type="email" placeholder="Email" id="email" className="mt-2 text-base rounded-[5px]"  {...register("email", { required: true })} />
						</div>
						{errors.email && <div className="text-red-600 mt-3 ml-2 text-sm font-semibold">Email is required</div>}
						<div className="h-auto mt-3">
							<label htmlFor="password" className="font-medium text-base">Password</label>
							<Input type="password" placeholder="Password" id="password" className="mt-2 text-base rounded-[5px]" {...register("password", { required: true })} />
						</div>
						{errors.password && <div className="text-red-600 mt-3 ml-2 text-sm font-semibold">Password is required</div>}
					</div>
					{successMessage && <div className="text-green-600 mt-3 ml-2 text-sm font-semibold">{successMessage}</div>}
					<div className="mt-4" >
						<Button className="w-full h-10 rounded-[8px]" variant="default" disabled={loading} type="submit">{loading ? <Spinner /> : "Create an account"}</Button>

						<Link href="/auth/login">
							<Button className="w-full h-10 rounded-[8px] mt-4" variant="outline" disabled={loading} type="button">
								{loading ? <Spinner /> : "Login"}
							</Button>
						</Link>
					</div>
				</div>
			</form>
		</>
	);
}
