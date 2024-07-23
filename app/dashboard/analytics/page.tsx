"use client"

import AnalyticsOverviewCard from "./(components)/AnalyticsOverviewCard";
import UserAnalyticsNavigationCard from "./(components)/UserAnalyticsNavigationCard";

export default function Home() {

  return (
    <div className="flex flex-col m-10 gap-5">
      <AnalyticsOverviewCard />

      <UserAnalyticsNavigationCard />
    </div>
  );
}
