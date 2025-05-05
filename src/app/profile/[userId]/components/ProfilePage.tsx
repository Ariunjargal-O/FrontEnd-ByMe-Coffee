"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Camera, Coffee, Heart } from "lucide-react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ProfilePageView = () => {
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState<UserProfileType>();

  useEffect(() => {
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
  }, [userId]);

  const formSchema = z.object({
    amount: z.number().min(1),
    socialUrl: z
      .string()
      .url()
      .optional()
      .refine(
        (val: string | undefined) => {
          return (
            val === "" ||
            /^(http|https):\/\/(www\.)?[\w\-]+(\.[\w\-]+)+[^\s]*$/.test(
              val || ""
            )
          );
        },
        {
          message:
            "Please enter a valid social media URL starting with http:// or https://",
        }
      ),
    speciaMessage: z
      .string()
      .min(10)
      .max(500, {
        message: "About section cannot be longer than 500 characters.",
      })
      .optional(), // Optional field
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      socialUrl: "",
      speciaMessage: "",
    },
  });

  const [donation, setDonation] = useState<UserProfileType>();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {

  //   const donation = async (val: z.infer<typeof formSchema>) => {
  //     try {
  //       const res = await fetch(`${BASE_URL}/donations/${userId}`, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           amount: val.amount,
  //           socialUrl: val.socialUrl,
  //           speciaMessage: val.speciaMessage,
  //           userId: localStorage.getItem("userId"),
  //         }),
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       const data = await res.json();
  //       console.log(data.message);
  //       setDonation(data.message);
  //     } catch (error) {}
  //   };
  //   donation();
  // }, []);
  const router = useRouter();
  // const onSubmit = async (val: z.infer<typeof formSchema>) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${BASE_URL}/donations/${userId}`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         amount: val.amount,
  //         socialUrl: val.socialUrl,
  //         speciaMessage: val.speciaMessage,
  //         userId: localStorage.getItem("userId"),
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const data = await res.json();
  //     console.log(data.message);
  //     setDonation(data.message);
  //     if (res.ok) {
  //       toast.success("Profile updated successfully!");
  //       router.push("/profile/donation");
  //     } else {
  //       console.error("Error submitting profile:", res.statusText);
  //       toast.error("Failed to update profile. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error submitting form:", err);
  //     toast.error(
  //       "Submitting failed. Please check your connection or try again."
  //     ); //
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [activity, setActivity] = useState<number>();

  const oneDollar = () => {
    setActivity(1);
  };
  const twoDollar = () => {
    setActivity(2);
  };
  const fiveDollar = () => {
    setActivity(5);
  };
  const tenDollar = () => {
    setActivity(10);
  };

  return (
    <div className="w-screen h-screen ">
      <div className="pt-20"></div>
      <img
        className="h-1/3 bg-gray-200 flex justify-center items-center"
        src={profile?.backgroundimage}
      ></img>
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
            <CardContent className="flex flex-col gap-5 px-5 box-border">
              <CardHeader>
                <p className="font-semibold text-base leading-6 pb-3">
                  Buy Jake a Coffee
                </p>
              </CardHeader>

              <div className="flex flex-col gap-5">
                <Form {...form}>
                  <form
                    //   onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <div>
                      <p>Select amount : </p>
                      <div className="flex gap-5 mt-1 box-border">
                        <Button
                          className={`hover:bg-amber-300 ${
                            activity === 1
                              ? "bg-amber-300 border-black"
                              : "bg-gray-200"
                          }`}
                          variant={"outline"}
                          onClick={oneDollar}
                          value={1}
                        >
                          {" "}
                          <Coffee />
                          $1
                        </Button>
                        <Button
                          className={`bg-gray-200 hover:bg-amber-300 ${
                            activity === 2
                              ? "bg-amber-300 border-black"
                              : "bg-gray-200"
                          }`}
                          variant={"outline"}
                          onClick={twoDollar}
                          value={2}
                        >
                          <Coffee />
                          $2
                        </Button>
                        <Button
                          className={`bg-gray-200 hover:bg-amber-300 ${
                            activity === 5
                              ? "bg-amber-300 border-black"
                              : "bg-gray-200"
                          }`}
                          variant={"outline"}
                          onClick={fiveDollar}
                          value={5}
                        >
                          {" "}
                          <Coffee />
                          $5
                        </Button>
                        <Button
                          className={`bg-gray-200 hover:bg-amber-300 ${
                            activity === 10
                              ? "bg-amber-300 border-black"
                              : "bg-gray-200"
                          }`}
                          variant={"outline"}
                          onClick={tenDollar}
                          value={10}
                        >
                          {" "}
                          <Coffee />
                          $10
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="socialUrl"
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

                      <FormField
                        control={form.control}
                        name="speciaMessage"
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
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
