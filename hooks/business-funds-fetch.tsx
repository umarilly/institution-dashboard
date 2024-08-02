import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";
import { baseURL } from "@/lib/constants";

const fetchBusinessFundsData = async () => {
    const session = await fetchAuthSession();
    const accessToken = session.tokens!.accessToken.toString();
    console.log("Access Token : ",accessToken);
    const response = await axios.get(`${baseURL}/fund/fund-info`, {
        headers: {
            Authorization: accessToken,
        },
    });
    const dataFromResponse = response.data;
    const businessdata = dataFromResponse.data;
    console.log("Business Data : ",businessdata);
    return businessdata;
};

export const useBusinessFunds = () => {
    return useQuery({
        queryKey: ["business-funds"],
        queryFn: fetchBusinessFundsData,
    });
};