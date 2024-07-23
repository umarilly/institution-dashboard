"use client"

import TwoFAForm from "@/app/auth/(components)/TwoFA";

export default function Home() {
	return (
		<main className="flex w-full justify-center items-center h-screen relative">
			<TwoFAForm />
		</main>
	);
}