"use client"
import FundInformationCard from "@/app/dashboard/(components)/FundInformationCard";
import InvestorsTableCard from "@/app/dashboard/(components)/InvestorsListTable/InvestorsTableCard";
import OverviewCard from "@/app/dashboard/(components)/OverviewCard";
import SystemLogsCard from "@/app/dashboard/(components)/SystemLogsCard";
import UsersCard from "@/app/dashboard/(components)/UsersCard";
import SplashScreen from "@/components/splash/SplashScreen";
import { useAuthStore } from "@/store/use-auth-store";

export default function Home() {

	const getOnboardingStatus = useAuthStore((state) => state.getOnboardingStatus);
	const onboardingStatus = getOnboardingStatus();

	return (
		<div className="flex justify-center gap-4 mx-10 mt-10">
			{!onboardingStatus && <SplashScreen />}

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
