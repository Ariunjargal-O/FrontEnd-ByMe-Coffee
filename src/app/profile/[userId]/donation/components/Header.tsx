"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/constnants";
import { UserProfileType } from "@/constnants/Type";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [profile, setProfile] = useState<UserProfileType>();

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    console.log(process.env);

    const profile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profiles/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log(data.message);
        setProfile(data.message);
      } catch (error) {}
    };
    profile();
  }, []);

  const Logout = () => {
    localStorage.removeItem("userId");
  };

  return (
    <nav className="flex h-20 px-10 py-5 fixed bg-white justify-between w-screen">
      <div className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={profile?.avatarimage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-3xl font-bold leading-7">{profile?.name}</p>
      </div>
      <div>
        {" "}
        <Badge
          variant={"outline"}
          className="my-5 flex justify-self–end bg-white py-1 px-2 rounded-3xl gap-2 absolute top-0 right-20"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-45">
              <Link href={`"/profile/${userId}"`}>
                <DropdownMenuItem className="font-semibold">
                  View my page
                </DropdownMenuItem>
              </Link>
              <Link href={"/dashboard"}>
                <DropdownMenuItem className="font-semibold">
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href={"/dashboard/accountsettings"}>
                {" "}
                <DropdownMenuItem>My account</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Refer a creator</DropdownMenuItem>
              <DropdownMenuItem>What's name</DropdownMenuItem>
              <Link href={"/"}>
                <DropdownMenuItem
                  className="font-normal text-gray-400 hover:bg-amber-300"
                  onClick={Logout}
                >
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Badge>
      </div>
    </nav>
  );
};
