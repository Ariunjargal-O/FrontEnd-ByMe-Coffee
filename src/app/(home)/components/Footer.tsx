import {
  ChevronDown,
  ChevronUp,
  icons,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

export const Footer = () => {
  return (
    <div className="w-full bg-amber-50 flex justify-between px-10 pt-14 pb-18">
      <div className="text-gray-400">© Buy Me a Coffee</div>
      <div className="flex gap-4 [&_ol]:list-none [&_ol]:hover:text-gray-500 [&_ol]:cursor-pointer [&_ol]:font-semibold" >
        <ol>About</ol>
        <ol>Help center</ol>
        <ol>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1 items-center">
              Apps <ChevronUp className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
        </ol>
        <ol>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1 items-center">
              Resources
              <ChevronUp className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="border-0 shadow-none hover:bg-gray-200 rounded-3xl"
                  >
                    Feature requests
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="border-0 shadow-none hover:bg-gray-200 rounded-3xl"
                  >
                    Buttons
                  </Button>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="border-0 shadow-none hover:bg-gray-200 rounded-3xl"
                  >
                    Ko-fi comparison
                  </Button>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="border-0 shadow-none hover:bg-gray-200 rounded-3xl"
                  >
                    Patreon comparison
                  </Button>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="border-0 shadow-none hover:bg-gray-200 rounded-3xl"
                  >
                    link in Bio
                  </Button>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="border-0 shadow-none hover:bg-gray-200 rounded-3xl"
                  >
                    Voicenotes
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="border-0 shadow-none hover:bg-gray-200 rounded-3xl"
                  >
                    Security policy
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </ol>
        <ol>Privacy</ol>
        <ol>Teams</ol>
      </div>
      <div className="flex gap-6">
        <Twitter />
        <Youtube />
        <Instagram />
      </div>
    </div>
  );
};
