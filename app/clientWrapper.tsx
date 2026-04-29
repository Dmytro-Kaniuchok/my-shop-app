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
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#101828",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 32px",
            border: "none",
            fontSize: "14px",
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
