"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/constnants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { FormValuesType } from "@/constnants/Type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { error } from "console";
import { Username } from "../Components/Username";

export default function EmailPage() {
  const formSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5)
      .max(50),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const createUser = async (val: z.infer<typeof formSchema>) => {
    // console.log(val);
    // console.log(BASE_URL);
   try{
    const username = localStorage.getItem("username");
    const response = await fetch(`http://localhost:8000/users/sign-up`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: val.email,
        password: val.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();

    return user;
   }catch(error:any){
    console.log(error.message)
   }
  };

  const router = useRouter();
  const onSubmit = async (val: z.infer<typeof formSchema>) => {
    try {
      // console.log(val);
      const user = await createUser(val);
      if (user) {
        toast("User successfully register.");
      }

      router.push("/signup/createaccount");
      console.log(user);
    } catch (error: unknown) {
      console.log((error as Error).message);
    }
  };
  

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
          <div className="flex flex-col self-center ">
            <p className="font-semi text-3xl leading-8">Create Your Account</p>
            <p className="font-normal text-lg text-gray-500 leading-5 pt-2 pb-8">
              Choose a username for your page
            </p>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          // value={`buymeacoffee.com/${field.value}`}}
                          placeholder="Please your email"
                          {...field}
                        ></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          // value={`buymeacoffee.com/${field.value}`}}
                          placeholder="Please your password"
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
                  className="hover:bg-amber-300 bg-gray-200 hover:cursor-pointer"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
