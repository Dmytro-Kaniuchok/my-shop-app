"use client";

import { usePathname } from "next/navigation";
import Footer from "@/src/components/Footer/Footer";
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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#101828",
            color: "#fff",
            borderRadius: "14px",
            padding: "14px 18px",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
        }}
      />
      {pathname === "/" && <Footer />}
    </>
  );
}
