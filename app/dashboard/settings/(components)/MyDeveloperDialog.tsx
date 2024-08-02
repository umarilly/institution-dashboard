import React, { useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";
import { baseURL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

const MyDeveloperDialog = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [token, setOrigin] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addCorsOrigin = async () => {
    const session = await fetchAuthSession();
    const accessToken = session.tokens!.accessToken.toString();
    await axios.post(`${baseURL}/fund/token`, {
      name: token
    },
      {
        headers: {
          Authorization: accessToken,
        },
      });
  };

  const mutation = useMutation({
    mutationFn: addCorsOrigin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        variant: "default",
        title: "Token Added",
        duration: 3000,
        description: "Token Added Successfully",
        className: "rounded-xl p-3 bg-green-600 text-white",
      });
    },
    onError: (error: any) => {
      console.log("Error Adding token", error);
      toast({
        variant: "destructive",
        title: "Token Error",
        duration: 3000,
        description: "Error Adding Token",
        className: "rounded-xl p-3 bg-red-600 text-white",
      });
    },
    onSettled: () => {
      setLoading(false);
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
    },
  });

  const handleAddOrigin = () => {
    if (!token) {
      setErrors("Attribute is required");
      return;
    }
    setLoading(true);
    mutation.mutate();
  };

  const clearAllStates = () => {
    setOrigin("");
    setErrors("");
  };

  return (
    <Dialog onOpenChange={(val) => clearAllStates()}>
      <DialogTrigger asChild>
        <Button className="bg-[#E4EDFF] hover:bg-[#E4EDFF95] text-[#3E4772] px-5 py-4">
          Add token
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-[24px] font-bold text-black mb-2">
            Add token
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 mb-8">
          <label
            className="text-[#3E4772] text-[16px] font-medium"
            htmlFor="token"
          >
            token
          </label>
          <Input
            type="text"
            id="token"
            value={token}
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
            onClick={handleAddOrigin}
          >
            {loading ? <Spinner /> : "Add token"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyDeveloperDialog;