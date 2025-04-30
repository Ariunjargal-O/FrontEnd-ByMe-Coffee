"use client"
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
import { Menu } from "lucide-react";
import Link from "next/link";

export const Header = () => {
 
  const Logout = () => {
    localStorage.removeItem("userId");
  };
  return (
    <nav className="flex h-20 px-10 py-5 fixed bg-white justify-between w-screen">
      <div className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-3xl font-bold leading-7">PRO ner</p>
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
             <Link href={"/profile/${userId}"}>
             <DropdownMenuItem className="font-semibold">
                View my page
              </DropdownMenuItem></Link>
              <Link href={"/dashboard"}><DropdownMenuItem className="font-semibold" >
                Dashboard
              </DropdownMenuItem></Link>
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
      </div>
    </nav>
  );
};
