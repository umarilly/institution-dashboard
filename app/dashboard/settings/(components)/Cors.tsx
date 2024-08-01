import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIcon } from "@/svg-icons/SVGIcons";
import MyDialog from "./MyCorsDialog";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";
import { baseURL } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";

interface CorsOrigin {
  id: string;
  origin: string;
}

const fetchCorsData = async () => {
  const session = await fetchAuthSession();
  const accessToken = session.tokens!.accessToken.toString();
  console.log(accessToken);
  const response = await axios.get(`${baseURL}/fund/setting/`, {
    headers: {
      Authorization: accessToken,
    },
  });
  const responseData = response.data.data;
  return responseData.settigs.cors_origins;
};

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
  
  const { data: corsData, isLoading, isError } = useQuery<CorsOrigin[]>({
    queryKey: ["corsOrigins"],
    queryFn: fetchCorsData,
  });

  const mutation = useMutation({
    mutationFn: deleteCorsOrigin,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["corsOrigins"]});
      toast({
        variant: "default",
        title: "Origin Deleted",
        duration: 3000,
        description: "Origin deleted successfully",
        className: "rounded-xl p-3 bg-green-600 text-white",
      });
    },
    onError: (error: any) => {
      console.log("Error Deleting Origin", error);
      toast({
        variant: "destructive",
        title: "Error Deleting Origin",
        duration: 3000,
        description: error.message,
        className: "rounded-xl p-3 bg-red-600 text-white",
      });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading data...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">General</h1>
        <MyDialog onAddSuccess={() => queryClient.invalidateQueries({queryKey:["corsOrigins"]})} />
      </div>
      <h2 className="text-base text-[#111111] font-medium mb-4">Available origins</h2>
      <div className="flex flex-col gap-2">
        {corsData?.map((origin) => (
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