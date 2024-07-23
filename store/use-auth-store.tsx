import { create, StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

const SECRET_KEY = String(process.env.NEXT_PUBLIC_SECRET_ENCRYPT_KEY);

type AuthState = {
  encryptedAuthData: string | null;
  onboardingStatus: any;
  setAuthData: ({ email, password, userId }: { email?: string, password?: string, userId?: string }) => void;
  getAuthData: () => { email?: string, password?: string, userId?: string } | null;
  setOnboardingStatus: (status: boolean) => void;
  getOnboardingStatus: () => boolean;
  clearState: () => void;
};

const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const authStore: StoreApi<AuthState> = createStore(
  persist(
    (set, get) => ({
      encryptedAuthData: null,
      onboardingStatus: null,
      setAuthData: ({ email, password, userId } = {}) => {
        try {
          const data = JSON.stringify({ email, password, userId });
          const encryptedData = encrypt(data);
          set({ encryptedAuthData: encryptedData });
        } catch (error) {
          console.error("Encryption error:", error);
        }
      },
      getAuthData: () => {
        const { encryptedAuthData } = get();
        if (!encryptedAuthData) {
          return null;
        }
        try {
          const decryptedData = decrypt(encryptedAuthData);
          return JSON.parse(decryptedData);
        } catch (error) {
          console.error("Decryption error:", error);
          return null;
        }
      },
      setOnboardingStatus: (status: boolean) => {
        try {
          const data = JSON.stringify({ onboardingStatus: status });
          set({ onboardingStatus: data });
        } catch (error) {
          console.error("error:", error);
        }
      },
      getOnboardingStatus: () => {
        const { onboardingStatus } = get();
        if (!onboardingStatus) {
          return false;
        }
        try {
          const decryptedData = JSON.parse(onboardingStatus);
          return decryptedData.onboardingStatus;
        } catch (error) {
          console.error("Decryption error:", error);
          return false;
        }
      },
      clearState: () => {
        set({ encryptedAuthData: null });
        set({ onboardingStatus: null });
        const storageKey = 'auth-storage';
        window.localStorage.removeItem(storageKey);
      },
    }),
    {
      name: 'auth-storage', // name of the storage
    }
  )
);

// export default useAuthStore;
export const useAuthStore = create(authStore);

export { authStore };
