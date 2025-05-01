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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { Backpack, ChevronLeft, ChevronRight } from "lucide-react";
import { CountryApiType } from "@/constnants/Type";

export default function Page() {
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    country: z.string(),
    cardNumber: z.string(),
    expiryMonth: z.string(),
    expiryYear: z.string(),
    cvc: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });

  const [countries, setCountry] = useState([]);
  useEffect(() => {
    const CountryApi = async () => {
      const res = await fetch(`https://countriesnow.space/api/v0.1/countries`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data.data);
      setCountry(data.data);
    };
    CountryApi();
  }, []);
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
        <CardContent className="px-20 py-10">
          <CardHeader className="text-3xl leading-8 font-semibold mb-5 p-0">
            Complete your profile page
            <CardDescription className="font-normal">
              Enter location and payment details
            </CardDescription>
          </CardHeader>
          <div className=" flex flex-col gap-5" >
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Country</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent
                >
                            {countries.map((country:CountryApiType) => (
                              <SelectItem
                                 className="w-full"
                                key={country.country}
                                value={country.country}
                              >
                                {country.country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div className="grid grid-cols-2 gap-5 ">
              <Form {...form}>
                <form
                  // onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
                </form>
              </Form>{" "}
              <Form {...form}>
                <form
                  // onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                   <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
                </form>
              </Form>
            </div>
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
               <FormField control={form.control} name="cardNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXX-XXXX-XXXX-XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              </form>
            </Form>
            <div className="grid grid-cols-3 gap-5 w-full [&_button]:w-full">
              <Form {...form}>
                <form
                  // onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="expiryMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expires (Month)</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ].map((month) => (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>{" "}
              <Form {...form}>
                <form
                  // onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="expiryYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expires (Year)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Year" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>{" "}
              <Form {...form}>
                <form
                  // onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="CVC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <div className="flex gap-5 justify-self-end">
            <Button
              className=" mt-5 hover:bg-amber-300 hover:text-black bg-gray-300 text-black w-50"
              type="submit"
            >
              <ChevronLeft />
              Back
            </Button>
            <Button
              className=" mt-5 hover:bg-amber-300 hover:text-black w-30"
              type="submit"
            >
              Continue <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
