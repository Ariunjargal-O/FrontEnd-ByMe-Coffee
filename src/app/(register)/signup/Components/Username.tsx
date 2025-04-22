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
import { useForm } from "react-hook-form";




export const Username = () => {
    const form = useForm({
        // resolver: async (data) => {
        //   try {
        //     formSchema.parse(data);
        //     return { values: data, errors: {} };
        //   } catch (error) {
        //     return { values: {}, errors: error.formErrors.fieldErrors };
        //   }
        // },
        })
    return(
        <div className="flex flex-col self-center ">
            <p className="font-semi text-3xl leading-8">Create Your Account</p>
            <p className="font-normal text-lg text-gray-500 leading-5 pt-2 pb-8">
              Choose a username for your page
            </p>
            <Form {...form}>
              <form className="space-y-8">
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
                <Button variant="outline" type="submit"
                className="hover:bg-amber-300 bg-gray-200 hover:cursor-pointer">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
    )
}