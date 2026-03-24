import Footer from "@/components/CustomComponents/Footer";
import Navbar from "@/components/CustomComponents/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar />
        {children}
    <Footer />    
    </>
  );
}
