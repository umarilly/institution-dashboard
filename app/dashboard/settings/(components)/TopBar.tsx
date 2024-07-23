import { CorsIcon, DeveloperIcon, SettingsIcon } from "@/svg-icons/SVGIcons";
import React, { Dispatch, SetStateAction } from "react";

const TopBar = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex justify-center items-center border-b-[1px] border-b-[#D9DBE9] gap-10">
      <div
        className={`box-border flex items-center gap-4 py-5 px-4 cursor-pointer border-b-[2px] ${
          page === 0 ? "border-b-[#3E4772]" : "border-b-[#ffffff]"
        }`}
        onClick={() => setPage(0)}
      >
        <div className="rounded-full p-2 bg-[#E4EDFF80] w-fit">
          <SettingsIcon />
        </div>
        <p
          className={`${
            page === 0 ? "text-[#3E4772]" : "text-[#8D96A9]"
          } text-base font-semibold`}
        >
          General
        </p>
      </div>
      <div
        className={`box-border flex items-center gap-4 py-5 px-4 cursor-pointer border-b-[2px] ${
          page === 1 ? "border-b-[#3E4772]" : "border-b-[#ffffff]"
        }`}
        onClick={() => setPage(1)}
      >
        <div className="rounded-full p-2 bg-[#E4EDFF80] w-fit">
          <CorsIcon />
        </div>
        <p
          className={`${
            page === 1 ? "text-[#3E4772]" : "text-[#8D96A9]"
          } text-base font-semibold`}
        >
          Cors
        </p>
      </div>
      <div
        className={`box-border flex items-center gap-4 py-5 px-4 cursor-pointer border-b-[2px] ${
          page === 2 ? "border-b-[#3E4772]" : "border-b-[#ffffff]"
        }`}
        onClick={() => setPage(2)}
      >
        <div className="rounded-full p-2 bg-[#E4EDFF80] w-fit">
          <DeveloperIcon />
        </div>
        <p
          className={`${
            page === 2 ? "text-[#3E4772]" : "text-[#8D96A9]"
          } text-base font-semibold`}
        >
          Developer
        </p>
      </div>
    </div>
  );
};

export default TopBar;
