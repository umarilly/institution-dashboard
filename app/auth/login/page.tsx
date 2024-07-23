"use client"

import LoginForm from "@/app/auth/(components)/Login";

export default function Home() {
	return (
		<main className="flex w-full justify-center items-center h-screen relative">
			<LoginForm />
		</main>
	);
}