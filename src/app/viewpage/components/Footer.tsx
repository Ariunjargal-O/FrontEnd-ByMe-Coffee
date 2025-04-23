import { ChevronRight, Earth } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="h-30 flex flex-col justify-center items-center mt-20 gap-2">
      <div className="flex gap-6">
        <p className="flex gap-2 items-center"> <Earth/>English</p>
        <p>Privacy</p>
        <p>Tearms</p>
        <p>Report</p>
      </div>
     <Link href={"/dashboard"}>
     <p className="flex gap-2 text-2xl text-pink-500 items-center italic font-semibold hover:text-pink-700 hover:underline">Start your Buy Me a Coffee page <ChevronRight/></p></Link>
    </div>
  );
};
