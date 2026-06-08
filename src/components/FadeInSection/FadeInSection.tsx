"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FadeInSection.module.css";

interface Props {
  children: React.ReactNode;
}

export default function FadeInSection({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
}
