import Navbar from "@/components/frontend/layout/Navbar";
import Footer from "@/components/frontend/layout/Footer";
import { BackToTop } from "@/components/frontend/back-to-top";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
} 