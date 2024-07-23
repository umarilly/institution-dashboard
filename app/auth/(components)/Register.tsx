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

				router.push("/auth/confirm-register");
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
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] m-4" >
				<div className="p-10  border border-[#E8E8E8] rounded-[20px] shadow-md bg-[white]">
					<h1 className="text-[40px] font-bold mb-10">Register</h1>

					<div className="mb-10" id="form">
						<div>
							<label htmlFor="email" className="font-medium">Email</label>
							<Input type="email" placeholder="Email" id="email" className="mt-4 text-base rounded-[10px] h-12"  {...register("email", { required: true })} />
							{errors.email && <span className="text-red-600 m-1 text-xs">Email is required</span>}
						</div>
						<div className="my-8">
							<label htmlFor="password" className="font-medium">Password</label>
							<Input type="password" placeholder="Password" id="password" className="mt-4 text-base rounded-[10px] h-12" {...register("password", { required: true })} />
							{errors.password && <span className="text-red-600 m-1 text-xs">Password is required</span>}
						</div>
					</div>

					<div>
						<Button className="w-full h-12 rounded-[10px]" variant="default" disabled={loading} type="submit">{loading ? <Spinner /> : "Create an account"}</Button>

						<Link href="/auth/login">
							<Button className="w-full h-12 rounded-[10px] mt-4" variant="outline" disabled={loading} type="button">
								{loading ? <Spinner /> : "Login"}
							</Button>
						</Link>
					</div>
				</div>
			</form>
		</>
	);
}
