
"use client";
import { useState, useEffect } from "react";
import OnBoarding from "./(components)/OnBoarding";
import axios from 'axios';
import { baseURL } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [businessInfoExists, setBusinessInfoExists] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkBusinessInfo = async () => {
      try {
        const session = await fetchAuthSession();
        const accessToken = session.tokens!.accessToken.toString();
        const response = await axios.get(`${baseURL}/fund`, {
          headers: {
            Authorization: accessToken,
          },
        });

        if (response.data) {
          const data = response.data;
          if (data.data && data.data.business_info) {
            setBusinessInfoExists(true);
            console.log("No")
            setMessage("You have already Onboarded - Cannot fill form Again - Redirecting to Dashboard");
            setTimeout(() => {
              router.push('/dashboard');
            }, 3000);
          } else {
            console.log("Yes")
            setBusinessInfoExists(false);
          }
        }
      } catch (error) {
        console.error("Error checking business info:", error);
      }
    };

    checkBusinessInfo();
  }, [router]);

  if (message) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-bold" >{message}</p>
      </div>
    );
  }

  return businessInfoExists === false ? <OnBoarding /> : null;
}
