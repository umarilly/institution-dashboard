"use client";
import { DavidLogo } from "@/svg-icons/SVGIcons";
import ProfileButton from "@/components/ProfileButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Investors", href: "/dashboard/investors" },
  { title: "Funds", href: "/dashboard/funds" },
  { title: "Analytics", href: "/dashboard/analytics" },
  { title: "System Logs", href: "/dashboard/system-logs" },
  { title: "Settings", href: "/dashboard/settings" },
];

const AuthNavbar = () => {
  const pathname = usePathname();
  console.log("pathname : ", pathname);

  return (
    <div
      className={`flex justify-between items-center px-[80px] py-5 w-full ${
        pathname === "/onboarding" ? "absolute top-0 left-0" : ""
      }`}
    >
      <div>
        <DavidLogo />
      </div>

      {pathname !== "/onboarding" && (
        <div className="flex justify-between items-center w-[620px] px-4 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "bg-white rounded-lg shadow-sm text-color-primary font-semibold px-3 py-2"
                  : "text-color-secondary"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
      <ProfileButton />
    </div>
  );
};

export default AuthNavbar;
