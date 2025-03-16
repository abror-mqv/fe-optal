import localFont from "next/font/local";
import "./globals.css";
import './styles/main.scss';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Footer from "./components/footer/Footer";

// import { Provider } from 'react-redux';
// import { store } from '../redux/store';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OPTAL",
  description: "Новый B2B маркетплейс одежды и текстильных изделий из Кыргызстана для России и стран СНГ. Покупайте напрямую у производителей и продавцов.",
  keywords: 'одежда оптом, из киргизии, платья из киргизии, детская одежда из киргизии, оптовики киргизия, дордой, озон кыргызстан, мужская одежда оптом, женская одежда оптом, детская одежда оптом, спортивная одежда оптом, верхняя одежда оптом, джинсы оптом, футболки оптом, рубашки оптом, куртки оптом, спортивные костюмы оптом, халаты оптом, свитера оптом, пижамы оптом, трикотаж оптом, одежда Кыргызстан, одежда Бишкек, Дордой Бишкек, производители одежды Кыргызстан, поставщики одежды Кыргызстан, оптовая торговля Кыргызстан, текстиль Кыргызстан, текстиль оптом Кыргызстан, одежда для России, продажа одежды СНГ, рынок Дордой, торговля с Кыргызстаном, одежда из Киргизии, товары из Кыргызстана.',
  openGraph: {
    title: 'Optal — Одежда и Текстиль из Кыргызстана',
    description: 'Крупнейший B2B маркетплейс одежды и текстильных изделий из Кыргызстана для России и стран СНГ.',
    url: 'https://optal.ru',
    siteName: 'Optla.ru',
    images: [
      {
        url: 'https://optal.ru/optal_logo.svg',
        width: 1200,
        height: 1200,
        alt: 'Твой Маркетплейс — Одежда и Текстиль из Кыргызстана',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abror_mqv',
    title: 'Optal — Одежда и Текстиль из Кыргызстана',
    description: 'Крупнейший B2B маркетплейс одежды и текстильных изделий из Кыргызстана для России и стран СНГ.',
    image: 'https://optal.ru/optal_logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="IH-eqXEh9X7dJmIRZBR33ObVQfdmmCm1satW2YQcc3w" />
        <meta name="yandex-verification" content="4202e76e76256f2f" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          {/* <Provider store={store}> */}
          {children}
          {/* </Provider> */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
