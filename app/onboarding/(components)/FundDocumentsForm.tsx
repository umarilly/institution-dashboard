import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeftArrow, RightArrow } from "@/svg-icons/SVGIcons";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { useOnBoardingFormStore } from "./OnBoarding";
import { OnBoardingStoreType, fundDocumentsFormType } from "./type";
import { DeleteIcon } from "@/svg-icons/SVGIcons";

const FundDocumentsForm = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const fundDocumentsForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.fundDocumentsForm
  );
  const setFundDocumentsForm = useOnBoardingFormStore(
    (state: OnBoardingStoreType) => state.setFundDocumentsForm
  );
  const [files, setFiles] = useState<fundDocumentsFormType>({
    factsheet: fundDocumentsForm.factsheet,
    license: fundDocumentsForm.license,
    memorandum: fundDocumentsForm.memorandum,
  });
  const [errors, setErrors] = useState<{
    factsheet: string;
    license: string;
    memorandum: string;
  }>({
    factsheet: "",
    license: "",
    memorandum: "",
  });

  const updateFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = e.target.files;
    const field = e.target.name;
    if (filelist && filelist.length > 0) {
      const file = filelist[0];
      console.log(file);
      if (file.size > 5000000) {
        setErrors({
          ...errors,
          [field]: "File size should be less than 5MB",
        });
      } else {
        setErrors({ ...errors, [field]: "" });

        setFiles({
          ...files,
          [field]: filelist[0],
        });
      }
    }
  };

  function goBack() {
    setFundDocumentsForm({
      memorandum: files.memorandum,
      factsheet: files.factsheet,
      license: files.license,
    });

    setSelected(3);
  }
  function goForward() {
    console.log(files);
    let memorandum = "";
    let factsheet = "";
    let license = "";

    if (files.memorandum === null) {
      memorandum = "This field is required";
    }
    if (files.factsheet === null) {
      factsheet = "This field is required";
    }
    if (files.license === null) {
      license = "This field is required";
    }

    setErrors({ memorandum, factsheet, license });
    if (memorandum || factsheet || license) return;

    setFundDocumentsForm({
      memorandum: files.memorandum,
      factsheet: files.factsheet,
      license: files.license,
    });

    setSelected(5);
  }

  function deleteFile(nameForDelete: "memorandum" | "factsheet" | "license") {
    setFiles((prevValue) => {
      return { ...prevValue, [nameForDelete]: null };
    });
  }
  return (
    <>
      <div>
        <h1 className="text-[40px] mb-2 font-bold">Fund Documents</h1>
        <p className="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium" htmlFor="Memorandum">
            Memorandum
          </label>
          <Input
            type="file"
            accept=".pdf"
            name="memorandum"
            id="Memorandum"
            multiple={false}
            className="mt-2 hidden"
            onChange={(e) => updateFiles(e)}
          />
          <InputFileButton
            htmlFor="Memorandum"
            nameForDelete="memorandum"
            fileName={
              files.memorandum ? minimzeLength(files.memorandum.name) : "No file attached"
            }
            fileSize={
              files.memorandum
                ? convertToMBString(files.memorandum.size)
                : "Maximum size: 5MB"
            }
            deleteFile={deleteFile}
          />
          {errors.memorandum && (
            <span className="text-red-500 text-xs">{errors.memorandum}</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="factsheet">
            Factsheet
          </label>
          <Input
            type="file"
            name="factsheet"
            accept=".pdf"
            id="Factsheet"
            multiple={false}
            className="mt-2 hidden"
            onChange={(e) => updateFiles(e)}
          />
          <InputFileButton
            htmlFor="Factsheet"
            nameForDelete="factsheet"
            fileName={
              files.factsheet ? minimzeLength(files.factsheet.name) : "No file attached"
            }
            fileSize={
              files.factsheet
                ? convertToMBString(files.factsheet.size)
                : "Maximum size: 5MB"
            }
            deleteFile={deleteFile}
          />
          {errors.factsheet && (
            <span className="text-red-500 text-xs">{errors.factsheet}</span>
          )}
        </div>
        <div>
          <label className="font-medium" htmlFor="license">
            License
          </label>
          <Input
            type="file"
            accept=".pdf"
            name="license"
            id="License"
            multiple={false}
            className="mt-2 hidden"
            onChange={(e) => updateFiles(e)}
          />
          <InputFileButton
            htmlFor="License"
            nameForDelete="license"
            fileName={
              files.license ? minimzeLength(files.license.name) : "No file attached"
            }
            fileSize={
              files.license ? convertToMBString(files.license.size) : "Maximum size: 5MB"
            }
            deleteFile={deleteFile}
          />
          {errors.license && (
            <span className="text-red-500 text-xs">{errors.license}</span>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          style={{ background: "#E8E8E8" }}
          variant="secondary"
          className="flex gap-3"
          onClick={goBack}
        >
          <LeftArrow />
          <p>Back</p>
        </Button>
        <Button className="flex gap-3" onClick={goForward}>
          <p>Next</p>
          <RightArrow />
        </Button>
      </div>
    </>
  );
};

export default FundDocumentsForm;

function InputFileButton({
  htmlFor,
  fileName,
  fileSize,
  nameForDelete,
  deleteFile,
}: {
  htmlFor: string;
  fileName: string;
  fileSize: string;
  nameForDelete: "memorandum" | "factsheet" | "license";
  deleteFile: (htmlFor: "memorandum" | "factsheet" | "license") => void;
}) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl border-[1px] border-[#E8E8E8] px-4 py-3 mt-2">
      <div className="flex gap-3">
        <label
          htmlFor={htmlFor}
          className="px-3 py-2 bg-[#E4EDFF] rounded-lg text-[16px] font-medium text-[#111111] cursor-pointer"
        >
          Browse...
        </label>
        <div className="text-[#465668] text-[14px] flex flex-col justify-between">
          <p>{fileName}</p>
          <p>{fileSize}</p>
        </div>
      </div>
      {fileSize[0] !== "M" && (
        <div onClick={() => deleteFile(nameForDelete)} className="cursor-pointer">
          <DeleteIcon />
        </div>
      )}
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
