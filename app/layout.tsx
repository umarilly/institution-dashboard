import type { Metadata } from "next";
import { Inter } from "next/font/google"
import Provider from './Provider';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import ConfigureAmplifyClientSide from "./amplify-cognito-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project David",
  description: "Project David is a platform for financial institutions to manage their users for compliance purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <Toaster />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
