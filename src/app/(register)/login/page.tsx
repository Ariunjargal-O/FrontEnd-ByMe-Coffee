"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function LoginPage() {
  const form = useForm({
    // resolver: async (data) => {
    //   try {
    //     formSchema.parse(data);
    //     return { values: data, errors: {} };
    //   } catch (error) {
    //     return { values: {}, errors: error.formErrors.fieldErrors };
    //   }
    // },
  });
  return (
    <div className="w-full bg-yellow-300 flex h-screen ">
      <div className="w-1/2">
        <div className="flex items-center gap-3 pt-10 pl-10 absolute ">
         <Link href={"/"}> <Image alt="logo" src="/coffee-logo.svg" width={30} height={30} /></Link>
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
            href="/signup"
            className="underline italic hover:text-blue-800 hover:underline-hide"
          >
            {" "}
            Sign up
          </Link>
        </div>
        <div className="flex justify-center self-center h-full">
          <div className="flex flex-col self-center ">
            <p className="font-semi text-3xl pb-8 leading-8">Welcome back</p>

            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          // value={`buymeacoffee.com/${field.value}`}}
                          placeholder="buymeacoffee.com/"
                          {...field}
                        ></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  type="submit"
                  className="hover:bg-amber-200 bg-amber-300 hover:cursor-pointer rounded-4xl px-15 py-6 text-lg font-semibold border-0"
                >
                  Continue with email
                </Button>
                < div className="flex items-center justify-between gap-2">
                  <hr className="w-full border-gray-300" />
                 <span className="text-gray-400 ">or </span>
                  <hr className="w-full border-gray-300" />
                </div>

                <div className="flex gap-4 pt-5 flex-col [&_button]:w-full [&_button]:rounded-4xl [&_button]:border-2 [&_button]:py-6 [&_button]:text-lg [&_button]:font-semibold">
                  <Button variant="outline">Continue with Google</Button>
                  <Button variant="outline">Continue with Facebook</Button>
                  <Button variant="outline">Continue with Apple</Button>
                  <Button variant="outline">Continue with Twitter</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
