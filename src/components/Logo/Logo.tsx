import Image from "next/image";
import Link from "next/link";
import css from "./Logo.module.css";

interface LogoProps {
  theme: string;
}

export default function Logo({ theme }: LogoProps) {
  return (
    <Link href="/" aria-label="Головна">
      <div className={css.logoWrapper}>
        <Image
          src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
          alt="Logo"
          width={120}
          height={120}
          className={css.logoImg}
          style={{ height: "auto" }}
          priority
        />
      </div>
    </Link>
  );
}
