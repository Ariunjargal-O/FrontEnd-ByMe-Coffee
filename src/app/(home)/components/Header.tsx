import { Button } from "@/components/ui/button";
import { Apple, ChevronDown, Heart, HelpCircle } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <nav className="w-full flex justify-between items-center p-5 bg-white ">
      <div className="flex gap-5 items-center">
        <Button
          variant="outline"
          className="border-0 shadow-none hover:bg-gray-200 rounded-3xl font-semibold"
        >
          FAQ
        </Button>
        <Button
          variant="outline"
          className="border-0 shadow-none hover:bg-gray-200 rounded-3xl font-semibold"
        >
          Wall of <Heart />
        </Button>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-0 shadow-none hover:bg-gray-200 rounded-3xl font-semibold flex gap-1 py-2 px-3 items-center">
              Resources
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <HelpCircle />
                Help Cnter
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Image
                  width={15}
                  height={15}
                  src="/apple.png"
                  alt="applelogo"
                />
                IOS
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Image
                  width={15}
                  height={15}
                  src="/android.png"
                  alt="androidlogo"
                />
                Android
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Image src="/brand-logo.svg" alt="logo" width={200} height={50} />
      <div className=" flex gap-5">
        <Link href={"/login"}>
          <Button
            variant="outline"
            className="border-0 shadow-none hover:bg-gray-200 rounded-3xl font-semibold"
          >
            Login
          </Button>
        </Link>
        <Link href={"/signup"}>
          {" "}
          <Button className="bg-amber-300 text-black hover:bg-amber-300 rounded-3xl border-2 border-transparent hover:border-amber-300 hover:border-2 font-semibold">
            Sign up
          </Button>
        </Link>
      </div>
    </nav>
  );
};
