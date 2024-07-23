"use client"

import InvestorProfileCard from "./(components)/InvestorProfileCard";
import NavigationContentCard from "./(components)/NavigationContentCard";

export default function Home({ params }: { params: { id: string } }) {

  return (
    <div className="m-10 flex gap-4">
      <div className="w-[30%] 2xl:w-[25%]">
        <InvestorProfileCard params={params} />
      </div>

      <div className="w-[70%] 2xl:w-[75%]">
        <NavigationContentCard params={params} />
      </div>
    </div>
  );
}