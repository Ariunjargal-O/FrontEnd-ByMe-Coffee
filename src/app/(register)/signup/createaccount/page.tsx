"use client";

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
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_URL } from "@/constnants";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

export default function ProfileAcoountSec() {
  const userId = localStorage.getItem("userId");

  const formSchema = z.object({
    fullname: z
      .string()
      .min(2, {
        message: "Fullname must be at least 2 characters.",
      })
      .max(50, {
        message: "Fullname cannot be longer than 50 characters.",
      }),

    about: z
      .string()
      .min(100)
      .max(500, {
        message: "About section cannot be longer than 500 characters.",
      })
      .optional(), // Optional field

    photo: z.string().url().optional(), // Optional field to store the photo URL

    socialMediaUrl: z
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
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      about: "",
      photo: "",
      socialMediaUrl: "",
    },
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setLoading(true);
      setPhotoPreview(URL.createObjectURL(file)); // Preview the photo
      // Create a form data object to send the image file to the server
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "i4yxitio"); // Replace with your Cloudinary upload preset

      try {
        // Send the file to Cloudinary
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/drhm9rfyi/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        console.log(data);

        if (data.secure_url) {
          setImageUrl(data.secure_url); // Set the preview URL from Cloudinary
          form.setValue("photo", data.secure_url); // Store the URL in the form
        }
      } catch (err) {
        console.error("Error uploading file:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/profiles/${userId}`, {
        method: "POST",
        body: JSON.stringify({
          fullname: data.fullname,
          about: data.about,
          photo: data.photo,
          socialMediaUrl: data.socialMediaUrl,
        }),
        headers: { "Content-Type": "application/app" },
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        router.push("signup/createaccount/bankcard");
      } else {
        console.error("Error submitting profile:", res.statusText);
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        "Submitting failed. Please check your connection or try again."
      ); //
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-20 py-10 flex flex-col gap-20 ">
      <header className="flex justify-between ">
        <Image src="/brand-logo.svg" alt="logo" width={300} height={200} />
        <Link href={"/"}>
          {" "}
          <Button className="hover:bg-amber-300 hover:text-black">
            Log out
          </Button>
        </Link>
      </header>

      <Card>
        <CardContent className="px-20 py-10 box-border">
          <CardHeader className="text-3xl leading-8 font-semibold mb-10 p-0">
            Complete your profile page
          </CardHeader>

          <div className=" flex flex-col gap-5">
            {" "}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add photo</FormLabel>
                      <FormControl>
                        <div>
                          <div className="w-40 h-40 rounded-full border-2 border-dashed  flex justify-center items-center flex-col">
                            <Camera className="absolute" />

                            {photoPreview ? (
                              <img
                                src={photoPreview}
                                alt="Profile photo"
                                width={100}
                                height={120}
                                className="rounded-full object-cover w-full h-full"
                              />
                            ) : (
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="opacity-0 w-40 h-40 rounded-full"
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-5 flex-col">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name here"
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
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write about yourself here"
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
                    name="socialMediaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social media URl</FormLabel>
                        <FormControl>
                          <Input placeholder="http://" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="flex justify-self-end mt-5 hover:bg-amber-300 hover:text-black"
                  type="submit"
                  disabled={loading}
                >
                  {" "}
                  {loading ? "Uploading..." : "Continue"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
