import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon, DeleteIcon } from "@/svg-icons/SVGIcons";
import React, { useRef, useState } from "react";
import { uuid } from "uuidv4";
import MyDeveloperDialog from "./MyDeveloperDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";

interface ApiToken {
  _id: string;
  name: string;
  created_by: string;
  createdAt: string;
  enabled: boolean;
}


const fetchApiTokens = async () => {
  const session = await fetchAuthSession();
  const accessToken = session.tokens!.accessToken.toString();
  const response = await axios.get(`${baseURL}/fund/setting/`, {
    headers: {
      Authorization: accessToken,
    },
  });
  return response.data.data.tokens;
};

const deleteApiToken = async (id: string) => {
  const session = await fetchAuthSession();
  const accessToken = session.tokens!.accessToken.toString();
  await axios.delete(`${baseURL}/fund/token/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const toggleApiToken = async (id: string) => {
  const session = await fetchAuthSession();
  const accessToken = session.tokens!.accessToken.toString();
  await axios.get(`${baseURL}/fund/token/toggle/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const Developer = () => {
  const [envID, setEnvID] = React.useState<string>("abcd-1234-vxyz-qwerty");
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: apiTokens = [], refetch } = useQuery<ApiToken[]>({
    queryKey: ["apiTokens"],
    queryFn: fetchApiTokens,
  });


  const deleteMutation = useMutation({
    mutationFn: deleteApiToken,
    onSuccess: () => {
      toast({
        title: "Token Deleted",
        description: "Token deleted successfully",
        duration: 3000,
        variant: "default",
        className: "rounded-xl p-3 bg-green-600 text-white",
      });
      refetch();
    },
    onError: (error: any) => {
      console.log("Error Deleting token", error);
      toast({
        title: "Token Deletion Error",
        description: error.message,
        duration: 3000,
        variant: "destructive",
        className: "rounded-xl p-3 bg-red-600 text-white",
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleApiToken,
    onSuccess: () => {
      toast({
        title: "Token Toggled",
        description: "Token toggled successfully",
        duration: 3000,
        variant: "default",
        className: "rounded-xl p-3 bg-green-600 text-white",
      });
      refetch();
    },
    onError: (error: any) => {
      console.log("Error Toggling token", error);
      toast({
        title: "Token Toggling Error",
        description: error.message,
        duration: 3000,
        variant: "destructive",
        className: "rounded-xl p-3 bg-red-600 text-white",
      });
    },
  });

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
        });

      toast({
        title: "Copied to clipboard",
        description: "Environment ID copied to clipboard",
        duration: 3000,
        variant: "default",
      });
    }
  };

  const regenerateEnvironmentID = () => {
    const newUUID = uuid();
    setEnvID(newUUID);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-10">General</h1>
      <div className="mb-10">
        <h2 className="text-base text-[#111111] font-medium mb-4">
          Environment ID
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex justify-between items-center bg-white rounded-xl border-[1px] border-[#E8E8E8] px-4 py-3 w-full">
            <p ref={textRef}>{envID}</p>
            <div className="cursor-pointer" onClick={handleCopy}>
              <CopyIcon />
            </div>
          </div>
          <MyDeveloperDialog
            onAddSuccess={() => queryClient.invalidateQueries({ queryKey: ["apiTokens"] })}
          />
        </div>
      </div>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base text-[#111111] font-medium">API Tokens</h2>
        </div>
        <Table className="w-full mt-4 border-[1px] border-[#E5EDFF] rounded-lg">
          <TableHeader>
            <TableRow className="text-xs text-[#8D96A9] font-semibold">
              <TableCell>Name</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiTokens.map((item: ApiToken) => (
              <TableRow key={item._id} className="text-sm text-[#111111] font-medium">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.created_by}</TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Switch
                    onClick={() => toggleMutation.mutate(item._id)}
                    defaultChecked={item.enabled}
                  />
                </TableCell>
                <TableCell>
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteMutation.mutate(item._id)}
                  >
                    <DeleteIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </>
  );
};

export default Developer;
