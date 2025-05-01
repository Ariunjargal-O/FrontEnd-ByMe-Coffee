"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Camera, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { EditProfile } from "@/app/viewpage/components/EditProfile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constnants";
import { UserProfileType } from "@/constnants/Type";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const ProfilePageView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const [profile, setProfile] = useState<UserProfileType>();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    console.log(process.env);

    const profile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profiles/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log(data.message);
        setProfile(data.message);
      } catch (error) {}
    };
    profile();
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="pt-20"></div>
      <img
        className="h-1/3 bg-gray-200 flex justify-center items-center"
        src={profile?.backgroundimage}
      ></img>
      <div className="grid grid-cols-2 gap-10 px-20 absolute top-70">
        <div className="flex gap-5 flex-col">
          <Card>
            <CardContent className="box-border">
              <CardHeader className="flex justify-between">
                <div className="flex flex-row gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={profile?.avatarimage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-3xl font-bold leading-7">
                    {profile?.name}
                  </p>
                </div>
              </CardHeader>
              <hr className="my-5" />
              <div>
                <p className="font-semibold text-base leading-6 pb-3">
                  About PRONER
                </p>
                <p className="font-normal text-sm leading-5">
                  {" "}
                  {profile?.about}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="box-border">
              {" "}
              <div className="flex flex-col gap-2 w-[420px]">
                <p className="font-semibold text-base leading-6 text-black">
                  Social media URL
                </p>
                <p className="font-normal text-sm leading-5">
                  {profile?.socialmediaurl}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="box-border">
              <p className="font-semibold text-base leading-6 text-black mb-5">
                Recent Supporters
              </p>
              <Card className="">
                <CardContent className=" flex justify-center items-center box-border">
                  <div className="flex flex-col gap-5 items-center justify-center">
                    <Heart />
                    <p className="font-semibold text-base leading-6">
                      Be the first one to support Jake
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardContent className="flex flex-col gap-5 ">
              <CardHeader>
                <p className="font-semibold text-base leading-6 pb-3">
                  Buy Jake a Coffee
                </p>
              </CardHeader>
              <div className="flex flex-col gap-5">
                <div>
                  <p>Select amount : </p>
                  <div className="flex gap-5 mt-1 box-border">
                    <Button
                      className="bg-gray-200 hover:bg-amber-200"
                      variant={"outline"}
                    >
                      $1
                    </Button>
                    <Button
                      className="bg-gray-200 hover:bg-amber-200"
                      variant={"outline"}
                    >
                      $2
                    </Button>
                    <Button
                      className="bg-gray-200 hover:bg-amber-200"
                      variant={"outline"}
                    >
                      $5
                    </Button>
                    <Button
                      className="bg-gray-200 hover:bg-amber-200"
                      variant={"outline"}
                    >
                      $10
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <Form {...form}>
                    <form
                      //   onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Enter BuyMeCoffee or social acount URL:
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                  <div>
                    <Form {...form}>
                      <form
                        //   onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special message</FormLabel>
                              <FormControl>
                                <Input placeholder="shadcn" {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant={"outline"}
                          type="submit"
                          className="bg-gray-200 hover:bg-amber-200"
                        >
                          Support
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
