import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";
import { baseURL } from "@/lib/constants";

const fetchSettingsData = async () => {
    const session = await fetchAuthSession();
    const accessToken = session.tokens!.accessToken.toString();
    const response = await axios.get(`${baseURL}/fund/setting`, {
        headers: {
            Authorization: accessToken,
        },
    });
    const dataFromResponse = response.data;
    const settingsData = dataFromResponse.data;
    return settingsData;
};

export const useSettings = () => {
    return useQuery({
        queryKey: ["settings"],
        queryFn: fetchSettingsData,
    });
};