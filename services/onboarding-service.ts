import WFetch from "@/lib/Wfetch";
import { baseURL } from "@/lib/constants";
import axios from 'axios';
import { fetchAuthSession } from "aws-amplify/auth";

export const ToggleOnboardingStatus = async (email: string) => {

  const session = await fetchAuthSession();
  const accessToken = session.tokens!.accessToken.toString();
  console.log("Access Token : ", accessToken);

  try {
    const response = await axios.get(`${baseURL}/fund/toggle-user`, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log("Response : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling onboarding status:", error);
    throw error;
  }
};

export const GetPresignedUrls = async (
  email: string,
  memorandum: string,
  factsheet: string,
  license: string
) => {
  const response = await WFetch(`${baseURL}/institute/generate-presigned-urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, memorandum, factsheet, license }),
  });
  const data = await response.json();

  return data;
};

export const saveEnvironmentID = async (email: string, envID: string) => {
  const response = await WFetch(`${baseURL}/institute/save-enironment-id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, envID }),
  });
  const data = await response.json();

  return data;
};
