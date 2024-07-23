import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { DeleteIcon } from "@/svg-icons/SVGIcons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const General = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      displayName: "",
      supportEmail: "",
      supportWebsite: "",
    },
  });
  const [image, setImage] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    reset({
      displayName: "Test",
      supportEmail: "shery@gmail.com",
      supportWebsite: "https://www.google.com",
    });
  }, []);

  function deleteFile() {
    setImage(null);
  }

  const updateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = e.target.files;
    if (filelist && filelist.length > 0) {
      const file = filelist[0];
      console.log(file);
      if (file.size > 5000000) {
        setFileError("File size should be less than 5MB");
      } else {
        setFileError("");
        setImage(file);
      }
    }
  };

  const saveChanges = async (data: any) => {
    console.log(data);

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      variant: "default",
      title: "Changes saved",
      duration: 2000,
      description: "Change saved successfully",
      className: "rounded-xl p-3 bg-green-600 text-white",
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-10">General</h1>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium" htmlFor="appIcon">
            App Icon
          </label>
          <p className="text-xs text-[#8D96A9]">Note: This icon will be used in SDK</p>
          <Input
            type="file"
            accept=".png , .jpeg , .jpg"
            id="appIcon"
            multiple={false}
            className="mt-2 hidden"
            onChange={(e) => updateFile(e)}
          />
          <InputFileButton
            htmlFor="appIcon"
            preview={image ? URL.createObjectURL(image) : ""}
            fileName={image ? minimzeLength(image.name) : "No file attached"}
            fileSize={image ? convertToMBString(image.size) : "Maximum size: 5MB"}
            deleteFile={deleteFile}
          />
          {fileError && <span className="text-red-500 text-xs">{fileError}</span>}
          {errors.displayName && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="displayName">
            Display name
          </label>
          <p className="text-xs text-[#8D96A9]">Note: This name will be used in SDK</p>
          <Input
            type="text"
            id="displayName"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter amount"
            {...register("displayName", { required: true })}
          />
          {errors.displayName && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="supportEmail">
            Support email
          </label>
          <p className="text-xs text-[#8D96A9]">Note: This email will be used in SDK</p>
          <Input
            type="text"
            id="supportEmail"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter amount"
            {...register("supportEmail", { required: true })}
          />
          {errors.supportEmail && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="supportWebsite">
            Support Website
          </label>
          <p className="text-xs text-[#8D96A9]">Note: This website will be used in SDK</p>
          <Input
            type="text"
            id="supportWebsite"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter amount"
            {...register("supportWebsite", { required: true })}
          />
          {errors.supportWebsite && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="mt-10" onClick={handleSubmit(saveChanges)}>
          {loading ? <Spinner /> : "Save changes"}
        </Button>
      </div>
    </>
  );
};

export default General;

function InputFileButton({
  htmlFor,
  fileName,
  fileSize,
  deleteFile,
  preview,
}: {
  htmlFor: string;
  fileName: string;
  fileSize: string;
  preview: string;
  deleteFile: () => void;
}) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl border-[1px] border-[#E8E8E8] px-4 py-3 mt-2">
      <div className="flex gap-3">
        <label
          htmlFor={htmlFor}
          className="w-[80px] h-[80px] bg-[#E4EDFF] rounded-full cursor-pointer relative flex justify-center items-center"
        >
          {preview ? (
            <>
              <Image
                src={preview}
                width={80}
                height={80}
                alt={""}
                className="w-[80px] h-[80px] bg-[#E4EDFF] rounded-full cursor-pointer"
              />
              <div
                className="p-1 rounded-full bg-[#3E4772] w-fit absolute right-0 bottom-0"
                onClick={deleteFile}
              >
                <DeleteIcon width="16" height="16" color="white" />
              </div>
            </>
          ) : (
            "Browse..."
          )}
        </label>
        <div className="text-[#465668] text-[14px] flex flex-col justify-center gap-1">
          <p>{fileName}</p>
          <p>{fileSize}</p>
          <p>Dimension: 128x128</p>
        </div>
      </div>
    </div>
  );
}

function convertToMBString(size: number) {
  if (size < 1048576) {
    return Math.floor(size / 1024) + "KB";
  }
  return Math.floor(size / 1024 / 1024) + "MB";
}

function minimzeLength(str: string) {
  if (str.length > 15) {
    return str.slice(0, 15) + "...";
  }
  return str;
}
