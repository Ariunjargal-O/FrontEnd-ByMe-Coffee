import { CheckCircle, Icon, icons } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const DonationCompleted = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="w-[696px] h-fit flex flex-col justify-self-center p-15 border-2">
        <div className="flex flex-col gap-5 justify-self-center">
            <Badge className="bg-green-500 w-20 h-20 rounded-full"><CheckCircle className="h-15 w-15"/></Badge>
            <p className="font-semibold text-2xl leading-6">Donation Complete !</p>
        </div>
      </div>
    </div>
  );
};


{/* <div className="flex flex-col">
          <Badge className="w-20 h-20 rounded-full bg-green-500 my-5">
            <CheckCircle className="h-10" />
          </Badge>
          
        </div>
        <div className="flex flex-col my-10">
          <div className="flex flex-row gap-4 items-center pb-5">
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-2xl font-semibold leading-7">proner</p>
          </div>
          <p>
            Thank you for supporting me! It means a lot to have your support.
            It’s a step toward creating a more inclusive and accepting community
            of artists.
          </p>
        </div> */}