"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const EditProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-gray-200 hover:bg-amber-200 px-3 py-1 rounded-lg">
          Edit Page
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div>
            <div>
              <div className="flex flex-col gap-4">
                <p className="font-medium text-base leading-4">Add photo</p>
                <Input
                  type="file"
                  className="rounded-full w-50 h-50 border-dashed"
                ></Input>
              </div>
              <div className="flex flex-col gap-4 my-3">
                <p className="font-medium text-base leading-4">Name</p>

                <Form {...form}>
                  <form className="space-y-8">
                    <FormField
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" className="" {...field}></Input>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <div className="flex flex-col gap-4 my-3">
                <p className="font-medium text-base leading-4">About</p>

                <Form {...form}>
                  <form className="space-y-8">
                    <FormField
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" className="" {...field}></Input>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <div className="flex flex-col gap-4 my-3">
                <p className="font-medium text-base leading-4">
                  Social media URL
                </p>

                <Form {...form}>
                  <form className="space-y-8">
                    <FormField
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" className="" {...field}></Input>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
            <div className="flex gap-5 justify-end">
              <Button variant={"outline"} className="bg-gray-200">
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
