import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/lib/constants";
import { fetchAuthSession } from "aws-amplify/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSettings } from "@/hooks/settings-fetch";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { DeleteIcon } from "@/svg-icons/SVGIcons";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";

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
  const [changesLoading, setChangesLoading] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteImage = () => {
    setImage(null);
  };

  const uploadImage = async (data: any) => {
    const session = await fetchAuthSession();
    const accessToken = session.tokens!.accessToken.toString();
    const formData = new FormData();
    formData.append("icon", data);
    try {
      const response = await axios.post(`${baseURL}/fund/upload-icon`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      });
      console.log(response.data);
      toast({
        variant: "default",
        title: "Upload successful",
        duration: 2000,
        description: "File uploaded successfully",
        className: "rounded-xl p-3 bg-green-600 text-white",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        duration: 2000,
        description: "There was an error uploading the file",
        className: "rounded-xl p-3 bg-red-600 text-white",
      });
    }
  };

  const updateFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = e.target.files;
    if (filelist && filelist.length > 0) {
      const file = filelist[0];
      console.log(file);
      if (file.size > 5000000) {
        setFileError("File size should be less than 5MB");
      } else {
        setFileError("");
        setImage(file);
        await uploadImage(file);
      }
    }
  };

  const { data: settings, isLoading: loading, isError: error } = useSettings();

  useEffect(() => {
    if (settings) {
      const corsSettings = settings.settigs
      reset({
        displayName: corsSettings?.name || "",
        supportEmail: corsSettings?.supported_email || "",
        supportWebsite: corsSettings?.website || "",
      });
    }
  }, [settings, reset]);

  const updateGeneralSettings = async (data: any) => {
    const session = await fetchAuthSession();
    const accessToken = session.tokens!.accessToken.toString();
    const response = await axios.put(`${baseURL}/fund/setting`, {
      icon_url:
        "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/graph_triangle.png",
      supported_email: data.supportEmail,
      website: data.supportWebsite,
      name: data.displayName,
    }, {
      headers: {
        Authorization: accessToken,
      },
    });
  }

  const mutation = useMutation({
    mutationFn: updateGeneralSettings,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast({
        variant: "default",
        title: "Settings Updated Successfully",
        duration: 3000,
        description: "Your changes have been saved",
        className: "rounded-xl p-3 bg-green-600 text-white",
      });
      setChangesLoading(false);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error Updating Settings",
        duration: 3000,
        description: "There is an error while updating settings",
        className: "rounded-xl p-3 bg-red-600 text-white",
      });
      setChangesLoading(false);
    },
  });

  const saveChanges = (data: any) => {
    mutation.mutate(data);
    setChangesLoading(true);
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
            preview={image ? URL.createObjectURL(image) : (settings.settigs?.icon_url || "https://via.placeholder.com/150")}
            fileName={image ? minimzeLength(image.name) : "No file attached"}
            fileSize={image ? convertToMBString(image.size) : "Maximum size: 5MB"}
            deleteImage={deleteImage}
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
          <p className="text-xs text-[#8D96A9]">
            This email will be used by end users to contact support
          </p>
          <Input
            type="email"
            id="supportEmail"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter email address"
            {...register("supportEmail", { required: true })}
          />
          {errors.supportEmail && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="supportWebsite">
            Support website
          </label>
          <p className="text-xs text-[#8D96A9]">
            This website will be used by end users to access help centre
          </p>
          <Input
            type="url"
            id="supportWebsite"
            className="mt-2 placeholder:text-[#E8E8E8]"
            placeholder="Enter website address"
            {...register("supportWebsite", { required: true })}
          />
          {errors.supportWebsite && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>
        <Button
          className="bg-[#303F60] text-white py-3 px-5 rounded-md text-sm self-start"
          onClick={handleSubmit(saveChanges)}
        >
          {changesLoading ? <Spinner /> : "Save Changes"}
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
  deleteImage,
  preview,
}: {
  htmlFor: string;
  fileName: string;
  fileSize: string;
  preview: string;
  deleteImage: () => void;
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
                onClick={deleteImage}
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