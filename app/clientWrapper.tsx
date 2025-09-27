"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <main>{children}</main>
      <Toaster position="top-center" />
      {pathname === "/" && <Footer />}
    </>
  );
}
