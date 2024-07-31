
import { baseURL } from "@/lib/constants";
import axios from 'axios';

export const SaveSignUpInstitutionInfo = async ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  console.log("Email : ",email);
  console.log("Username : ",userId);
  try {
    const response = await axios.post(`${baseURL}/auth/register`, {
      email,
      username: userId,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Signup Info Saved Successfully Ref#01");
    return response.data;
  } catch (error) {
    console.error('Error saving signup institution info : ', error);
    throw error;
  }
};