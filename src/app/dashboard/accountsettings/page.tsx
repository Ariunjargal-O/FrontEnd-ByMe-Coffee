"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Camera } from "lucide-react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Settings() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex bg-white justify-center p-20">
      <div className="w-fit">
        <div className="flex w-[510px] border-1 p-5 rounded-2xl">
          <div className="w-[510px]">
            <div>
              <p className="text-[24px] font-bold">My account</p>
            </div>

            <div className="mt-10">
              <p className="text-[16px] font-bold">Personal info</p>
            </div>

            <div className="mt-5">
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`w-[160px] h-[160px] rounded-full border-2 border-dashed mt-2 flex items-center justify-center overflow-hidden cursor-pointer ${
                  submitted && !image ? "border-red-500" : "border-gray-300"
                }`}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </div>

            <div className="mt-5">
              <p>Name</p>
              <Input
                placeholder="Enter your name here"
                className="h-[40px] mt-2 border-neutral-400"
              />
            </div>

            <div className="mt-3">
              <p>About</p>
              <Input
                placeholder="Write about yourself here"
                className="h-[100px] mt-2 border-neutral-400"
              />
            </div>

            <div className="mt-3">
              <p>Social media URL</p>
              <Input
                placeholder="https://"
                className="h-[40px] mt-2 border-neutral-400 "
              />
            </div>

            <div className="flex justify-end mt-7">
              <Button className="w-full bg-black text-white">
                Save changes
              </Button>
            </div>
          </div>
        </div>

        <div className=" w-[510px] border-1 mt-5 p-5 rounded-2xl">
          <div className="flex">
            <div className="w-[510px]">
              <div className="mt-10">
                <p className="text-[16px] font-bold">Set a new password</p>
              </div>

              <div className="mt-5">
                <p>New password</p>
                <Input
                  placeholder="password"
                  className="h-[40px] mt-2 border-neutral-400 "
                />
              </div>

              <div className="mt-3">
                <p>Confirm password</p>
                <Input
                  placeholder="confirm password"
                  className="mt-2 border-neutral-400"
                />
              </div>

              <div className="flex justify-end mt-7">
                <Button className="w-full bg-black text-white">
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[510px] border-1 p-5 rounded-2xl mt-5">
          <div>
            <p className="text-[16px] font-bold">payment details</p>
          </div>

          <div className="mt-5">
            <div>
              <p>Select Country</p>
              <div className="mt-2">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Mongolia">Mongolia</SelectItem>
                    <SelectItem value="New Zealand">New Zealand</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-3 flex justify-between">
              <div>
                <p>First name</p>
                <Input
                  placeholder="Enter your first name here"
                  className="w-[230px] mt-2"
                />
              </div>
              <div>
                <p>Last name</p>
                <Input
                  placeholder="Enter your last name here"
                  className="w-[230px] mt-2"
                />
              </div>
            </div>

            <div className="mt-3">
              <p>Enter card number</p>
              <Input placeholder="XXXXXXXXXXXXXXXX" className="h-[40px] mt-2" />
            </div>

            <div className="mt-3 flex justify-between">
              <div>
                <p>Expires</p>
                <div className="mt-2">
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select" />
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
                      ].map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <p>Year</p>
                <Input placeholder="Year" className="w-[150px] mt-2" />
              </div>

              <div>
                <p>CVC</p>
                <Input
                  type="number"
                  placeholder="CVC"
                  className="w-[150px] mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end mt-7">
              <Button className="w-full bg-black text-white">
                Save changes
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[510px] border-1 p-5 rounded-2xl mt-5">
          <div>
            <p className="text-[16px] font-bold">Success page</p>
          </div>

          <div>
            <p>Confirmation message</p>
            <Input
              placeholder="Enter message here"
              className="w-full h-[131px] mt-2 "
            />
          </div>

          <div className="flex justify-end mt-7">
            <Button className="w-full bg-black text-white">Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
