"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
// import { useNavigate } from "react-router-dom";

export default function ProfileAcoountSec() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [social, setSocial] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isValidUrl = (url: string) => /^https?:\/\/.+/.test(url);
  const isFormValid = () => image && name && about && isValidUrl(social);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const createpro = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/donations/create-pro/${userId}`,
          {
            method: "POST",
            body: JSON.stringify({
              name: name,
              about: about,
              avatarImage: image,
              socialMediaURL: social,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const profile = await res.json();

        return profile;
      } catch (error: any) {
        console.log(error.message);
      }
    };
    createpro();
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
    if (isFormValid()) {
      console.log({
        image,
        name,
        about,
        social,
      });
      router.push("/signup/createaccount/bankcard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[510px] font-bold">
        <p className="text-[24px]">Complete your profile page</p>

        <div className="mt-5">
          <p>Add photo</p>
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
          {submitted && !image && (
            <p className="text-red-500 text-sm mt-1">Please enter image</p>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-5">
          <p>Name</p>
          <Input
            placeholder="Enter your name here"
            className={`h-[40px] mt-2 ${
              submitted && !name ? "border-red-500" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {submitted && !name && (
            <p className="text-red-500 text-sm mt-1">Please enter name</p>
          )}
        </div>

        <div className="mt-3">
          <p>About</p>
          <Input
            placeholder="Write about yourself here"
            className={`h-[100px] mt-2 ${
              submitted && !about ? "border-red-500" : ""
            }`}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          {submitted && !about && (
            <p className="text-red-500 text-sm mt-1">
              Please enter info about yourself
            </p>
          )}
        </div>

        <div className="mt-3">
          <p>Social media URL</p>
          <Input
            placeholder="https://"
            className={`h-[40px] mt-2 ${
              submitted && !isValidUrl(social) ? "border-red-500" : ""
            }`}
            value={social}
            onChange={(e) => setSocial(e.target.value)}
          />
          {submitted && !isValidUrl(social) && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a social link
            </p>
          )}
        </div>

        <div className="flex justify-end mt-7">
          <Button className="w-full" variant="outline" onClick={handleSubmit}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
