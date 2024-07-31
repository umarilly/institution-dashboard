"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";
import FundInformationCard from "@/app/dashboard/(components)/FundInformationCard";
import InvestorsTableCard from "@/app/dashboard/(components)/InvestorsListTable/InvestorsTableCard";
import OverviewCard from "@/app/dashboard/(components)/OverviewCard";
import SystemLogsCard from "@/app/dashboard/(components)/SystemLogsCard";
import UsersCard from "@/app/dashboard/(components)/UsersCard";
import SplashScreen from "@/components/splash/SplashScreen";

export default function Home() {

	const [onBoardingStatus, setOnBoardingStatus] = useState(null);

	const getOnBoardingStatus = async () => {

		const session = await fetchAuthSession();
		const accessToken = session.tokens!.accessToken.toString();
		console.log("Access Token : ", accessToken);

		try {
			const response = await axios.get(`${baseURL}/fund/fund-info`, {
				headers: {
					Authorization: accessToken,
				},
			});
			const completeResponse = response.data;
			const onBoardStatus = completeResponse.data
			console.log("On-Boarding Status : ", onBoardStatus.is_new);
			setOnBoardingStatus(onBoardStatus.is_new);

			return response.data;
		} catch (error) {
			console.error("Error toggling onboarding status:", error);
			throw error;
		}
	};

	useEffect(() => {
		getOnBoardingStatus();
	},[])



	return (
		<div className="flex justify-center gap-4 mx-10 mt-10">
			{onBoardingStatus === true ? <SplashScreen /> : " "}

			<div className="flex flex-col gap-4 w-[70%]">
				<OverviewCard />

				<InvestorsTableCard />
			</div>

			<div className="flex flex-col gap-4 w-[30%]" >
				<FundInformationCard />

				<UsersCard />

				<SystemLogsCard />
			</div>
		</div>
	);
}
