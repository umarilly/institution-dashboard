import SidebarCircularIcons from "@/components/ui/SidebarCircularIcons";
import { Bag, Dollar, FinanceBook, Fund, User } from "@/svg-icons/SVGIcons";

const SideBar = ({ selected = 1 }: { selected?: number }) => {
  return (
    <div className="w-[33%] min-w-[260px] bg-[#F8FAFC] max-h-screen min-h-screen flex flex-col justify-center items-center gap-1">
      <div className="flex gap-3 items-center w-[250px] text-[14px]">
        {selected === 1 ? (
          <SidebarCircularIcons selected={true} svg={<Bag />} />
        ) : (
          <SidebarCircularIcons svg={<Bag />} completed={true} />
        )}
        <p>Business information</p>
      </div>
      <div className="w-[250px]">
        <div className="ml-[16px] w-0.5 bg-[#E8E8E8] h-16"></div>
      </div>
      <div className="flex gap-3 items-center w-[250px] text-[14px]">
        {selected === 2 ? (
          <SidebarCircularIcons selected={true} svg={<Bag />} />
        ) : (
          <SidebarCircularIcons svg={<FinanceBook />} completed={selected > 2} />
        )}
        <p>Financial information</p>
      </div>
      <div className="w-[250px]">
        <div className="ml-[16px] w-0.5 bg-[#E8E8E8] h-16"></div>
      </div>
      <div className="flex gap-3 items-center w-[250px] text-[14px]">
        {selected === 3 ? (
          <SidebarCircularIcons selected={true} svg={<User />} />
        ) : (
          <SidebarCircularIcons svg={<User />} completed={selected > 3} />
        )}
        <p>Fund Manager information</p>
      </div>
      <div className="w-[250px]">
        <div className="ml-[16px] w-0.5 bg-[#E8E8E8] h-16"></div>
      </div>
      <div className="flex gap-3 items-center w-[250px] text-[14px]">
        {selected === 4 ? (
          <SidebarCircularIcons selected={true} svg={<Fund />} />
        ) : (
          <SidebarCircularIcons svg={<Fund />} completed={selected > 4} />
        )}
        <p>Fund Documents</p>
      </div>
      <div className="w-[250px]">
        <div className="ml-[16px] w-0.5 bg-[#E8E8E8] h-16"></div>
      </div>
      <div className="flex gap-3 items-center w-[250px] text-[14px]">
        {selected === 5 ? (
          <SidebarCircularIcons selected={true} svg={<Dollar />} />
        ) : (
          <SidebarCircularIcons svg={<Dollar />} completed={selected > 5} />
        )}
        <p>Base Currency</p>
      </div>
    </div>
  );
};

export default SideBar;
