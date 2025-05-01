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
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { EditProfile } from "./EditProfile";
import { useEffect, useState } from "react";
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

  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPro = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");

        if (!userId) {
          setError("No user ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:8000/profiles/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.success) {
          console.log("Profile data:", data.message);
          setProfile(data.message);
        } else {
          setError(data.message || "Failed to load profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("An error occurred while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    getPro();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="pt-20"></div>
      <div className="h-1/3 bg-gray-200 flex justify-center items-center">
        <img
          className="h-1/3 bg-gray-200 flex justify-center items-center"
          src={profile?.backgroundimage}
        ></img>
        <Button className="">
          <Camera /> Add a cover image
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-10 w-screen px-20 absolute top-70">
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
                <Dialog>
                  <EditProfile />
                </Dialog>
              </CardHeader>
              <hr className="my-5" />
              <div>
                <p className="font-semibold text-base leading-6 pb-3">
                  About {profile?.name}
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
                <CardContent className=" flex justify-center items-center">
                  <div className="flex flex-col gap-5">
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
            <CardContent className="flex flex-col gap-5 box-border">
              <CardHeader>
                <p className="font-semibold text-base leading-6 pb-3">
                  Buy Jake a Coffee
                </p>
              </CardHeader>
              <div>
                <div>
                  <p>Select amount : </p>
                  <div className="flex gap-3 mt-1 mb-6">
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
                            <FormLabel>
                              Enter BuyMeCoffee or social acount URL:
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="buymeacoffee.com/"
                                {...field}
                              />
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
                                <Input
                                  placeholder="Please write your message here"
                                  {...field}
                                />
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
