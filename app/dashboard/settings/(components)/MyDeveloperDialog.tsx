import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "@/svg-icons/SVGIcons";
import { set } from "date-fns";
import React, { useEffect, useRef, useState } from "react";

const MyDeveloperDialog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [tokenCreated, setTokenCreated] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setTokenCreated(false);
    setToken("");
  }, []);

  const addThisToken = async () => {
    if (!token) {
      setErrors("Attribute is required");
      return;
    }

    setLoading(true);
    // Add your add rule logic here

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Once done
    setLoading(false);
    setTokenCreated(true);

    toast({
      variant: "default",
      title: "Token created",
      duration: 2000,
      description: "Token created successfully",
      className: "rounded-xl p-3 bg-green-600 text-white",
    });
  };

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
        description: "Token copied to clipboard",
        duration: 3000,
        variant: "default",
      });
    }
  };

  const clearAllStates = () => {
    setToken("");
    setErrors("");
    setTokenCreated(false);
  };

  return (
    <Dialog onOpenChange={(val) => clearAllStates()}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex gap-2 bg-[#E4EDFF] text-[#3E4772] h-[50px]"
        >
          Create token
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-[24px] font-bold text-black mb-2">
            {tokenCreated ? "Warning" : "Create Token"}
          </DialogTitle>
          {tokenCreated && (
            <DialogDescription className="text-base text-[#8D96A9] font-medium">
              This token won&apos;t be shown again so copy and save it somewhere safe.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col gap-2 mb-8">
          <label className="text-[#3E4772] text-[16px] font-medium" htmlFor="origin">
            Name
          </label>
          {tokenCreated ? (
            <div className="flex justify-between items-center bg-white rounded-xl border-[1px] border-[#E8E8E8] px-4 py-3 w-full">
              <p ref={textRef}>{token}</p>
              <div className="cursor-pointer" onClick={handleCopy}>
                <CopyIcon />
              </div>
            </div>
          ) : (
            <Select
              onValueChange={(value) => {
                setToken(value);
                setErrors("");
              }}
              value={token}
            >
              <SelectTrigger id="attribute" name="attribute">
                <SelectValue
                  placeholder="Enter token name"
                  className="text-[#8D96A9] text-base"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          )}
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
        </div>
        <div className="flex justify-between gap-5">
          {tokenCreated ? (
            <DialogClose asChild>
              <Button className="w-full p-5 text-[16px] text-[#3E4772] bg-[#E4EDFF] hover:bg-[#E4EDFF95]">
                Close
              </Button>
            </DialogClose>
          ) : (
            <>
              <DialogClose asChild ref={dialogCloseRef}>
                <Button className="w-full p-5 text-[16px] text-[#3E4772] bg-[#E4EDFF] hover:bg-[#E4EDFF95]">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="w-full p-5 text-[16px] text-[#E4EDFF] bg-[#3E4772] hover:bg-[#3E477295]"
                onClick={addThisToken}
              >
                {loading ? <Spinner /> : "Create token"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyDeveloperDialog;
