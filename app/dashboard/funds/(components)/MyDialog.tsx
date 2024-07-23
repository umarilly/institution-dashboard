import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { RedirectIcon } from "@/svg-icons/SVGIcons";
import { useEffect, useRef, useState } from "react";

type AddRuleType = {
  name: string;
  attribute: string;
  operator: string;
  value: string;
};

export default function MyDialog() {
  const { toast } = useToast();
  const [rules, setRules] = useState<AddRuleType | null>(null);
  const [errors, setErrors] = useState<AddRuleType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleChange = (field: keyof AddRuleType, value: string) => {
    console.log("kuch to dikhao", field, value);
    setRules((prev) => ({ ...prev, [field]: value } as AddRuleType));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" } as AddRuleType));
    }
  };

  const addThisRule = async () => {
    if (!rules?.attribute || !rules?.operator || !rules?.value) {
      setErrors({
        name:!rules?.name? "Rule name is required":"",
        attribute: !rules?.attribute ? "Attribute is required" : "",
        operator: !rules?.operator ? "Operator is required" : "",
        value: !rules?.value ? "Value is required" : "",
      });
      return;
    }

    setLoading(true);
    // Add your add rule logic here

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Once done
    setLoading(false);

    toast({
      variant: "default",
      title: "Rule Added",
      duration: 2000,
      description: "Rule added successfully",
      className: "rounded-xl p-3 bg-green-600 text-white",
    });

    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    }
  };

  return (
    <DialogContent className="w-[600px]">
      <DialogHeader className="mb-8">
        <DialogTitle className="text-[24px] font-bold text-black mb-2">
          Custom Rules
        </DialogTitle>
        <span className="flex gap-2 items-center">
          <DialogDescription className="text-sm text-[#3E4772] font-semibold">
            Learn more
          </DialogDescription>
          <RedirectIcon />
        </span>
      </DialogHeader>
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <label htmlFor="value">Name</label>
          <Input
            onChange={(e) => handleChange("name", e.target.value)}
            value={rules?.name}
            type="text"
            id="name"
            placeholder="Enter rule name"
            className="placeholder:text-[#8D96A9] text-base"
          />
          {errors?.value && <p className="text-red-500 text-sm">Name is required</p>}
        </div>
        <div>
          <label htmlFor="attribute">Attribute</label>
          <Select
            onValueChange={(value) => handleChange("attribute", value)}
            value={rules?.attribute}
          >
            <SelectTrigger id="attribute" name="attribute">
              <SelectValue
                placeholder="Select Credential Attribute (e.g Crypto Assets)"
                className="text-[#8D96A9] text-base"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {errors?.attribute && (
            <p className="text-red-500 text-sm">Attribute is required</p>
          )}
        </div>
        <div>
          <label htmlFor="operator">Operator</label>
          <Select
            onValueChange={(value) => handleChange("operator", value)}
            value={rules?.operator}
          >
            <SelectTrigger id="operator" name="operator">
              <SelectValue
                placeholder="Select Operator (e.g Greater Than, Less Than)"
                className="text-[#8D96A9] text-base"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {errors?.operator && (
            <p className="text-red-500 text-sm">Operator is required</p>
          )}
        </div>
        <div>
          <label htmlFor="value">Value</label>
          <Input
            onChange={(e) => handleChange("value", e.target.value)}
            value={rules?.value}
            type="text"
            id="value"
            placeholder="Enter value to compare to (20)"
            className="placeholder:text-[#8D96A9] text-base"
          />
          {errors?.value && <p className="text-red-500 text-sm">Value is required</p>}
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <DialogClose asChild ref={dialogCloseRef}>
          <Button className="w-full p-5 text-[16px] text-[#3E4772] bg-[#E4EDFF] hover:bg-[#E4EDFF95]">
            Cancel
          </Button>
        </DialogClose>
        <Button
          className="w-full p-5 text-[16px] text-[#E4EDFF] bg-[#3E4772] hover:bg-[#3E477295]"
          onClick={addThisRule}
        >
          {loading ? <Spinner /> : "Add rule"}
        </Button>
      </div>
    </DialogContent>
  );
}
