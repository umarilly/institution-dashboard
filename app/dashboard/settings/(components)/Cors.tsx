import { DeleteIcon } from "@/svg-icons/SVGIcons";
import React from "react";
import MyDialog from "./MyCorsDialog";

const ORIGINS = [
  { id: "1", origin: "https://www.google.com" },
  { id: "2", origin: "https://www.facebook.com" },
  { id: "3", origin: "https://www.twitter.com" },
  { id: "4", origin: "https://www.instagram.com" },
];

const Cors = () => {
  const deleteOrigin = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">General</h1>

        <MyDialog />
      </div>
      <h2 className="text-base text-[#111111] font-medium mb-4">Available origins</h2>
      <div className="flex flex-col gap-2">
        {ORIGINS.map((origin) => (
          <div
            key={origin.id}
            className="flex justify-between items-center px-5 py-4 border-[1px] border-[#E8E8E8] rounded-lg"
          >
            <p>{origin.origin}</p>
            <div className="cursor-pointer" onClick={() => deleteOrigin(origin.id)}>
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cors;
