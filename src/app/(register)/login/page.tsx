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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { DecodedTokenType } from "@/constnants/Type";
import { jwtDecode } from "jwt-decode";



export default function LoginPage() {
  const router = useRouter()


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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("http://localhost:8000/users/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok || !result.success) {
        toast(result.message );
        return;
      }

      toast.success("Login successful!");
      localStorage.setItem("userId", result.userId);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast("Login failed. Please check your credentials.");
    }
  };

  // // const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();
  // const onSubmit = async (val: z.infer<typeof formSchema>) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/users/sign-in`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: val.email,
  //         password: val.password,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     })
      
  //     //     if (!response.ok) {
  //     //       throw new Error("Login failed");
  //     //       return;
  //     //     }
  //     //     const user = await response.json();
  //     // if (!user.token) {
  //     //       toast.error("Login failed. No token received.");
  //     //       return;
  //     //     }
  //     //     localStorage.setItem("token", user.token);
  //     //     toast.success("Login successful!");

  //     // const decodeToken: DecodedTokenType = jwtDecode(user.token);
  //     // console.log(decodeToken)
  //     // localStorage.setItem("userId","id")

  //     const user = await response.json();
  //     console.log(response);
  //     // if (user) {
  //     //   toast("User successfully register.");
  //     //   console.log("amjilttai burtgegdlee");
  //     //   localStorage.setItem(
  //     //     "userId",
  //     //     user.message.map((item: any) => item.id)
  //     //   );
  //     // }

  //     router.push("/dashboard");
  //     // console.log(user);
  //   } catch (error: any) {
  //     console.error("Login error:", error);
  //     toast.error("Login failed. Please check your credentials.");
  //   }
  // };

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
                  className="hover:bg-amber-200 bg-amber-300 hover:cursor-pointer rounded-4xl px-15 py-6 text-lg font-semibold border-0"
                >
                  Continue with email
                </Button>
              </form>
            </Form>
            <div className="flex items-center justify-between gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <Form {...form}>
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
                
              </form>
            </Form> */
}
