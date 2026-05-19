"use client";

import { useState } from "react";
import styles from "./ProductTabs.module.css";

interface ProductTabsProps {
  description: string;
  brand: string;
  sku?: string;
  reviews?: number;
}

export default function ProductTabs({
  description,
  brand,
  sku,
  reviews = 0,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");

  return (
    <div className={styles.tabsSection}>
      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "description" ? styles.tabActive : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Опис
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === "specs" ? styles.tabActive : ""
          }`}
          onClick={() => setActiveTab("specs")}
        >
          Характеристики
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === "reviews" ? styles.tabActive : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Відгуки ({reviews})
        </button>
      </div>

      {/* CONTENT */}
      <div className={styles.tabContent}>
        {activeTab === "description" && (
          <div className={styles.description}>
            <p>
              {description ||
                "Якісна автозапчастина від перевіреного виробника."}
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className={styles.specs}>
            <table className={styles.specsTable}>
              <tbody>
                <tr>
                  <td>Бренд</td>
                  <td>{brand}</td>
                </tr>

                <tr>
                  <td>Артикул</td>
                  <td>{sku || "N/A"}</td>
                </tr>

                <tr>
                  <td>Гарантія</td>
                  <td>12 місяців</td>
                </tr>

                <tr>
                  <td>Тип товару</td>
                  <td>Автозапчастина</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className={styles.reviews}>
            <div className={styles.emptyReviews}>
              <h3>Відгуків поки немає</h3>

              <p>
                Станьте першим покупцем, який залишить відгук про цей товар.
              </p>

              <button
                className={styles.writeReviewButton}
                onClick={() => alert("Функція написання відгуку в розробці")}
              >
                Написати відгук
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
