import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
  ChevronRightCircle,
  Star,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MainPage = () => {
  return (
    <div className="bg-amber-50">
      <div className="w-full flex justify-center items-center flex-col gap-5 py-10 px-60">
        <div className="flex gap-2 pt-15">
          <Star className="text-green-800" />
          <Star className="text-green-800" />
          <Star className="text-green-800" />
          <Star className="text-green-800" />
          <Star className="text-green-800" />
          <p>Loved by 1,000,000+ creators</p>
        </div>
        <div className="flex gap-3 flex-col items-center justify-center">
          <h1 className="text-8xl">Fund your </h1>
          <h1 className="text-8xl">creative work</h1>
        </div>
        <p className="text-[22px] leading-[34px] text-center">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </p>

       <Link href="/signup">
       <Button className="bg-amber-300 text-3xl rounded-4xl text-black py-9 px-10 my-4 border-4 border-amber-300 hover:bg-amber-200 hover:border-4 hover:border-amber-200">
          Start my page
        </Button></Link>
        <p>It’s free and takes less than a minute!</p>
      </div>
      <div>
        <div className="px-10">
          <Card>
            <CardContent className="flex flex-col justify-between px-10 py-10 ">
              <CardHeader className="flex justify-self-center flex-col ">
                <p className="mx-auto text-md  font-semibold text-gray-600">
                  SUPPORT
                </p>
                <h2 className="text-7xl leading-20 pb-9 text-center font-bold">
                  Give your audience an easy way to say thanks.
                </h2>
                <p className="text-2xl text-center">
                  Buy Me a Coffee makes supporting fun and easy. In just a
                  couple of taps, your fans can make the payment (buy you a
                  coffee) and leave a message.
                </p>
              </CardHeader>
              <CardDescription className="pt-5">
                <Image src='/main1.png' alt="main1" width={900} height={100}/>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div></div>
      </div>
    </div>
  );
};
