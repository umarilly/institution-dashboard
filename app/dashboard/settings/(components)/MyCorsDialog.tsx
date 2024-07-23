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
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import React, { useRef, useState } from "react";

const MyCorsDialog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const { toast } = useToast();

  const addThisOrigin = async () => {
    if (!origin) {
      setErrors("Attribute is required");
      return;
    }

    setLoading(true);
    // Add your add rule logic here

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Once done
    setLoading(false);

    toast({
      variant: "default",
      title: "Origin Added",
      duration: 2000,
      description: "Origin added successfully",
      className: "rounded-xl p-3 bg-green-600 text-white",
    });

    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    }
  };

  const clearAllStates = () => {
    setOrigin("");
    setErrors("");
  };

  return (
    <Dialog onOpenChange={(val) => clearAllStates()}>
      <DialogTrigger asChild>
        <Button className="bg-[#E4EDFF] hover:bg-[#E4EDFF95] text-[#3E4772] px-5 py-4">
          Add origin
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-[24px] font-bold text-black mb-2">
            Add Origin
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 mb-8">
          <label className="text-[#3E4772] text-[16px] font-medium" htmlFor="origin">
            Origin
          </label>
          <Input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              setErrors("");
            }}
          />
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
        </div>
        <div className="flex justify-between gap-5">
          <DialogClose asChild ref={dialogCloseRef}>
            <Button className="w-full p-5 text-[16px] text-[#3E4772] bg-[#E4EDFF] hover:bg-[#E4EDFF95]">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-full p-5 text-[16px] text-[#E4EDFF] bg-[#3E4772] hover:bg-[#3E477295]"
            onClick={addThisOrigin}
          >
            {loading ? <Spinner /> : "Add origin"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyCorsDialog;
