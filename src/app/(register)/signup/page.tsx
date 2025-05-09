"use client";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Username } from "./_components/Username";

export default function SignUpPage() {
  return (
    <div className="w-full bg-yellow-300 flex h-screen ">
      <div className="w-1/2">
        <div className="flex items-center gap-3 pt-10 pl-10 absolute ">
          <Link href={"/"}>
            {" "}
            <Image alt="logo" src="/coffee-logo.svg" width={30} height={30} />
          </Link>
          <span>Welcome to Buy Me a Coffee</span>
        </div>
        <div className="flex justify-center items-center h-full px-5">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full max-w-xs"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          alt="car-1"
                          src="/car-1.png"
                          width={300}
                          height={300}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className=" bg-white w-4/4 rounded-l-4xl ">
        <div className="flex gap-2 absolute pt-10 pr-15 top-0 right-0">
          <p>Already have a account?</p>{" "}
          <Link
            href="/login"
            className="underline italic hover:text-blue-800 hover:underline-hide"
          >
            {" "}
            Sign in
          </Link>
        </div>
        <div className="flex justify-center self-center h-full">
          <Username />
        </div>
      </div>
    </div>
  );
}
