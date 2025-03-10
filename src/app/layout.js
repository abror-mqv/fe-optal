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
  description: "Optoviy portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />


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
