"use client";

import { useState } from "react";
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

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [month, setMonth] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!country) newErrors.country = "Country is required.";
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!month) newErrors.month = "Month is required.";
    if (!year) {
      newErrors.year = "Year is required.";
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = "Enter a valid 4-digit year.";
    }
    if (!cvc) {
      newErrors.cvc = "CVC is required.";
    } else if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = "CVC must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const router = useRouter();
  const handleSubmit = () => {
    setSubmitted(true);
    if (validate()) 
    router.push("/dashboard");
  };

  const errorStyle = "border-red-500";

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[510px]">
        <div>
          <p className="text-[24px] font-bold">
            How would you like to be paid?
          </p>
          <p className="text-[16px] text-neutral-400">
            Enter location and payment details
          </p>
        </div>

        <div className="mt-5">
          <div>
            <p className="font-bold">Select Country</p>
            <div className="mt-2">
              <Select onValueChange={setCountry}>
                <SelectTrigger
                  className={`w-full ${errors.country ? errorStyle : ""}`}
                >
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
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <div>
              <p>First name</p>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name here"
                className={`w-[250px] mt-2 ${
                  errors.firstName ? errorStyle : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <p>Last name</p>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name here"
                className={`w-[250px] mt-2 ${
                  errors.lastName ? errorStyle : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <p>Enter card number</p>
            <Input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="XXXXXXXXXXXXXXXX"
              className={`h-[40px] mt-2 ${errors.cardNumber ? errorStyle : ""}`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="mt-3 flex justify-between">
            <div>
              <p>Expires</p>
              <div className="mt-2">
                <Select onValueChange={setMonth}>
                  <SelectTrigger
                    className={`w-[165px] ${errors.month ? errorStyle : ""}`}
                  >
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
                {errors.month && (
                  <p className="text-red-500 text-sm mt-1">{errors.month}</p>
                )}
              </div>
            </div>

            <div>
              <p>Year</p>
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
                className={`w-[165px] mt-2 ${errors.year ? errorStyle : ""}`}
              />
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year}</p>
              )}
            </div>

            <div>
              <p>CVC</p>
              <Input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                type="number"
                placeholder="CVC"
                className={`w-[165px] mt-2 ${errors.cvc ? errorStyle : ""}`}
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-7">
            <Button onClick={handleSubmit} className="w-full" variant="outline">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
