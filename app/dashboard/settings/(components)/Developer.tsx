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
import React, { useRef } from "react";
import { uuid } from "uuidv4";
import MyDeveloperDialog from "./MyDeveloperDialog";

const DEVELOPERS = [
  {
    id: "1",
    name: "Admin",
    createdBy: "Admin",
    createdAt: "2021-09-01",
    status: true,
  },
  {
    id: "2",
    name: "Developer",
    createdBy: "Admin",
    createdAt: "2021-09-01",
    status: false,
  },
  {
    id: "3",
    name: "User",
    createdBy: "Admin",
    createdAt: "2021-09-01",
    status: true,
  },
];

const Developer = () => {
  const [envID, setEnvID] = React.useState<string>("abcd-1234-vxyz-qwerty");
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const { toast } = useToast();

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

  const regenerateEnvironmentID = () => {
    const newUUID = uuid();
    setEnvID(newUUID);
    // do all the backend integration stuff under here
  };

  const deleteDeveloper = (id: string) => {
    // do all the backend integration stuff under here
    console.log("delete id: ", id);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-10">General</h1>
      <div className="mb-10">
        <h2 className="text-base text-[#111111] font-medium mb-4">Environment ID</h2>
        <div className="flex items-center gap-4">
          <div className="flex justify-between items-center bg-white rounded-xl border-[1px] border-[#E8E8E8] px-4 py-3 w-full">
            {/* change it to real environment id later */}
            <p ref={textRef}>{envID}</p>
            <div className="cursor-pointer" onClick={handleCopy}>
              <CopyIcon />
            </div>
          </div>
          {/* <Button
            variant="secondary"
            className="flex gap-2 bg-[#E4EDFF] text-[#3E4772] h-[50px]"
            onClick={regenerateEnvironmentID}
          >
            Re-generate
          </Button> */}
                    <MyDeveloperDialog />
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
            {DEVELOPERS.map((item, index) => (
              <TableRow key={index} className="text-sm text-[#111111] font-medium">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.createdBy}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <Switch defaultChecked={item.status} />
                </TableCell>
                <TableCell>
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteDeveloper(item.id)}
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
