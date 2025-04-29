"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Icon, Menu, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constnants";
import { set } from "zod";
import { headers } from "next/headers";
import { UserProfileType, UserType } from "@/constnants/Type";

export default function Page() {
const [profiles, setProfiles] = useState([])
  useEffect(()=> {
    const getPro = async () => {
      const res = await fetch (`http://localhost:8000/profiles`, {
        
        headers:{"Content-Type":"application/json"}
      })
const data = await res.json()
// console.log(data.message)
setProfiles(data.message)
    }
    getPro()
  },[])
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
            <DropdownMenuItem className="font-semibold">
              View my page
            </DropdownMenuItem>
            <Link href={"/dashboard"}>
              <DropdownMenuItem className="font-semibold">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>My account</DropdownMenuItem>
            <DropdownMenuItem>Refer a creator</DropdownMenuItem>
            <DropdownMenuItem>What's name</DropdownMenuItem>
            <DropdownMenuItem className="font-normal text-gray-400 ">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Badge>

      <Card className="mt-20">
      {
        profiles.map((profile:UserProfileType) => {
          return(<CardContent key={profile.id}>
            <div
              className="flex justify-between items-center
            "
            >
              <div className="flex gap-5 items-center">
                <Avatar className="w-15 h-15">
                  <AvatarImage src={profile.avatarimage} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-bold text-2xl leading-6">
                    Hi, {profile.name}
                  </p>
                  <p className="font-normal text-lg mt-2 leading-5"> buymeacoffee.com/{ }</p>
                  
                   
                
                </div>
              </div>
              <Button className="rounded-2xl px-4">
                <Share />
                Shares page
              </Button>
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
              <p className="text-4xl font-bold py-4">$450</p>

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
          </CardContent>)
        })
      }
      </Card>
      <Card className="p-5">
        <CardContent className="border-1 p-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <Badge className="bg-gray-400 w-10 h-10 rounded-full">
              <Heart className="" />
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
        <CardContent className=""></CardContent>
      </Card>
    </div>
  );
}
