import WFetch from "@/lib/Wfetch";
import { baseURL } from "@/lib/constants";

export const ToggleOnboardingStatus = async (email: string) => {
  const response = await WFetch(`${baseURL}/institute/confirm-onboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  return data;
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
