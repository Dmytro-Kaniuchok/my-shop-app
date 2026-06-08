"use client";

import { useEffect, useRef, useState } from "react";
import Counter from "./Counter";
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
      {
        threshold: 0.3,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${css.section} ${visible ? css.visible : ""}`}
    >
      <div className={css.hero}>
        <div className={css.overlay}>
          <h2>
            Також запчастини для
            <br />
            сільськогосподарської техніки
          </h2>

          <p>
            Широкий вибір запчастин для тракторів, комбайнів та іншої
            агротехніки
          </p>
        </div>
      </div>

      <div className={css.stats}>
        <div className={css.item}>
          <h3 className={css.counter}>
            <Counter end={1000} suffix="+" startAnimation={visible} />
          </h3>

          <span className={css.itemSpan}>клієнтів</span>
        </div>

        <div className={css.item}>
          <h3 className={css.counter}>
            <Counter end={10} startAnimation={visible} />
          </h3>

          <span className={css.itemSpan}>років досвіду</span>
        </div>

        <div className={css.item}>
          <h3 className={css.counter}>
            <Counter end={24} startAnimation={visible} />
            /7
          </h3>

          <span className={css.itemSpan}>підтримка</span>
        </div>
      </div>
    </section>
  );
}
