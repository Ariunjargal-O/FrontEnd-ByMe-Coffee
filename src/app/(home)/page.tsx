import Image from "next/image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MainPage } from "./components/MainPage";

export default function Home() {
  return (
    <div className="w-full bg-amber-300">
     <Header/>
<MainPage/>
     <Footer/>
    </div>
  );
}
