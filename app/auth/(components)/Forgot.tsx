"use client"
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Spinner from "../../../components/ui/spinner";
import { useToast } from "../../../components/ui/use-toast";
import BackdropGradientBlurBlob from "../../../components/BackdropGradientBlurBlob";
import { useAuthStore } from "@/store/use-auth-store";
import { parsedErrorMessage } from "@/utils/error-message";


type Inputs = {
	email: string,
};

export default function ForgotForm() {
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const { toast } = useToast();

	const setAuthData = useAuthStore((state) => state.setAuthData);

	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true);
		try {
			setAuthData({
				email: data.email,
				password: ""
			});

			router.push("/auth/reset-password");
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
					<h1 className="text-[40px] font-bold mb-10">Forgot Password</h1>

					<div className="mb-10" id="form">
						<div>
							<label htmlFor="email" className="font-medium">Email</label>
							<Input type="email" placeholder="Email" id="email" className="mt-4 text-base rounded-[10px] h-12" {...register("email", { required: true })} />
							{errors.email && <span className="text-red-600 m-1 text-xs">Email is required</span>}
						</div>
					</div>

					<div>
						<Button className="w-full h-12 rounded-[10px]" variant="default" type="submit" disabled={loading}>
							{loading ? <Spinner /> : "Continue"}
						</Button>
						<Link href="/auth/login">
							<Button className="w-full h-12 rounded-[10px] mt-4" variant="outline" type="button" disabled={loading}>{loading ? <Spinner /> : "Back to Login"}</Button>
						</Link>
					</div>
				</div>
			</form>
		</>
	);
}
