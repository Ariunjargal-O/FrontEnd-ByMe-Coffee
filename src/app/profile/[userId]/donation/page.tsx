import { Header } from "../components/Header";
import { CheckCircle } from "lucide-react";
import { DonationCompleted } from "./components/DonationCompleted";

export default function DonationPage() {
  return (
    <div>
      <Header />
      <DonationCompleted />
    </div>
  );
}
