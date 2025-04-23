import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProfilePageView } from "./components/ProfilePage";

export default function ViewPage() {
  return (
    <div>
      <Header />
      <ProfilePageView />
      <Footer />
    </div>
  );
}
