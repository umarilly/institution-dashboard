import AuthNavbar from "@/components/AuthNavbar";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthNavbar />
      {children}
    </div>
  );
};

export default OnboardingLayout;
