import { WhiteTick } from "@/svg-icons/SVGIcons";

const SidebarCircularIcons = ({
  selected = false,
  completed = false,
  svg,
}: {
  selected?: boolean;
  completed?: boolean;
  svg: React.ReactNode;
}) => {
  if (completed)
    return (
      <div className={`p-0.5 bg-[#3E477280] rounded-full max-w-fit`}>
        <div className={`p-[7px] bg-[#3E4772] rounded-full max-w-fit`}>
          <WhiteTick />
        </div>
      </div>
    );
  return (
    <div
      className={`p-0.5 ${
        selected ? "bg-[#e4edff80]" : "bg-[#FFFFFF80]"
      } rounded-full max-w-fit`}
    >
      <div
        className={`p-[7px] ${
          selected ? "bg-[#e4edff]" : "bg-[#FFF]"
        } rounded-full max-w-fit`}
      >
        {svg}
      </div>
    </div>
  );
};

export default SidebarCircularIcons;
