"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import styles from "./ProductTabs.module.css";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductTabsProps {
  productId: string;
  description: string;
  brand: string;
  sku?: string;
  reviews?: number;
  onReviewAdded?: () => void;
}

export default function ProductTabs({
  productId,
  description,
  brand,
  sku,
  onReviewAdded,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");

  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const ratingText =
    rating === 1
      ? styles.ratingBad
      : rating === 2
        ? styles.ratingPoor
        : rating === 3
          ? styles.ratingNormal
          : rating === 4
            ? styles.ratingGood
            : styles.ratingExcellent;

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${productId}`,
      );
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [fetchReviews]);

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            userName,
            rating,
            comment,
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Відгук успішно додано!");

      setUserName("");
      setComment("");
      setRating(5);
      setShowForm(false);

      await fetchReviews();
      await new Promise((resolve) => setTimeout(resolve, 300));
      onReviewAdded?.();
    } catch {
      toast.error("Не вдалося додати відгук");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.tabsSection}>
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
          Відгуки ({reviews.length})
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "description" && (
          <div className={styles.description}>
            <p>
              {description ||
                "Якісна автозапчастина від перевіреного виробника. Ідеально підходить для вашого автомобіля, забезпечуючи надійну роботу та довговічність. Виготовлена з високоякісних матеріалів, ця запчастина відповідає всім стандартам якості та безпеки. Легко встановлюється та сумісна з багатьма моделями автомобілів. Купуйте зараз і забезпечте своєму авто найкраще!"}
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
            {reviews.length === 0 && !showForm ? (
              <div className={styles.emptyReviews}>
                <div className={styles.emptyIcon}>
                  <MdOutlineReviews />
                </div>
                <h3>Відгуків поки немає</h3>
                <p>
                  Станьте першим покупцем, який залишить відгук про цей товар.
                </p>
                <button
                  className={styles.writeReviewButton}
                  onClick={() => setShowForm(true)}
                >
                  Написати відгук
                </button>
              </div>
            ) : (
              <>
                {showForm ? (
                  <form
                    className={styles.reviewForm}
                    onSubmit={handleSubmitReview}
                  >
                    <h3 className={styles.formTitle}>Залишити відгук</h3>

                    <input
                      type="text"
                      placeholder="Ваше ім'я"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />

                    <div className={styles.ratingWrapper}>
                      <div className={styles.ratingHeader}>
                        <h3 className={styles.ratingLabel}>Ваша оцінка</h3>

                        <span className={`${styles.ratingValue} ${ratingText}`}>
                          {rating === 1 && "Дуже погано"}
                          {rating === 2 && "Погано"}
                          {rating === 3 && "Нормально"}
                          {rating === 4 && "Добре"}
                          {rating === 5 && "Відмінно"}
                        </span>
                      </div>

                      <div className={styles.rating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={styles.starButton}
                            onClick={() => setRating(star)}
                            aria-label={`Оцінка ${star}`}
                          >
                            {star <= rating ? (
                              <FaStar className={styles.starFilled} />
                            ) : (
                              <FaRegStar className={styles.starEmpty} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      placeholder="Ваш відгук"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />

                    <div className={styles.formActions}>
                      <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => setShowForm(false)}
                      >
                        Скасувати
                      </button>
                      <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                      >
                        {loading ? "Відправка..." : "Залишити відгук"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className={styles.reviewsHeader}>
                    <button
                      className={styles.writeReviewButton}
                      onClick={() => setShowForm(true)}
                    >
                      Написати відгук
                    </button>
                  </div>
                )}

                <div className={styles.reviewsList}>
                  {reviews.map((review) => (
                    <div key={review._id} className={styles.reviewCard}>
                      <div className={styles.reviewCardHeader}>
                        <h4>{review.userName}</h4>
                        <small>
                          {new Date(review.createdAt).toLocaleDateString(
                            "uk-UA",
                          )}
                        </small>
                      </div>

                      <div className={styles.reviewRating}>
                        {[1, 2, 3, 4, 5].map((star) =>
                          star <= review.rating ? (
                            <FaStar key={star} className={styles.starFilled} />
                          ) : (
                            <FaRegStar
                              key={star}
                              className={styles.starEmpty}
                            />
                          ),
                        )}
                      </div>

                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
