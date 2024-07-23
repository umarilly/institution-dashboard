import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { saveEnvironmentID } from "@/services/onboarding-service";
import { useAuthStore } from "@/store/use-auth-store";
import { RightArrow } from "@/svg-icons/SVGIcons";
import { parsedErrorMessage } from "@/utils/error-message";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { uuid } from "uuidv4";

const GenerateEnvironmentID = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const getAuthData = useAuthStore((state) => state.getAuthData);
  const [envID, setEnvID] = useState("");
  const authData = getAuthData();

  const { toast } = useToast();

  const router = useRouter();

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          return;
        });

      toast({
        title: "Copied to clipboard",
        description: "Environment ID copied to clipboard",
        duration: 3000,
        variant: "default",
      });
    }
  };

  useEffect(() => {
    const newUUID = uuid();
    setEnvID(newUUID);
    console.log("email is : ", authData?.email);
    // do all the backend integration stuff under here
    saveEnvironmentID(authData?.email + "", newUUID);
  }, []);

  const launchAppAction = () => {
    try {
      // redirect to dashboard
      router.replace("/dashboard");
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error Occurred",
        description: String(parsedErrorMessage(error)),
      });
    }
  };
  return (
    <section
      className="max-w-[720px] h-fit p-[50px] rounded-2xl bg-[#ffffff80] my-[120px] flex flex-col gap-10"
      style={{
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.04)",
        backdropFilter: "blur(10px)",
        border: "1px solid #E8E8E8",
      }}
    >
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Environment ID</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex justify-between items-end">
        <div className="w-[75%]">
          <label className="font-medium" htmlFor="businessName">
            Environment ID
          </label>
          <div
            id="businessName"
            className="flex justify-between items-center bg-white rounded-xl border-[1px] border-[#E8E8E8] px-4 py-3 mt-2 w-full"
          >
            {/* change it to real environment id later */}
            <p ref={textRef}>{envID}</p>
            <div className="cursor-pointer" onClick={handleCopy}>
              <CopyIcon />
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          className="flex gap-2 bg-[#E4EDFF] text-[#3E4772] h-[50px]"
          onClick={launchAppAction}
        >
          Launch App
          <RightArrow strokeColor="#3E4772" />
        </Button>
      </div>
    </section>
  );
};

export default GenerateEnvironmentID;
