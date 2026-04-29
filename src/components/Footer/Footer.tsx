import Link from "next/link";
import Logo from "../Logo/Logo";
import css from "./Footer.module.css";
import { SiTelegram, SiViber, SiGmail } from "react-icons/si";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <div className={css.footerContent}>
          <Logo theme="light" />
          <p className={css.description}>
            Ваш надійний партнер у світі автозапчастин <br /> та товарів для
            сільськогосподарської техніки.
          </p>
        </div>

        <nav className={css.footerNavigation}>
          <h4 className={css.title}>Навігація</h4>
          <ul>
            <li>
              <Link href="/">Головна</Link>
            </li>
            <li>
              <Link href="/catalog">Каталог товарів</Link>
            </li>
            <li>
              <Link href="/contact">Контакти</Link>
            </li>
            <li>
              <Link href="/about">Про нас</Link>
            </li>
            <li>
              <Link href="/cart">Кошик</Link>
            </li>
          </ul>
        </nav>

        <div className={css.footerContacts}>
          <h4 className={css.title}>Контакти</h4>

          <div className={css.contactInfo}>
            <div className={css.phoneBlock}>
              <div className={css.phoneRow}>
                <Phone size={20} />
                <a href="tel:+380501234567" className={css.phone}>
                  +38 (050) 123-45-67
                </a>
              </div>
            </div>

            <div>
              <div className={css.emailRow}>
                <Mail size={20} className={css.emailIcon} />
                <a href="mailto:info@agroauto.ua" className={css.email}>
                  info@agroauto.ua
                </a>
              </div>
            </div>

            <div className={css.addressRow}>
              <div className={css.address}>
                <MapPin size={20} />
                <p>м. Харків, вул. Георгія Тарасенка, 12</p>
              </div>
            </div>
            <div className={css.footerSchedule}>
              <Clock size={20} />
              <p>Пн-Пт: 10:00-18:00</p>
            </div>
          </div>
        </div>

        <div className={css.socials}>
          <h4 className={css.title}>Соціальні мережі</h4>
          <div className={css.links}>
            <a
              href="https://web.telegram.org/k/"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
            >
              <SiTelegram size={20} />
            </a>

            <a
              href="viber://chat?number=+380501234567"
              aria-label="Viber"
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
            >
              <SiViber size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Нижня частина */}
      <div className={css.footerBottom}>
        <p>© {new Date().getFullYear()} AGROAVTO. Усі права захищені.</p>
      </div>
    </footer>
  );
}
