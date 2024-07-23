"use client"

import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from 'lucide-react';
import useAuthUser from "@/hooks/use-auth-user";

export default function ProfileButton() {

  const user = useAuthUser();

  const router = useRouter();

  const clearState = useAuthStore((state) => state.clearState);

  const handleSignOut = async () => {
    try {
      await signOut()
      clearState();
      router.replace("/auth/login");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-xl">{user && user.email}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 rounded-xl">
        <DropdownMenuItem className="px-3 py-3 rounded-lg cursor-pointer" onClick={handleSignOut}>
          <div className="flex justify-between w-full">
            <span className="text-base">Logout</span>
            <span><LogOutIcon /></span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}