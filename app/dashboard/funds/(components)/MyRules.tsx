import { Switch } from "@/components/ui/switch";
import { DeleteIcon } from "@/svg-icons/SVGIcons";
import React from "react";

const MyRules = ({ rules }: { rules: any[] }) => {
  if (rules.length === 0)
    return (
      <div className="flex flex-col justify-center items-center bg-[#8D96A940] h-[330px] border-[1px] border-[#E8E8E8] rounded-xl">
        <p className="text-[16px] text-[#8D96A9]">No rules added yet</p>
      </div>
    );

  const deleteRule = (id: string) => {
    console.log("delete rule with id: ", id);
  };

  return (
    <div className="flex flex-col gap-2">
      {rules.map((rule, index) => {
        return <Rule key={rule.id} rule={rule} deleteRule={deleteRule} />;
      })}
    </div>
  );
};

export default MyRules;

function Rule({ rule, deleteRule }: { rule: any; deleteRule: (id: string) => void }) {
  return (
    <div className="px-5 py-4 bg-white border-[1px] border-[#E8E8E8] rounded-xl flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Switch defaultChecked={rule.status} />
        <span className="cursor-pointer" onClick={() => deleteRule(rule.id)}>
          <DeleteIcon width="24" height="24" />
        </span>
      </div>
      <div className="flex justify-between items-center text-base">
        <p className="text-[#8D96A9]">Attribute</p>
        <p className="text-[#3E4772] font-semibold">{rule.attribute}</p>
      </div>
      <div className="flex justify-between items-center text-base">
        <p className="text-[#8D96A9]">Operator</p>
        <p className="text-[#3E4772] font-semibold">{rule.operator}</p>
      </div>
      <div className="flex justify-between items-center text-base">
        <p className="text-[#8D96A9]">Value</p>
        <p className="text-[#3E4772] font-semibold">{rule.value}</p>
      </div>
    </div>
  );
}
