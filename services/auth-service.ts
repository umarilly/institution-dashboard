import WFetch from "@/lib/Wfetch";
import { baseURL } from "@/lib/constants";

export const SaveSignUpInstitutionInfo = async ({
  email,
  userId
}: {
  email: string,
  userId: string
}) => {
  const response = await WFetch(`${baseURL}/institute/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, cognito_user_id: userId }),
  });
  const data = await response.json();

  return data;
}

// method to fetch onboarding status of institution
export const LoginInstitutionInfo = async (email: string) => {
  const response = await WFetch(`${baseURL}/institute/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  return data;
}