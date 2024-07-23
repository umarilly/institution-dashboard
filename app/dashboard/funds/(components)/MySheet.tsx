import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { RedirectIcon } from "@/svg-icons/SVGIcons";
import MyDialog from "./MyDialog";
import MyRules from "./MyRules";
import AcceptedIssuers from '../../../../components/ui/issuers-dropdown';

const RULES = [
  {
    id: "lkjdflksdfjsl",
    status: true,
    attribute: "Crypto Assets",
    operator: "Greater Than",
    value: "1000",
  },
  {
    id: "aksdfjhkafj",
    status: false,
    attribute: "Crypto Assets",
    operator: "Less Than",
    value: "1000",
  },
  {
    id: "aksdfjhkdddafj",
    status: true,
    attribute: "Age",
    operator: "Greater Than",
    value: "21",
  },
];

export default function MySheet({ title }: { title: string }) {
  return (
    <SheetContent className="flex flex-col gap-[40px] min-w-[630px] rounded-l-xl overflow-scroll">
      <SheetHeader>
        <SheetTitle className="text-[24px] font-bold text-black">{title}</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 mb-2">
            <h5 className="text-[16px] text-[#373542] font-semibold">
              Identity Credential
            </h5>
            <p className="text-xs text-[#8D96A9]">Required data</p>
          </div>
          <Switch className="accent-[#3E4772] text-[#3E4772] bg-[#3E4772]" />
        </div>
        <MyCheckbox name="First name" value="John" checked={true} />
        <MyCheckbox name="Last name" value="Doe" checked={true} />
        <MyCheckbox name="Age" value="32" checked={true} />
        <MyCheckbox name="Email" value="email@sample.com" />
        <MyCheckbox name="Address" value="Up Ave. Texas, United States" />
      </div>
      <div className="w-full h-auto">
        <h5 className="text-[16px] text-[#373542] font-semibold">
          Accepted Issuers
        </h5>
        <AcceptedIssuers />
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-[24px] font-bold text-black">Custom Rules</h2>
            <span className="flex gap-2 items-center">
              <p className="text-sm text-[#3E4772] font-semibold">Learn more</p>
              <RedirectIcon />
            </span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="bg-[#3E4772] text-[#E4EDFF] hover:bg-[#3E477295]"
              >
                Add Rule
              </Button>
            </DialogTrigger>
            <MyDialog />
          </Dialog>
        </div>
        <MyRules rules={RULES} />
      </div>
    </SheetContent>
  );
}

const MyCheckbox = ({
  name,
  value,
  checked,
}: {
  name: string;
  value: string;
  checked?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center px-5 py-4 border-[1px] border-[#E8E8E8] bg-white rounded-xl">
      <div className="flex items-center gap-2.5">
        <input
          id={name}
          type="checkbox"
          className="accent-[#3E4772]"
          defaultChecked={checked}
        />
        <label htmlFor={name} className="text-base text-[#8D96A9]">
          {name}
        </label>
      </div>
      <p className="text-base text-[#3E4772] font-semibold">{value}</p>
    </div>
  );
};
