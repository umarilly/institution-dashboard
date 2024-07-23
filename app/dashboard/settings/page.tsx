"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TopBar from "./(components)/TopBar";
import { useState } from "react";
import General from "./(components)/General";
import Cors from "./(components)/Cors";
import Developer from "./(components)/Developer";

export default function Home() {
  const [page, setPage] = useState(0);
  return (
    <div className="flex justify-center items-center">
      <Card className="mt-10 w-[80%] max-w-[900px] mb-20">
        <TopBar setPage={setPage} page={page} />
        <div className="p-10">
          {page === 0 && <General />}
          {page === 1 && <Cors />}
          {page === 2 && <Developer />}
        </div>
      </Card>
    </div>
  );
}

// <Card className="max-w-[850px] w-[80%]">
//   <CardHeader>
//     <CardTitle></CardTitle>
//     <CardDescription>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//       incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//       dolore magna aliqua.
//     </CardDescription>
//   </CardHeader>
//   <CardContent className="mt-6 flex flex-col gap-[40px]"></CardContent>
// </Card>
