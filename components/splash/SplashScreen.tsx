"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleOnboardingStatus } from "@/services/onboarding-service";
import { useAuthStore } from "@/store/use-auth-store";
import Image from "next/image";

export default function SplashScreen() {
  const [currentTab, setCurrentTab] = useState(0);

  const getAuthData = useAuthStore((state) => state.getAuthData);
  const authData = getAuthData();

  const setOnboardingStatus = useAuthStore((state) => state.setOnboardingStatus);

  const nextTab = () => {
    if (currentTab < 2) setCurrentTab(currentTab + 1);
    else completeUserOnboarding();
  };

  const completeUserOnboarding = async () => {
    console.log("User onboarding completed");
    const response = await ToggleOnboardingStatus(authData?.email!);
    if (response.data) {
      console.log("Onboarding status set to true");
      setOnboardingStatus(true);
    }
  };
  return (
    <Dialog defaultOpen>
      <DialogContent
        className="!rounded-3xl"
        hideCloseButton={true}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex justify-between w-full px-4">
          <div
            className={`w-[30%] h-3 rounded-2xl ${currentTab === 0 ? "bg-color-primary" : "bg-color-tertiary"
              }`}
          ></div>
          <div
            className={`w-[30%] h-3 rounded-2xl ${currentTab === 1 ? "bg-color-primary" : "bg-color-tertiary"
              }`}
          ></div>
          <div
            className={`w-[30%] h-3 rounded-2xl ${currentTab === 2 ? "bg-color-primary" : "bg-color-tertiary"
              }`}
          ></div>
        </div>

        {currentTab === 0 && (
          <DialogHeader className="my-10">
            <Image
              src={"/onboarding.png"}
              alt={"onboarding image"}
              width={650}
              height={450}
            />
            <DialogTitle className="text-center text-color-primary text-2xl mb-5">
              Easily onboard your business
            </DialogTitle>
            <DialogDescription className="text-center text-color-secondary text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut magna aliqua.
            </DialogDescription>
          </DialogHeader>
        )}

        {currentTab === 1 && (
          <DialogHeader className="my-10">
            <Image
              src={"/dashboard.png"}
              alt={"onboarding image"}
              width={650}
              height={450}
            />
            <DialogTitle className="text-center text-color-primary text-2xl mb-5">
              Accessible dashboard
            </DialogTitle>
            <DialogDescription className="text-center text-color-secondary text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut magna aliqua.
            </DialogDescription>
          </DialogHeader>
        )}

        {currentTab === 2 && (
          <DialogHeader className="my-10">
            <Image
              src={"/auditreport.png"}
              alt={"onboarding image"}
              width={650}
              height={450}
            />
            <DialogTitle className="text-center text-color-primary text-2xl mb-5">
              Dowloadable audit reports
            </DialogTitle>
            <DialogDescription className="text-center text-color-secondary text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut magna aliqua.
            </DialogDescription>
          </DialogHeader>
        )}

        <div className="flex justify-evenly">
          <DialogClose asChild>
            <Button
              className="!p-5 bg-color-tertiary text-color-primary hover:bg-color-tertiaryHover w-[150px]"
              size="lg"
              onClick={completeUserOnboarding}
            >
              Skip this tutorial
            </Button>
          </DialogClose>

          {currentTab < 2 ? (
            <Button
              className="!p-5 bg-color-primary text-color-tertiary hover:bg-color-primaryHover hover:text-white w-[150px]"
              size="lg"
              onClick={nextTab}
            >
              {currentTab === 2 ? "Get Started" : "Next"}
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                className="!p-5 bg-color-primary text-color-tertiary hover:bg-color-primaryHover hover:text-white w-[150px]"
                size="lg"
                onClick={nextTab}
              >
                {currentTab === 2 ? "Get Started" : "Next"}
              </Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
