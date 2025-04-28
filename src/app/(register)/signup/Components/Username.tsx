import { Button } from "@/components/ui/button";
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
import { BASE_URL } from "@/constnants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type TypeUser = {
  createdat: string;
  email: string;
  id: number;
  password: string;
  receiveddonation: number;
  updatedat: string;
  username: string;
};

export const Username = () => {

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    // .regex(
    //   /^[a-zA-Z0-9_]+$/,
    //   "Username can only contain letters, numbers, and underscores"
    // ),
});
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = async (values: { username: string }) => {
    try {
      const { username } = values;
      const response = await axios.post(
        `http://localhost:8000/users/sign-up`,
        {
          username,
        }
      );

      if (response.data.exists) {
        alert("Username already exists. Please choose another one.");
        return;
      }
      localStorage.setItem("username", username);
      router.push("/signup/email");
    } catch (error) {
      console.error("Error checking username:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col self-center ">
      <p className="font-semi text-3xl leading-8">Create Your Account</p>
      <p className="font-normal text-lg text-gray-500 leading-5 pt-2 pb-8">
        Choose a username for your page
      </p>
      <Form {...form}>
        <form className="space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}>
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
            className="hover:bg-amber-300 bg-gray-200 hover:cursor-pointer"
            
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

// const [getUser, setGetUser] = useState([])
//   useEffect(() => {
//     const usernameCheck = async (val: z.infer<typeof formSchema>) => {
//       const check = await fetch(`http://localhost:8000/users`, {
//         method: "GET",
//         body: JSON.stringify(val),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const user =await check.json()
//       console.log(user)
//   setGetUser(user)
//     };
//     usernameCheck

//     console.log(getUser)
//   }, []);
