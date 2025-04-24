import { AccountSec } from "./components/AccountSec";
import { PaidSec } from "./components/PaidSec";




export default function ProfilePage() {
    return (<div>
        <AccountSec />
        <PaidSec />
    </div>)
}





// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { string, z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

// export default function Createacc() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//     },
//   });
//   return (
//     <div className="p-10 w-full">
//       <div className="flex justify-between items-center w-full">
//         <Image alt="Logo" src="/brand-logo.svg" width={300} height={200} />
//         <Button variant={"outline"} className="hover:bg-amber-300">
//           Log out
//         </Button>
//       </div>
//       <div>
//         <Card>
//           <CardContent>
//             <CardTitle className="font-semibold leading-8 text-2xl">
//               Complete your profile page
//             </CardTitle>
//             <div>
//               <div className="flex flex-col gap-4">
//                 <p className="font-medium text-base leading-4">Add photo</p>
//                 <Input
//                   type="file"
//                   className="rounded-full w-50 h-50 border-dashed"
//                 ></Input>
//               </div>
//               <div className="flex flex-col gap-4 my-3">
//                 <p className="font-medium text-base leading-4">Name</p>

//                 <Form {...form}>
//                   <form className="space-y-8">
//                     <FormField
//                       name="username"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input type="text" className="" {...field}></Input>
//                           </FormControl>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </form>
//                 </Form>
//               </div>
//               <div className="flex flex-col gap-4 my-3">
//                 <p className="font-medium text-base leading-4">About</p>

//                 <Form {...form}>
//                   <form className="space-y-8">
//                     <FormField
//                       name="username"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input type="text" className="" {...field}></Input>
//                           </FormControl>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </form>
//                 </Form>
//               </div>
//               <div className="flex flex-col gap-4 my-3">
//                 <p className="font-medium text-base leading-4">
//                   Social media URL
//                 </p>

//                 <Form {...form}>
//                   <form className="space-y-8">
//                     <FormField
//                       name="username"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input type="text" className="" {...field}></Input>
//                           </FormControl>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </form>
//                 </Form>
//               </div>
//               <Button variant={"outline"} className="hover:bg-amber-300">
//                 Continue
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       <div>
//         <Card>
//           <CardContent>
//             <CardTitle className="font-semibold leading-8 text-2xl">
//               <p> How would you like to be paid? </p>
//               <p>Enter location and payment details</p>
//             </CardTitle>
//             <div>
//               <div className="flex flex-col gap-4">
//                 <p className="font-medium text-base leading-4">
//                   Select country
//                 </p>
//                 <Input
//                   type="file"
//                   className="rounded-full w-50 h-50 border-dashed"
//                 ></Input>
//               </div>
//               <div className=" flex gap-5">
//                 <div className="flex flex-col gap-4 my-3">
//                   <p className="font-medium text-base leading-4">First name</p>

//                   <Form {...form}>
//                     <form className="space-y-8">
//                       <FormField
//                         name="username"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 type="text"
//                                 className=""
//                                 {...field}
//                               ></Input>
//                             </FormControl>

//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </form>
//                   </Form>
//                 </div>
//                 <div className="flex flex-col gap-4 my-3">
//                   <p className="font-medium text-base leading-4">Last name</p>

//                   <Form {...form}>
//                     <form className="space-y-8">
//                       <FormField
//                         name="username"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 type="text"
//                                 className=""
//                                 {...field}
//                               ></Input>
//                             </FormControl>

//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </form>
//                   </Form>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-4 my-3">
//                 <p className="font-medium text-base leading-4">
//                   Enter card number
//                 </p>

//                 <Form {...form}>
//                   <form className="space-y-8">
//                     <FormField
//                       name="username"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input type="text" className="" {...field}></Input>
//                           </FormControl>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </form>
//                 </Form>
//               </div>
//               <div>
//                 <div className="flex flex-col gap-4 my-3">
//                   <p className="font-medium text-base leading-4">
//                     Social media URL
//                   </p>

//                   <Form {...form}>
//                     <form className="space-y-8">
//                       <FormField
//                         name="username"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 type="text"
//                                 className=""
//                                 {...field}
//                               ></Input>
//                             </FormControl>

//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </form>
//                   </Form>
//                 </div>
//                 <div className="flex flex-col gap-4 my-3">
//                   <p className="font-medium text-base leading-4">
//                     Social media URL
//                   </p>

//                   <Form {...form}>
//                     <form className="space-y-8">
//                       <FormField
//                         name="username"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 type="text"
//                                 className=""
//                                 {...field}
//                               ></Input>
//                             </FormControl>

//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </form>
//                   </Form>
//                 </div>
//                 <div className="flex flex-col gap-4 my-3">
//                   <p className="font-medium text-base leading-4">
//                     Social media URL
//                   </p>

//                   <Form {...form}>
//                     <form className="space-y-8">
//                       <FormField
//                         name="username"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 type="text"
//                                 className=""
//                                 {...field}
//                               ></Input>
//                             </FormControl>

//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </form>
//                   </Form>
//                 </div>
//               </div>
//               <Button variant={"outline"} className="hover:bg-amber-300">
//                 Continue
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
