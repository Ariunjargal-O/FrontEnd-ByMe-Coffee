"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Menu, Search, Share2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserProfileType } from "@/constnants/Type";
import { BASE_URL } from "@/constnants";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function ExpolorePage() {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state: userId } = useLocalStorage("userId");


  console.log(profile);
  useEffect(() => {
    const getPro = async () => {
      try {
        setLoading(true);

        if (!userId) {
          setError("No user ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${BASE_URL}/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.success) {
          // console.log("Profile data:", data.message);
          setProfile(data.message);
        } else {
          setError(data.message || "Failed to load profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("An error occurred while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    getPro();
  }, []);

  const Logout = () => {
    localStorage.removeItem("userId");
  };
  return (
    <div>
      <div className="px-10 mt-20 w-full">
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
        <div className="">
          <p className="font-semibold leading-7 text-lg">Explore creators</p>
          <hr className="" />
          <div className="bg-white w-[300px] flex items-center gap-2 border-2 border-gray-200 rounded-2xl px-3 hover:bg-amber-200 mb-10">
            <Search />
            <Input
              type="search"
              placeholder="Search name"
              className="border-0 focus-visible:border-0 aria-invalid:ring-0 w-[300px]"
            ></Input>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="bg-gray-200 w-15 h-15 mx-auto rounded-full">
                <User className="mx-auto my-4" />
              </div>
              <p className="font-semibold text-base leading-6">
                No creators have signed up yet
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="my-5">
          <Card>
            <CardContent>
              <CardHeader>
                <div
                  className="flex justify-between items-center
          "
                >
                  <div className="flex gap-5 items-center">
                    <Avatar className="w-15 h-15">
                      <AvatarImage src={profile?.avatarimage} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-bold text-2xl leading-6">
                        Hi, {profile?.name}
                      </p>
                    </div>
                  </div>
                  <Link href={"/profile/${userId}"}>
                    <Button
                      variant={"outline"}
                      className="rounded-2xl px-4 bg-gray-200 hover:bg-amber-200"
                    >
                      View profile
                      <ExternalLink />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <div className="flex justify-between ">
                <div className="flex flex-col gap-2 w-[420px] mt-5">
                  <p className="font-semibold text-base leading-6">
                    About Space ranger
                  </p>
                  <p className="font-normal text-sm leading-5">
                    {profile?.about}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-[420px]">
                  <p className="font-semibold text-base leading-6 text-black">
                    Social media URL
                  </p>
                  <p className="font-normal text-sm leading-5">
                    {profile?.socialmediaurl}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
