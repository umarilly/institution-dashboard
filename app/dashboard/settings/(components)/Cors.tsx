import React from "react";
import axios from "axios";
import { baseURL } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSettings } from "@/hooks/settings-fetch";
import { DeleteIcon } from "@/svg-icons/SVGIcons";
import MyDialog from "./MyCorsDialog";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";

interface CorsOrigin {
  id: string;
  origin: string;
}
const deleteCorsOrigin = async (id: string) => {
  const session = await fetchAuthSession();
  const accessToken = session.tokens!.accessToken.toString();
  await axios.delete(`${baseURL}/fund/cors/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const Cors = () => {

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading: loading, isError: error } = useSettings();
  const settingsData = settings?.settigs || {}; 
  const corsData = settingsData?.cors_origins || [];

  const mutation = useMutation({
    mutationFn: deleteCorsOrigin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        variant: "default",
        title: "Origin Deleted",
        duration: 3000,
        description: "Origin deleted successfully",
        className: "rounded-xl p-3 bg-green-600 text-white",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error Deleting",
        duration: 3000,
        description: "Error Deleting Origin",
        className: "rounded-xl p-3 bg-red-600 text-white",
      });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-start">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-start">
        <p> Error Loading settings data </p>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">General</h1>
        <MyDialog />
      </div>
      <h2 className="text-base text-[#111111] font-medium mb-4">Available origins</h2>
      <div className="flex flex-col gap-2">
        {corsData?.map((origin: CorsOrigin) => (
          <div
            key={origin.id}
            className="flex justify-between items-center px-5 py-4 border-[1px] border-[#E8E8E8] rounded-lg"
          >
            <p>{origin.origin}</p>
            <div className="cursor-pointer" onClick={() => handleDelete(origin.id)}>
              {mutation.status && mutation.variables === origin.id ? <Spinner /> : <DeleteIcon />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cors;