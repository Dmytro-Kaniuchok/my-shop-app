"use client";

import { SiTelegram, SiViber } from "react-icons/si";
import styles from "../QuickLinks/QuickLinks.module.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface QuickLinksProps {
  cartItems: CartItem[];
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

export default function QuickLinks({ cartItems, formData }: QuickLinksProps) {
  const generateMessageLink = (messenger: "viber" | "telegram") => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const message = cartItems
      .map(
        (item) =>
          `${item.name} (${item.id}) — ${item.quantity} шт × ${item.price} грн`
      )
      .join("\n");

    const fullMessage = `🛒 Нове замовлення:\n\n👤 Ім’я: ${formData.name}\n📞 Телефон: ${formData.phone}\n🏠 Адреса: ${formData.address}\n📧 Email: ${formData.email || "-"}\n\nТовари:\n${message}\n\n💰 Загальна сума: ${total} грн`;

    if (messenger === "viber")
      return `viber://chat?number=+380XXXXXXXXX&text=${encodeURIComponent(
        fullMessage
      )}`;
    if (messenger === "telegram")
      return `https://t.me/knc_d?text=${encodeURIComponent(fullMessage)}`;

    return "#";
  };

  return (
    <p className={styles.quickLink}>
      Або швидко:
      <a
        href={generateMessageLink("telegram")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiTelegram size={16} color="#0088cc" /> Telegram
      </a>
      <a
        href={generateMessageLink("viber")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiViber size={16} color="#665cac" /> Viber
      </a>
    </p>
  );
}
