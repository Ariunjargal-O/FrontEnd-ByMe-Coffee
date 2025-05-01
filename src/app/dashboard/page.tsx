"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DonationType, UserProfileType } from "@/constnants/Type";
import { CopyButton } from "./components/ProfileShare";

export default function Page() {
  // Initialize as null to properly handle conditional rendering
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const getPro = async () => {
      try {
        setLoading(true);
        

        if (!userId) {
          setError("No user ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:8000/profiles/${userId}`, {
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

  const [donations, setDonations] = useState<DonationType>();
  useEffect(() => {
    const getDonation = async () => {
      try {
        
        const res = await fetch(
          `http://localhost:8000/donations/total-earnings/${userId}`,
          {
            headers: { "Content-type": "application/json" },
          }
        );

        const data = await res.json();

        console.log(data.message);

        if (data.success) {
          console.log("Profile data:", data.message);
          setDonations(data);
        } else {
          setError(data.message || "Failed to load donations");
        }
      } catch (error) {}
    };
    getDonation();
  }, []);
  return (
    <div className="px-20 flex gap-5 flex-col">
      <Badge
        variant={"outline"}
        className="my-5 flex justify-self–end bg-white py-1 px-2 rounded-3xl gap-2 absolute top-0 right-20"
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-45">
            <Link href={"/profile/${userId}"}>
              <DropdownMenuItem className="font-semibold">
                View my page
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard"}>
              <DropdownMenuItem className="font-semibold">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>My account</DropdownMenuItem>
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

      {loading ? (
        <Card className="mt-20">
          <CardContent className="flex justify-center items-center p-10">
            Loading profile data...
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="mt-20">
          <CardContent className="flex justify-center items-center p-10 text-red-500">
            {error}
          </CardContent>
        </Card>
      ) : profile ? (
        <Card className="mt-20">
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <Avatar className="w-15 h-15">
                  <AvatarImage src={profile.avatarimage} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-bold text-2xl leading-6">
                    Hi, {profile.name}
                  </p>
                  <p className="font-normal text-lg mt-2 leading-5">
                    buymeacoffee.com/{userId}
                  </p>
                </div>
              </div>
              <CopyButton userId={userId} />
            </div>
            <hr className="my-5" />
            <div>
              <div className="flex gap-5 items-center">
                <p className="font-semibold text-2xl leading-7">Earnings</p>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Badge
                      variant={"outline"}
                      className="rounded-3xl px-5 py-2 text-base"
                    >
                      Last 30 days <ChevronDown />
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                    <DropdownMenuItem>All time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-4xl font-bold py-4">${donations?.amount}</p>

              <div className="flex gap-10 justify-start">
                <div className="flex gap-1 items-center">
                  <p className="bg-amber-100 w-5 h-5 rounded-sm"></p>
                  <p>$ 0</p>
                  <p className="text-sm text-gray-500">Supporters</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="bg-pink-100 w-5 h-5 rounded-sm"></p>
                  <p>$ 0</p>
                  <p className="text-sm text-gray-500">Membership</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="bg-blue-100 w-5 h-5 rounded-sm"></p>
                  <p>$ 0</p>
                  <p className="text-sm text-gray-500">Shop</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-20">
          <CardContent className="flex justify-center items-center p-10">
            No profile data available
          </CardContent>
        </Card>
      )}

      <Card className="p-5">
        <CardContent className="border-1 p-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <Badge className="bg-gray-400 w-10 h-10 rounded-full">
              <Heart />
            </Badge>
            <p className="font-semibold text-xl">
              You don't have any supporters yet
            </p>
            <p className="text-gray-600">
              Share your page with your audience to get started.
            </p>
          </div>
        </CardContent>
      </Card>
      <p className="font-semibold text-2xl">More ways to earn</p>
      <Card>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
