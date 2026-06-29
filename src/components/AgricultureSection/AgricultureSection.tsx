"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Counter from "./Counter";
import Image from "next/image";
import css from "./AgricultureSection.module.css";

export default function AgricultureSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${css.section} ${visible ? css.visible : ""}`}
    >
      <div className={css.inner}>
        <div className={css.textCol}>
          <span className={css.eyebrow}>Агротехніка</span>
          <h2 className={css.title}>
            Запчастини для сільськогосподарської техніки
          </h2>
          <p className={css.description}>
            Широкий вибір запчастин для тракторів, комбайнів та іншої
            агротехніки. Оригінальні деталі від перевірених виробників з
            гарантією якості.
          </p>

          <div className={css.stats}>
            <div className={css.stat}>
              <span className={css.statNum}>
                <Counter end={1000} suffix="+" startAnimation={visible} />
              </span>
              <span className={css.statLabel}>клієнтів</span>
            </div>
            <div className={css.stat}>
              <span className={css.statNum}>
                <Counter end={10} startAnimation={visible} />
              </span>
              <span className={css.statLabel}>років досвіду</span>
            </div>
            <div className={css.stat}>
              <span className={css.statNum}>
                <Counter end={24} startAnimation={visible} />
                /7
              </span>
              <span className={css.statLabel}>підтримка</span>
            </div>
          </div>

          <Link href="/catalog" className={css.cta}>
            Перейти до каталогу
          </Link>
        </div>

        <div className={css.imageCol}>
          <div className={css.imageWrap}>
            <Image
              height={380}
              width={500}
              src="/image/agriculture-banner.jpg"
              alt="Сільськогосподарська техніка"
              className={css.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
