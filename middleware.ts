import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server-utils";
// import useAuthStore from "./store/use-auth-store";
import { authStore } from './store/use-auth-store';

export async function middleware(request: NextRequest) {

  // const getOnboardingStatus = useAuthStore((state) => state.getOnboardingStatus)
  // const onboardingStatus = getOnboardingStatus()

  // Access Zustand store state directly
  const onboardingStatus = authStore.getState().getOnboardingStatus();

  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOn_onBoarding = request.nextUrl.pathname.startsWith("/onboarding");
  const isOnAdminArea = request.nextUrl.pathname.startsWith("/dashboard/admins");
  const isRoot = request.nextUrl.pathname === "/";

  if (isRoot) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
  }

  if (isOnDashboard) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
    if (isOnAdminArea && !user.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    return response;
  }

  if (isOn_onBoarding) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
    return response;
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};