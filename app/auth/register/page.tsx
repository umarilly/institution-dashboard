"use client"

import RegisterForm from "@/app/auth/(components)/Register";

export default function Home() {
	return (
		<main className="flex w-full justify-center items-center h-screen relative">
			<RegisterForm />
		</main>
	);
}